import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Image, Link } from 'mdast';

// Audio file extensions (matches astro-loader-obsidian)
const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.3gp', '.flac', '.aac'];

// Video file extensions (matches astro-loader-obsidian)
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogv', '.mov', '.mkv', '.avi'];

// PDF file extensions
const PDF_EXTENSIONS = ['.pdf'];

// SVG file extensions
const SVG_EXTENSIONS = ['.svg'];

// YouTube URL patterns
const YOUTUBE_PATTERNS = [
  /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
  /^https?:\/\/youtu\.be\/([^&\n?#]+)/,
  /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/
];


// Twitter/X URL patterns
const TWITTER_PATTERNS = [
  /^https?:\/\/(?:www\.)?twitter\.com\/\w+\/status\/(\d+)/,
  /^https?:\/\/(?:www\.)?x\.com\/\w+\/status\/(\d+)/
];

// Helper function to get file extension
function getFileExtension(url: string): string {
  const pathname = new URL(url, 'http://example.com').pathname;
  const lastDot = pathname.lastIndexOf('.');
  return lastDot !== -1 ? pathname.substring(lastDot).toLowerCase() : '';
}

// Helper function to check if URL is external
function isExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url, 'http://example.com');
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Helper function to extract YouTube video ID
function extractYouTubeVideoId(url: string): string | null {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}


// Helper function to extract Twitter/X post ID
function extractTwitterPostId(url: string): string | null {
  for (const pattern of TWITTER_PATTERNS) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

// Helper function to create HTML node
function createHtmlNode(html: string): any {
  return {
    type: 'html',
    value: html
  };
}

export const remarkObsidianEmbeds: Plugin<[], Root> = () => {
  return (tree, file: any) => {
    // Visit image nodes (covers ![[file]] syntax)
    visit(tree, 'image', (node: Image, index, parent) => {
      if (!node.url || !parent || typeof index !== 'number') return;

      const url = node.url;
      const alt = node.alt || '';
      const extension = getFileExtension(url);

        // Detect collection and slug from file path (same logic as remarkFolderImages)
        let resolvedUrl = url;
        if (url.startsWith('attachments/') && file.path) {
          const isFolderPost = file.path.includes('/posts/') && file.path.endsWith('/index.md');
          const isFolderPage = file.path.includes('/pages/') && file.path.endsWith('/index.md');
          const isFolderProject = file.path.includes('/projects/') && file.path.endsWith('/index.md');
          const isFolderDoc = file.path.includes('/docs/') && file.path.endsWith('/index.md');
          
          if (isFolderPost || isFolderPage || isFolderProject || isFolderDoc) {
            // Folder-based content: /collection/slug/attachments/file
            const pathParts = file.path.split('/');
            let collection = 'posts';
            let contentIndex = pathParts.indexOf('posts');
            
            if (isFolderPage) {
              collection = 'pages';
              contentIndex = pathParts.indexOf('pages');
            } else if (isFolderProject) {
              collection = 'projects';
              contentIndex = pathParts.indexOf('projects');
            } else if (isFolderDoc) {
              collection = 'docs';
              contentIndex = pathParts.indexOf('docs');
            }
            
            const contentSlug = pathParts[contentIndex + 1];
            resolvedUrl = `/${collection}/${contentSlug}/${url}`;
          } else {
            // File-based content: /collection/attachments/file (shared attachments folder)
            let collection = 'posts';
            if (file.path.includes('/pages/')) collection = 'pages';
            else if (file.path.includes('/projects/')) collection = 'projects';
            else if (file.path.includes('/docs/')) collection = 'docs';
            
            resolvedUrl = `/${collection}/${url}`;
          }
        }

      // Handle audio files
      if (AUDIO_EXTENSIONS.includes(extension)) {
        const html = `<div class="audio-embed">
  <audio class="audio-player" controls src="${resolvedUrl}"></audio>
</div>`;
        parent.children[index] = createHtmlNode(html);
        return;
      }

      // Handle video files
      if (VIDEO_EXTENSIONS.includes(extension)) {
        const html = `<div class="video-embed">
  <video class="video-player" controls src="${resolvedUrl}"></video>
</div>`;
        parent.children[index] = createHtmlNode(html);
        return;
      }

      // Handle PDF files
      if (PDF_EXTENSIONS.includes(extension)) {
        const filename = url.split('/').pop() || 'document.pdf';
        const html = `<div class="pdf-embed">
  <iframe class="pdf-viewer" src="${resolvedUrl}"></iframe>
  <div class="pdf-info">
    <span class="pdf-filename">${filename}</span>
    <a href="${resolvedUrl}" download class="pdf-download-link" target="_blank" rel="noopener noreferrer">Download PDF</a>
  </div>
</div>`;
        parent.children[index] = createHtmlNode(html);
        return;
      }

      // Handle SVG files (embedded as responsive images)
      if (SVG_EXTENSIONS.includes(extension)) {
        const html = `<div class="svg-embed">
  <img src="${resolvedUrl}" alt="${alt}" class="svg-image" />
</div>`;
        parent.children[index] = createHtmlNode(html);
        return;
      }

      // Handle web embeds (YouTube, Twitter/X) in image syntax
      if (isExternalUrl(url)) {
        // Check for Twitter/X
        const twitterPostId = extractTwitterPostId(url);
        if (twitterPostId) {
          const html = `<blockquote class="twitter-tweet" data-twitter-embed data-theme="preferred_color_scheme" data-conversation="none"><a href="https://twitter.com/user/status/${twitterPostId}"></a></blockquote>`;
          parent.children[index] = createHtmlNode(html);
          return;
        }

        // Check for YouTube
        const youtubeVideoId = extractYouTubeVideoId(url);
        if (youtubeVideoId) {
          const html = `
<div class="youtube-embed aspect-video overflow-hidden rounded-xl my-8">
  <iframe 
    src="https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1" 
    title="${alt || 'YouTube video player'}" 
    allowfullscreen 
    loading="lazy"
    class="w-full h-full"
  ></iframe>
</div>`;
          parent.children[index] = createHtmlNode(html);
          return;
        }
      }
    });

    // Visit link nodes (covers ![](url) syntax for web embeds)
    visit(tree, 'link', (node: Link, index, parent) => {
      if (!node.url || !parent || typeof index !== 'number') return;

      const url = node.url;
      const title = node.title || '';


      // Handle YouTube embeds
      const youtubeVideoId = extractYouTubeVideoId(url);
      if (youtubeVideoId) {
        const html = `
<div class="youtube-embed aspect-video overflow-hidden rounded-xl my-8">
  <iframe 
    src="https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1" 
    title="${title || 'YouTube video player'}" 
    allowfullscreen 
    loading="lazy"
    class="w-full h-full"
  ></iframe>
</div>`;
        parent.children[index] = createHtmlNode(html);
        return;
      }


    });
  };
};
