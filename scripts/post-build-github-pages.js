#!/usr/bin/env node

/**
 * Post-build script for GitHub Pages deployment
 * Generates _redirects file in dist/ directory after Astro build completes
 * This avoids Vite trying to process these files during the build phase
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = {
  info: (...args) => console.log(...args),
  error: (...args) => console.error(...args),
};

// Import deployment platform helper
import getDeploymentPlatform from './get-deployment-platform.js';

const DEPLOYMENT_PLATFORM = process.env.DEPLOYMENT_PLATFORM || getDeploymentPlatform();

// Only run for GitHub Pages
if (DEPLOYMENT_PLATFORM !== 'github-pages') {
  log.info('⏭️  Skipping GitHub Pages post-build (platform:', DEPLOYMENT_PLATFORM, ')');
  process.exit(0);
}

async function generateRedirectsFile() {
  const projectRoot = path.join(__dirname, '..');
  const distPath = path.join(projectRoot, 'dist');
  const redirectsPath = path.join(distPath, '_redirects');
  
  try {
    // Ensure dist directory exists
    await fs.access(distPath);
  } catch (error) {
    log.error('❌ dist/ directory not found. Run astro build first.');
    process.exit(1);
  }
  
  try {
    // Read astro.config.mjs to extract redirects
    const astroConfigPath = path.join(projectRoot, 'astro.config.mjs');
    const astroContent = await fs.readFile(astroConfigPath, 'utf-8');
    
    // Extract redirects object from astro.config.mjs
    const redirectsMatch = astroContent.match(/redirects:\s*(\{[^}]*\})/s);
    
    if (!redirectsMatch) {
      log.info('ℹ️  No redirects found in astro.config.mjs');
      return;
    }
    
    // Parse the redirects object (convert single quotes to double quotes for JSON parsing)
    const redirectsText = redirectsMatch[1].replace(/'/g, '"');
    const redirectsObj = JSON.parse(redirectsText);
    
    // Generate GitHub Pages redirects format
    const redirectLines = Object.entries(redirectsObj).map(([from, to]) => 
      `${from}    ${to}    301!`
    );
    
    const redirectsContent = redirectLines.join('\n') + '\n';
    
    // Write to dist/_redirects
    await fs.writeFile(redirectsPath, redirectsContent, 'utf-8');
    log.info(`✅ Created dist/_redirects with ${redirectLines.length} redirects`);
    
  } catch (error) {
    log.error('❌ Error generating _redirects:', error.message);
    process.exit(1);
  }
}

// Run the script
generateRedirectsFile();
