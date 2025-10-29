import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { remarkInternalLinks, remarkFolderImages, remarkImageCaptions } from './src/utils/internallinks.ts';
import remarkCallouts from './src/utils/remark-callouts.ts';
import remarkImageGrids from './src/utils/remark-image-grids.ts';
import remarkMermaid from './src/utils/remark-mermaid.ts';
import { remarkObsidianEmbeds } from './src/utils/remark-obsidian-embeds.ts';
import remarkMath from 'remark-math';
import remarkReadingTime from 'remark-reading-time';
import remarkToc from 'remark-toc';
import rehypeKatex from 'rehype-katex';
import rehypeMark from './src/utils/rehype-mark.ts';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { siteConfig } from './src/config.ts';
import swup from '@swup/astro';

// Deployment platform configuration
// Prefer explicit env var, otherwise read from siteConfig, finally default to netlify
const DEPLOYMENT_PLATFORM = process.env.DEPLOYMENT_PLATFORM || siteConfig.deployment.platform || 'github-pages';

export default defineConfig({
  site: siteConfig.site,
  deployment: {
    platform: DEPLOYMENT_PLATFORM
  },
  devToolbar: {
    enabled: false
  },
  redirects: {
  '/about-me': '/about',
  '/about-us': '/about',
  '/contact-me': '/contact',
  '/contact-us': '/contact',
  '/privacy': '/privacy-policy',
  '/posts/astro-suite-vault-modular-guide': '/posts/astro-suite-obsidian-vault-guide-astro-modular',
  '/posts/mermaid-test': '/posts/mermaid-diagram-test',
  '/projects/obsidian-astro-composer': '/projects/astro-composer',
  '/docs/api-reference': '/docs/api',
  '/docs/astro-modular-configuration': '/docs/configuration',
  '/docs/sourcetree-and-git': '/docs/sourcetree-and-git-setup'
},
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    },
    remotePatterns: [{
      protocol: 'https'
    }]
  },
  integrations: [
    tailwind(),
    sitemap(),
    mdx(),
    swup({
      theme: false,
      animationClass: 'transition-swup-',
      containers: ['#swup-container'],
      smoothScrolling: false,
      cache: true,
      preload: true, 
      accessibility: false,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
      plugins: [], // Disable all plugins including scroll
      skipPopStateHandling: (event) => {
        // ALWAYS skip Swup handling for back/forward navigation
        // Let the browser handle it naturally
        return true;
      },
      // Simplified link selector for better compatibility
      linkSelector: 'a[href]:not([data-no-swup]):not([href^="mailto:"]):not([href^="tel:"])'
    })
  ],
  markdown: {
        remarkPlugins: [
          remarkInternalLinks,
      remarkFolderImages,
      remarkObsidianEmbeds,
      remarkImageCaptions,
      remarkMath,
      remarkCallouts,
      remarkImageGrids,
      remarkMermaid,
      [remarkReadingTime, {}],
      [remarkToc, { 
        tight: true,
        ordered: false,
        maxDepth: 3,
        heading: 'contents|table[ -]of[ -]contents?|toc'
      }],
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeMark,
      [rehypeSlug, {
        test: (node) => node.tagName !== 'h1'
      }],
      [rehypeAutolinkHeadings, {
        behavior: 'wrap',
        test: (node) => node.tagName !== 'h1',
        properties: {
          className: ['anchor-link'],
          ariaLabel: 'Link to this section'
        }
      }]
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
        '@/components': new URL('./src/components', import.meta.url).pathname,
        '@/layouts': new URL('./src/layouts', import.meta.url).pathname,
        '@/utils': new URL('./src/utils', import.meta.url).pathname,
        '@/types': new URL('./src/types.ts', import.meta.url).pathname,
        '@/config': new URL('./src/config.ts', import.meta.url).pathname
      }
    },
    server: {
      host: 'localhost',
      port: 5000,
      allowedHosts: [],
      middlewareMode: false,
      hmr: false,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.ASTRO_CONTENT_COLLECTION_CACHE': 'false'
    },
    server: {
      watch: {
        usePolling: process.platform === 'win32', // Use polling on Windows for better file watching
        interval: 1000
      }
    },
    optimizeDeps: {
      exclude: ['astro:content']
    }
  },
  build: {
    assets: '_assets'
  }
});