
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config';
import { shouldShowPost, shouldShowContent } from '../utils/markdown';

function shouldExcludeFromSitemap(slug: string): boolean {
  const excludedSlugs = ['404', 'sitemap', 'rss'];
  return excludedSlugs.includes(slug);
}

export const GET: APIRoute = async ({ site }) => {  
  const siteUrl = site?.toString() || siteConfig.site;  
    
  // Get all content collections
  const posts = await getCollection('posts');  
  const pages = await getCollection('pages');
  const projects = await getCollection('projects');
  const docs = await getCollection('docs');  
    
  // Filter posts based on environment  
  const isDev = import.meta.env.DEV;  
  const visiblePosts = posts.filter(post =>   
    shouldShowPost(post, isDev) && !post.data.noIndex  
  );  
    
  // Filter pages (exclude drafts, special pages, and noIndex)  
  const visiblePages = pages.filter(page =>   
    !page.data.draft &&   
    !page.data.noIndex &&  
    !shouldExcludeFromSitemap(page.slug)  
  );

  // Filter projects and docs based on environment and optional content type settings
  const visibleProjects = siteConfig.optionalContentTypes.projects 
    ? projects.filter(project => shouldShowContent(project, isDev) && !project.data.noIndex)
    : [];
  
  const visibleDocs = siteConfig.optionalContentTypes.docs 
    ? docs.filter(doc => shouldShowContent(doc, isDev) && !doc.data.noIndex)
    : []; 
  
  // Generate URLs
  const urls: string[] = [];
  
  // Homepage
  urls.push(`
    <url>
      <loc>${siteUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  `);
  
  // Posts index page
  urls.push(`
    <url>
      <loc>${siteUrl}/posts/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
  `);

  // Projects index page (only if projects are enabled)
  if (siteConfig.optionalContentTypes.projects) {
    urls.push(`
      <url>
        <loc>${siteUrl}/projects/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  }

  // Documentation index page (only if docs are enabled)
  if (siteConfig.optionalContentTypes.docs) {
    urls.push(`
      <url>
        <loc>${siteUrl}/docs/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  }
  
  // Individual posts
  visiblePosts.forEach(post => {
    urls.push(`
      <url>
        <loc>${siteUrl}posts/${post.slug}/</loc>
        <lastmod>${post.data.date.toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });
  
  // Individual pages
  visiblePages.forEach(page => {
    urls.push(`
      <url>
        <loc>${siteUrl}${page.slug}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
    `);
  });

  // Individual projects
  visibleProjects.forEach(project => {
    const lastmod = project.data.date;
    urls.push(`
      <url>
        <loc>${siteUrl}projects/${project.slug}/</loc>
        <lastmod>${lastmod.toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
    `);
  });

  // Individual documentation pages
  visibleDocs.forEach(doc => {
    const lastmod = doc.data.lastModified || new Date();
    urls.push(`
      <url>
        <loc>${siteUrl}docs/${doc.slug}/</loc>
        <lastmod>${lastmod.toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
    `);
  });
  
  // Posts pagination pages
  const postsPerPage = siteConfig.postOptions.postsPerPage;
  const totalPages = Math.ceil(visiblePosts.length / postsPerPage);
  
  for (let page = 2; page <= totalPages; page++) {
    urls.push(`
      <url>
        <loc>${siteUrl}posts/${page}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `);
  }
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${urls.join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};
