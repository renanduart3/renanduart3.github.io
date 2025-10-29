#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simple logging utility
const isDev = process.env.NODE_ENV !== 'production';
const log = {
  info: (...args) => isDev && console.log(...args),
  error: (...args) => console.error(...args),
  warn: (...args) => console.warn(...args)
};

// Import deployment platform helper
import getDeploymentPlatform from './get-deployment-platform.js';

// Deployment platform configuration - use config if no env var is set
const DEPLOYMENT_PLATFORM = process.env.DEPLOYMENT_PLATFORM || getDeploymentPlatform();
const DRY_RUN = process.argv.includes('--dry-run');
const VALIDATE_ONLY = process.argv.includes('--validate');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define content directories to process
const CONTENT_DIRS = [
  'src/content/pages',
  'src/content/posts',
  'src/content/projects',
  'src/content/docs'
];

// Function to parse frontmatter from markdown content
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: null, content: content };
  }
  
  const frontmatterText = match[1];
  const body = match[2];
  
  // Parse YAML-like frontmatter (simple parser)
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentValue = [];
  let inArray = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed === '' || trimmed.startsWith('#')) {
      continue;
    }
    
    if (trimmed.includes(':') && (!inArray || !trimmed.startsWith('  '))) {
      // Save previous key-value pair
      if (currentKey) {
        if (currentValue.length === 1) {
          frontmatter[currentKey] = currentValue[0];
        } else {
          frontmatter[currentKey] = currentValue;
        }
      }
      
      // Start new key-value pair
      const colonIndex = trimmed.indexOf(':');
      currentKey = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      
      // Reset array state when starting a new key
      inArray = false;
      
      if (value.startsWith('[')) {
        // Array value
        inArray = true;
        currentValue = [];
        if (value !== '[') {
          // Single line array
          const arrayContent = value.substring(1, value.endsWith(']') ? value.length - 1 : value.length);
          if (arrayContent.trim()) {
            currentValue = arrayContent.split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
          }
          inArray = false;
        }
      } else if (value) {
        // Single value
        currentValue = [value.replace(/^["']|["']$/g, '')];
      } else {
        // Empty value, might be start of array
        currentValue = [];
        inArray = true;
      }
    } else if (inArray && trimmed.startsWith('-')) {
      // Array item
      const item = trimmed.substring(1).trim().replace(/^["']|["']$/g, '');
      currentValue.push(item);
    } else if (inArray && trimmed === ']') {
      // End of array
      inArray = false;
    } else if (currentKey && !inArray) {
      // Continuation of single value
      currentValue = [currentValue[0] + ' ' + trimmed];
    }
  }
  
  // Save last key-value pair
  if (currentKey) {
    if (currentValue.length === 1) {
      frontmatter[currentKey] = currentValue[0];
    } else {
      frontmatter[currentKey] = currentValue;
    }
  }
  
  return { frontmatter, content: body };
}

// Function to get the final URL for a content file
function getContentUrl(filePath, isPost = false) {
  // Normalize path separators and extract the relevant part
  const normalizedPath = filePath.replace(/\\/g, '/');
  
  if (isPost) {
    // For posts: extract path after 'src/content/posts/' and remove '.md'
    let postPath = normalizedPath.replace(/^.*src\/content\/posts\//, '').replace(/\.md$/, '');
    // Handle folder-based content: remove '/index' suffix
    if (postPath.endsWith('/index')) {
      postPath = postPath.replace('/index', '');
    }
    return `/posts/${postPath}`;
  } else if (normalizedPath.includes('src/content/projects/')) {
    // For projects: extract path after 'src/content/projects/' and remove '.md'
    let projectPath = normalizedPath.replace(/^.*src\/content\/projects\//, '').replace(/\.md$/, '');
    // Handle folder-based content: remove '/index' suffix
    if (projectPath.endsWith('/index')) {
      projectPath = projectPath.replace('/index', '');
    }
    return `/projects/${projectPath}`;
  } else if (normalizedPath.includes('src/content/docs/')) {
    // For docs: extract path after 'src/content/docs/' and remove '.md'
    let docPath = normalizedPath.replace(/^.*src\/content\/docs\//, '').replace(/\.md$/, '');
    // Handle folder-based content: remove '/index' suffix
    if (docPath.endsWith('/index')) {
      docPath = docPath.replace('/index', '');
    }
    return `/docs/${docPath}`;
  } else {
    // For pages: extract path after 'src/content/pages/' and remove '.md'
    let pagePath = normalizedPath.replace(/^.*src\/content\/pages\//, '').replace(/\.md$/, '');
    // Handle folder-based content: remove '/index' suffix
    if (pagePath.endsWith('/index')) {
      pagePath = pagePath.replace('/index', '');
    }
    if (pagePath === 'index') {
      return '/';
    }
    return `/${pagePath}`;
  }
}



// Function to process a single markdown file
async function processMarkdownFile(filePath, isPost = false) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const { frontmatter } = parseFrontmatter(content);
    
    if (!frontmatter || !frontmatter.aliases) {
      return []; // No redirects to process
    }
    
    // Ensure aliases is an array
    const aliasesArray = Array.isArray(frontmatter.aliases) 
      ? frontmatter.aliases 
      : [frontmatter.aliases];
    
    const targetUrl = getContentUrl(filePath, isPost);
    const redirects = [];
    
    for (const alias of aliasesArray) {
      const cleanAlias = alias.startsWith('/') ? alias.substring(1) : alias;
      
      // Normalize path separators for consistent checking
      const normalizedFilePath = filePath.replace(/\\/g, '/');
      
      // Determine redirect pattern based on content type
      let redirectFrom;
      if (isPost) {
        // Posts: /posts/alias → /posts/actual-slug
        redirectFrom = `/posts/${cleanAlias}`;
      } else if (normalizedFilePath.includes('src/content/projects/')) {
        // Projects: /projects/alias → /projects/actual-slug
        redirectFrom = `/projects/${cleanAlias}`;
      } else if (normalizedFilePath.includes('src/content/docs/')) {
        // Docs: /docs/alias → /docs/actual-slug
        redirectFrom = `/docs/${cleanAlias}`;
      } else {
        // Pages: /alias → /actual-slug
        redirectFrom = `/${cleanAlias}`;
      }
      
      redirects.push({
        from: redirectFrom,
        to: targetUrl,
        alias: cleanAlias
      });
    }
    
    return redirects;
  } catch (error) {
    log.error(`❌ Error processing ${filePath}:`, error.message);
    return [];
  }
}

// Function to process all markdown files in a directory
async function processDirectory(dirPath, isPost = false) {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    let allRedirects = [];
    let processedFiles = 0;
    
    for (const file of files) {
      if (file.isDirectory()) {
        // Handle folder-based content (e.g., folder-name/index.md)
        const folderPath = path.join(dirPath, file.name);
        try {
          const indexPath = path.join(folderPath, 'index.md');
          await fs.access(indexPath);
          const redirects = await processMarkdownFile(indexPath, isPost);
          allRedirects = allRedirects.concat(redirects);
          if (redirects.length > 0) {
            processedFiles++;
          }
        } catch (error) {
          // index.md doesn't exist in this folder, skip
        }
      } else if (file.isFile() && file.name.endsWith('.md')) {
        // Handle single-file content
        const filePath = path.join(dirPath, file.name);
        const redirects = await processMarkdownFile(filePath, isPost);
        allRedirects = allRedirects.concat(redirects);
        if (redirects.length > 0) {
          processedFiles++;
        }
      }
    }
    
    return { redirects: allRedirects, processedFiles };
  } catch (error) {
    log.error(`❌ Error processing directory ${dirPath}:`, error.message);
    return { redirects: [], processedFiles: 0 };
  }
}

// Function to update astro.config.mjs with redirects
async function updateAstroConfig(redirects) {
  const astroConfigPath = 'astro.config.mjs';
  
  try {
    let astroContent = await fs.readFile(astroConfigPath, 'utf-8');
    
    // Create redirects object
    const redirectsObj = {};
    for (const redirect of redirects) {
      redirectsObj[redirect.from] = redirect.to;
    }
    
    // Find and replace the redirects section
    const redirectsRegex = /redirects:\s*\{[^}]*\}/s;
    const newRedirectsSection = `redirects: ${JSON.stringify(redirectsObj, null, 2).replace(/"/g, "'")}`;
    
    if (redirectsRegex.test(astroContent)) {
      // Replace existing redirects
      astroContent = astroContent.replace(redirectsRegex, newRedirectsSection);
    } else {
      // Add redirects after site config
      const siteRegex = /(site:\s*siteConfig\.site,)/;
      astroContent = astroContent.replace(siteRegex, `$1\n  ${newRedirectsSection},`);
    }
    
    await fs.writeFile(astroConfigPath, astroContent, 'utf-8');
    log.info(`📝 Updated astro.config.mjs with ${redirects.length} redirects`);
  } catch (error) {
    log.error(`❌ Error updating astro.config.mjs:`, error.message);
  }
}


// Platform-specific configuration generators
function generateVercelConfig(redirects) {
  const config = {
    redirects: redirects.map(redirect => ({
      source: redirect.from,
      destination: redirect.to,
      permanent: (redirect.status || 301) === 301
    })),
    headers: [
      {
        source: "/_assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/(.*\\.(webp|jpg|jpeg|png|gif|svg))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/(.*\\.pdf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          }
        ]
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://giscus.app https://platform.twitter.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://giscus.app; frame-src 'self' https://www.youtube.com https://giscus.app https://platform.twitter.com; object-src 'none'; base-uri 'self';"
          }
        ]
      }
    ]
  };
  
  return JSON.stringify(config, null, 2);
}

function generateGitHubPagesConfig(redirects) {
  const redirectLines = redirects.map(redirect => 
    `${redirect.from}    ${redirect.to}    ${redirect.status || 301}!`
  );
  
  return redirectLines.join('\n') + '\n';
}

function generateNetlifyConfig(redirects) {
  const redirectLines = [];
  
  for (const redirect of redirects) {
    redirectLines.push('[[redirects]]');
    redirectLines.push(`  from = "${redirect.from}"`);
    redirectLines.push(`  to = "${redirect.to}"`);
    redirectLines.push(`  status = ${redirect.status || 301}`);
    redirectLines.push('  force = true');
    redirectLines.push('');
  }
  
  // Always add the catch-all 404 redirect at the end
  redirectLines.push('[[redirects]]');
  redirectLines.push('  from = "/*"');
  redirectLines.push('  to = "/404"');
  redirectLines.push('  status = 404');
  
  return redirectLines.join('\n');
}

// Clean up platform-specific files that don't match the selected platform
async function cleanupOtherPlatformFiles(currentPlatform) {
  const projectRoot = path.join(__dirname, '..');
  
  // Clean up GitHub Pages files if not using GitHub Pages
  if (currentPlatform !== 'github-pages') {
    const githubPagesFiles = [
      path.join(projectRoot, 'public', '_redirects'),
      path.join(projectRoot, 'public', '_headers')
    ];
    
    for (const file of githubPagesFiles) {
      try {
        await fs.access(file);
        await fs.unlink(file);
        log.info(`🧹 Removed ${path.basename(file)} (GitHub Pages not selected)`);
      } catch (error) {
        // File doesn't exist, nothing to clean up
      }
    }
  }
  
  // Note: We don't remove vercel.json or netlify.toml as they may contain
  // custom configuration (serverless functions, environment variables, etc.)
}

// Platform-specific file writers
async function writeVercelConfig(redirects) {
  const projectRoot = path.join(__dirname, '..');
  const vercelJsonPath = path.join(projectRoot, 'vercel.json');
  
  if (DRY_RUN) {
    log.info('📝 [DRY RUN] Would generate vercel.json:');
    console.log(generateVercelConfig(redirects));
    return;
  }
  
  try {
    // Read existing vercel.json to preserve custom settings
    let existingConfig = {};
    try {
      const existingContent = await fs.readFile(vercelJsonPath, 'utf-8');
      existingConfig = JSON.parse(existingContent);
    } catch (error) {
      // File doesn't exist or is invalid JSON, create new one
    }
    
    // Generate new redirects and headers
    const newConfig = JSON.parse(generateVercelConfig(redirects));
    
    // Merge configs - new redirects/headers override existing ones
    const mergedConfig = {
      ...existingConfig,
      redirects: newConfig.redirects,
      headers: newConfig.headers
    };
    
    await fs.writeFile(vercelJsonPath, JSON.stringify(mergedConfig, null, 2), 'utf-8');
    log.info(`📝 Updated vercel.json with ${redirects.length} redirects`);
  } catch (error) {
    log.error(`❌ Error updating vercel.json:`, error.message);
  }
}

async function writeGitHubPagesConfig(redirects) {
  const projectRoot = path.join(__dirname, '..');
  const redirectsPath = path.join(projectRoot, 'public', '_redirects');
  const headersPath = path.join(projectRoot, 'public', '_headers');
  
  if (DRY_RUN) {
    log.info('📝 [DRY RUN] Would generate public/_redirects:');
    console.log(generateGitHubPagesConfig(redirects));
    return;
  }
  
  try {
    // Write redirects file
    const config = generateGitHubPagesConfig(redirects);
    await fs.writeFile(redirectsPath, config, 'utf-8');
    log.info(`📝 Updated public/_redirects with ${redirects.length} redirects`);
    
    // Write headers file (for paid GitHub Pages plans)
    const headersContent = `# GitHub Pages Custom Headers
# Note: Custom headers require GitHub Pages on a paid plan or GitHub Enterprise
# For free GitHub Pages, these headers won't be applied

# PDF files - allow iframe embedding
/*.pdf
  X-Frame-Options: SAMEORIGIN
  Cache-Control: public, max-age=3600

# All pages - Content Security Policy for Twitter widgets
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://giscus.app https://platform.twitter.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://giscus.app; frame-src 'self' https://www.youtube.com https://giscus.app https://platform.twitter.com; object-src 'none'; base-uri 'self';
`;
    await fs.writeFile(headersPath, headersContent, 'utf-8');
    log.info(`📝 Created public/_headers for GitHub Pages (requires paid plan)`);
  } catch (error) {
    log.error(`❌ Error updating GitHub Pages config:`, error.message);
  }
}

async function writeNetlifyConfig(redirects) {
  const projectRoot = path.join(__dirname, '..');
  const netlifyTomlPath = path.join(projectRoot, 'netlify.toml');
  
  if (DRY_RUN) {
    log.info('📝 [DRY RUN] Would generate netlify.toml:');
    console.log(generateNetlifyConfig(redirects));
    return;
  }
  
  try {
    // Read existing netlify.toml to preserve other settings
    let existingContent = '';
    try {
      existingContent = await fs.readFile(netlifyTomlPath, 'utf-8');
    } catch (error) {
      // File doesn't exist, create new one
    }
    
    // Split content at redirects section
    const configLines = existingContent.split('[[redirects]]')[0].trim();
    const redirectConfig = generateNetlifyConfig(redirects);
    
    const newContent = configLines + '\n\n' + redirectConfig;
    await fs.writeFile(netlifyTomlPath, newContent, 'utf-8');
    
    log.info(`📝 Updated netlify.toml with ${redirects.length} redirects`);
  } catch (error) {
    log.error(`❌ Error updating netlify.toml:`, error.message);
  }
}

// Validation functions
function validateVercelConfig(redirects) {
  const config = JSON.parse(generateVercelConfig(redirects));
  
  // Validate redirects
  for (const redirect of config.redirects) {
    if (!redirect.source || !redirect.destination) {
      throw new Error(`Invalid Vercel redirect: ${JSON.stringify(redirect)}`);
    }
  }
  
  log.info('✅ Vercel configuration is valid');
  return true;
}

function validateGitHubPagesConfig(redirects) {
  const config = generateGitHubPagesConfig(redirects);
  
  // Basic validation - check format
  const lines = config.trim().split('\n');
  for (const line of lines) {
    if (line.trim() && !line.match(/^[^\s]+\s+[^\s]+\s+\d+!$/)) {
      throw new Error(`Invalid GitHub Pages redirect format: ${line}`);
    }
  }
  
  log.info('✅ GitHub Pages configuration is valid');
  return true;
}

function validateNetlifyConfig(redirects) {
  const config = generateNetlifyConfig(redirects);
  
  // Basic validation - check TOML-like format
  if (!config.includes('[[redirects]]')) {
    throw new Error('Invalid Netlify configuration format');
  }
  
  log.info('✅ Netlify configuration is valid');
  return true;
}

// Main function
async function generateRedirects() {
  log.info(`🔄 Generating redirects from content aliases for ${DEPLOYMENT_PLATFORM}...`);
  
  if (VALIDATE_ONLY) {
    log.info('🔍 Validation mode - checking all platform configurations...');
  }
  
  const projectRoot = path.join(__dirname, '..');
  let allRedirects = [];
  let totalProcessedFiles = 0;
  
  // Process pages
  const pagesPath = path.join(projectRoot, 'src/content/pages');
  try {
    await fs.access(pagesPath);
    const pageResult = await processDirectory(pagesPath, false);
    allRedirects = allRedirects.concat(pageResult.redirects);
    totalProcessedFiles += pageResult.processedFiles;
  } catch (error) {
    // Pages directory doesn't exist, skipping
  }
  
  // Process posts
  const postsPath = path.join(projectRoot, 'src/content/posts');
  try {
    await fs.access(postsPath);
    const postResult = await processDirectory(postsPath, true);
    allRedirects = allRedirects.concat(postResult.redirects);
    totalProcessedFiles += postResult.processedFiles;
  } catch (error) {
    // Posts directory doesn't exist, skipping
  }
  
  // Process projects
  const projectsPath = path.join(projectRoot, 'src/content/projects');
  try {
    await fs.access(projectsPath);
    const projectResult = await processDirectory(projectsPath, false);
    allRedirects = allRedirects.concat(projectResult.redirects);
    totalProcessedFiles += projectResult.processedFiles;
  } catch (error) {
    // Projects directory doesn't exist, skipping
  }
  
  // Process docs
  const docsPath = path.join(projectRoot, 'src/content/docs');
  try {
    await fs.access(docsPath);
    const docResult = await processDirectory(docsPath, false);
    allRedirects = allRedirects.concat(docResult.redirects);
    totalProcessedFiles += docResult.processedFiles;
  } catch (error) {
    // Docs directory doesn't exist, skipping
  }
  
  if (allRedirects.length > 0) {
    log.info(`📁 Processing pages directory...`);
    log.info(`📁 Processing posts directory...`);
    log.info(`📁 Processing projects directory...`);
    log.info(`📁 Processing docs directory...`);
    log.info(`   Processed ${totalProcessedFiles} files with redirects`);
    
    // Update Astro config (platform-agnostic)
    await updateAstroConfig(allRedirects);
    
    // Generate platform-specific configs
    if (VALIDATE_ONLY) {
      // Validate all platforms
      validateVercelConfig(allRedirects);
      validateGitHubPagesConfig(allRedirects);
      validateNetlifyConfig(allRedirects);
      log.info('🎉 All platform configurations are valid!');
      return;
    }
    
    // Clean up files from other platforms before generating new config
    await cleanupOtherPlatformFiles(DEPLOYMENT_PLATFORM);
    
    // Write platform-specific config
    switch (DEPLOYMENT_PLATFORM) {
      case 'vercel':
        await writeVercelConfig(allRedirects);
        break;
      case 'github-pages':
        await writeGitHubPagesConfig(allRedirects);
        break;
      case 'netlify':
      default:
        await writeNetlifyConfig(allRedirects);
        break;
    }
  }
  
  if (DRY_RUN) {
    log.info('🎉 [DRY RUN] Redirect generation complete! No files were modified.');
  } else {
    log.info(`🎉 Redirect generation complete! Created ${allRedirects.length} redirects for ${DEPLOYMENT_PLATFORM}.`);
  }
}

// Run the script
generateRedirects();
