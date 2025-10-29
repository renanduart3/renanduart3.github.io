import type { ImageInfo, OpenGraphImage } from '@/types';
import { siteConfig } from '@/config';

// Process images for responsive layouts
export function processImageLayout(images: ImageInfo[]): {
  layout: 'single' | 'grid-2' | 'grid-3' | 'grid-4';
  images: ImageInfo[];
} {
  const count = images.length;

  if (count === 1) {
    return { layout: 'single', images };
  } else if (count === 2) {
    return { layout: 'grid-2', images };
  } else if (count === 3) {
    return { layout: 'grid-3', images };
  } else if (count >= 4) {
    return { layout: 'grid-4', images: images.slice(0, 4) };
  }

  return { layout: 'single', images };
}

// Extract images from markdown content
export function extractImagesFromContent(content: string): ImageInfo[] {
  // Updated regex to capture title/caption: ![alt](src "title")
  const imageRegex = /!\[([^\]]*)\]\(([^)]+?)(?:\s+"([^"]*)")?\)/g;
  const images: ImageInfo[] = [];
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    const [, alt, src, title] = match;
    images.push({
      src: src.trim(),
      alt: alt.trim() || 'Image',
      caption: title ? title.trim() : undefined,
    });
  }

  return images;
}

// Find consecutive images in markdown
export function findConsecutiveImages(content: string): Array<{
  images: ImageInfo[];
  startIndex: number;
  endIndex: number;
}> {
  const lines = content.split('\n');
  const imageGroups: Array<{
    images: ImageInfo[];
    startIndex: number;
    endIndex: number;
  }> = [];

  let currentGroup: ImageInfo[] = [];
  let groupStart = -1;

  lines.forEach((line, index) => {
    const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);

    if (imageMatch) {
      const [, alt, src] = imageMatch;

      if (currentGroup.length === 0) {
        groupStart = index;
      }

      currentGroup.push({
        src: src.trim(),
        alt: alt.trim() || 'Image',
      });
    } else if (line.trim() === '' && currentGroup.length > 0) {
      // Empty line, continue group
      return;
    } else {
      // Non-image, non-empty line - end current group
      if (currentGroup.length > 1) {
        imageGroups.push({
          images: [...currentGroup],
          startIndex: groupStart,
          endIndex: index - 1
        });
      }
      currentGroup = [];
      groupStart = -1;
    }
  });

  // Handle group at end of content
  if (currentGroup.length > 1) {
    imageGroups.push({
      images: [...currentGroup],
      startIndex: groupStart,
      endIndex: lines.length - 1
    });
  }

  return imageGroups;
}

// Optimize image path for Astro
export function optimizeImagePath(imagePath: string): string {
  // Handle different image path formats
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath; // External URL
  }

  if (imagePath.startsWith('/')) {
    return imagePath; // Absolute path
  }

  // Relative path - ensure it starts with /
  return `/${imagePath}`;
}

// Optimize image path specifically for pages
export function optimizePageImagePath(imagePath: string): string {
  // Handle null, undefined, or empty strings
  if (!imagePath || typeof imagePath !== 'string') {
    return '/pages/attachments/placeholder.jpg'; // Fallback to placeholder
  }

  // Strip Obsidian brackets first
  const cleanPath = stripObsidianBrackets(imagePath.trim());
  
  // Handle empty path after cleaning
  if (!cleanPath) {
    return '/pages/attachments/placeholder.jpg';
  }

  // Handle different image path formats
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath; // External URL
  }

  if (cleanPath.startsWith('/')) {
    return cleanPath; // Absolute path
  }

  // Prevent double processing - if already optimized, return as-is
  if (cleanPath.startsWith('/pages/attachments/')) {
    return cleanPath;
  }

  // Handle Obsidian-style relative paths from markdown content
  if (cleanPath.startsWith('./images/')) {
    return cleanPath.replace('./images/', '/pages/attachments/');
  }

  if (cleanPath.startsWith('images/')) {
    return `/pages/${cleanPath}`;
  }

  // Handle case where filename is provided without path
  if (!cleanPath.includes('/')) {
    return `/pages/attachments/${cleanPath}`;
  }

  // Default - assume it's a relative path in the pages directory
  return `/pages/attachments/${cleanPath}`;
}

// Strip Obsidian double bracket syntax from image paths
export function stripObsidianBrackets(imagePath: string): string {
  if (!imagePath) return imagePath;
  
  // Remove double brackets if present
  if (imagePath.startsWith('[[') && imagePath.endsWith(']]')) {
    return imagePath.slice(2, -2);
  }
  
  return imagePath;
}

// Optimize image path specifically for posts
export function optimizePostImagePath(imagePath: string, postSlug?: string, postId?: string): string {
  // Handle null, undefined, or empty strings
  if (!imagePath || typeof imagePath !== 'string') {
    return '/posts/attachments/placeholder.jpg'; // Fallback to placeholder
  }

  // Strip Obsidian brackets first
  const cleanPath = stripObsidianBrackets(imagePath.trim());
  
  // Handle empty path after cleaning
  if (!cleanPath) {
    return '/posts/attachments/placeholder.jpg';
  }

  // Handle different image path formats
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath; // External URL
  }

  if (cleanPath.startsWith('/')) {
    return cleanPath; // Absolute path
  }

  // Prevent double processing - if already optimized, return as-is
  if (cleanPath.startsWith('/posts/attachments/')) {
    return cleanPath;
  }

  // Handle folder-based posts - check if postId contains '/index.md'
  // Folder-based posts have their content in a subdirectory with index.md
  const isFolderBasedPost = postId && postId.includes('/') && postId.endsWith('/index.md');
  
  if (isFolderBasedPost && (cleanPath.startsWith('./') || (!cleanPath.startsWith('/') && !cleanPath.startsWith('http')))) {
    const imageName = cleanPath.startsWith('./') ? cleanPath.slice(2) : cleanPath;
    return `/posts/${postSlug}/${imageName}`;
  }

  // Handle Obsidian-style relative paths from markdown content
  if (cleanPath.startsWith('./images/')) {
    return cleanPath.replace('./images/', '/posts/attachments/');
  }

  if (cleanPath.startsWith('images/')) {
    return `/posts/${cleanPath}`;
  }

  // Handle Obsidian attachments subfolder within folder-based posts
  if (cleanPath.startsWith('./attachments/')) {
    return cleanPath.replace('./attachments/', '/posts/attachments/');
  }

  if (cleanPath.startsWith('attachments/')) {
    return `/posts/${cleanPath}`;
  }

  // Handle case where filename is provided without path
  if (!cleanPath.includes('/')) {
    // For folder-based posts, check if the image exists in the post folder first
    if (isFolderBasedPost && postSlug) {
      return `/posts/${postSlug}/${cleanPath}`;
    }
    return `/posts/attachments/${cleanPath}`;
  }

  // Default - assume it's a relative path in the posts directory
  return `/posts/attachments/${cleanPath}`;
}

// Generic image optimization function for all content types
export function optimizeContentImagePath(imagePath: string, contentType: 'posts' | 'projects' | 'documentation' | 'pages', contentSlug?: string, contentId?: string): string {
  // Map content types to their URL paths
  const urlPath = contentType === 'documentation' ? 'docs' : contentType;
  
  // Handle null, undefined, or empty strings
  if (!imagePath || typeof imagePath !== 'string') {
    return `/${urlPath}/attachments/placeholder.jpg`; // Fallback to placeholder
  }

  // Strip Obsidian brackets first
  const cleanPath = stripObsidianBrackets(imagePath.trim());
  
  // Handle empty path after cleaning
  if (!cleanPath) {
    return `/${urlPath}/attachments/placeholder.jpg`;
  }

  // Handle different image path formats
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath; // External URL
  }

  if (cleanPath.startsWith('/')) {
    return cleanPath; // Absolute path
  }

  // Prevent double processing - if already optimized, return as-is
  if (cleanPath.startsWith(`/${urlPath}/attachments/`)) {
    return cleanPath;
  }

  // Handle folder-based content - check if contentId contains '/index.md'
  // Folder-based content has their content in a subdirectory with index.md
  const isFolderBasedContent = contentId && contentId.includes('/') && contentId.endsWith('/index.md');
  
  if (isFolderBasedContent && (cleanPath.startsWith('./') || (!cleanPath.startsWith('/') && !cleanPath.startsWith('http')))) {
    const imageName = cleanPath.startsWith('./') ? cleanPath.slice(2) : cleanPath;
    return `/${urlPath}/${contentSlug}/${imageName}`;
  }

  // Handle Obsidian-style relative paths from markdown content
  if (cleanPath.startsWith('./images/')) {
    return cleanPath.replace('./images/', `/${urlPath}/attachments/`);
  }

  if (cleanPath.startsWith('images/')) {
    return `/${urlPath}/${cleanPath}`;
  }

  // Handle Obsidian attachments subfolder within folder-based content
  if (cleanPath.startsWith('./attachments/')) {
    return cleanPath.replace('./attachments/', `/${urlPath}/attachments/`);
  }

  if (cleanPath.startsWith('attachments/')) {
    return `/${urlPath}/${cleanPath}`;
  }

  // Handle case where filename is provided without path
  if (!cleanPath.includes('/')) {
    // For folder-based content, check if the image exists in the content folder first
    if (isFolderBasedContent && contentSlug) {
      return `/${urlPath}/${contentSlug}/${cleanPath}`;
    }
    return `/${urlPath}/attachments/${cleanPath}`;
  }

  // Default - assume it's a relative path in the content directory
  return `/${urlPath}/attachments/${cleanPath}`;
}

// Generate responsive image srcset
export function generateSrcSet(imagePath: string, widths: number[] = [320, 640, 768, 1024, 1280]): string {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath; // Can't generate srcset for external images
  }

  const basePath = imagePath.replace(/\.[^.]+$/, ''); // Remove extension
  const extension = imagePath.match(/\.[^.]+$/)?.[0] || '.jpg';

  return widths
    .map(width => `${basePath}-${width}w${extension} ${width}w`)
    .join(', ');
}

// Get image dimensions (placeholder for actual implementation)
export async function getImageDimensions(imagePath: string): Promise<{ width: number; height: number } | null> {
  // This would typically use a library to get actual image dimensions
  // For now, return null to indicate dimensions are unknown
  return null;
}

// Get the default OG image
export function getDefaultOGImage(): OpenGraphImage {
  return {
    url: '/open-graph.png',
    alt: siteConfig.seo.defaultOgImageAlt,
    width: 1200,
    height: 630,
  };
}

// Check if image is external
export function isExternalImage(imagePath: string): boolean {
  return imagePath.startsWith('http://') || imagePath.startsWith('https://');
}

// Get fallback OG image
export function getFallbackOGImage(site?: URL): OpenGraphImage {
  const baseUrl = site ? site.toString() : siteConfig.site;
  return {
    url: `${baseUrl}/open-graph.png`,
    alt: siteConfig.seo.defaultOgImageAlt,
    width: 1200,
    height: 630,
  };
}

// Get image alt text with fallback
export function getImageAlt(image: ImageInfo, fallback: string = 'Image'): string {
  return image.alt && image.alt.trim() !== '' ? image.alt : fallback;
}

// Process images for lightbox
export function processImagesForLightbox(images: ImageInfo[]): ImageInfo[] {
  return images.map(image => ({
    ...image,
    src: optimizeImagePath(image.src),
    alt: getImageAlt(image)
  }));
}

// Create image gallery data
export function createImageGallery(images: ImageInfo[], layout: string) {
  return {
    images: processImagesForLightbox(images),
    layout,
    count: images.length,
    hasMultiple: images.length > 1
  };
}

// Validate image format
export function isValidImageFormat(imagePath: string): boolean {
  const validExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|tif|ico)$/i;
  return validExtensions.test(imagePath);
}

// Get MIME type from file extension
export function getMimeTypeFromPath(imagePath: string): string {
  const extension = imagePath.toLowerCase().match(/\.([^.]+)$/)?.[1];

  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    case 'bmp':
      return 'image/bmp';
    case 'tiff':
    case 'tif':
      return 'image/tiff';
    case 'ico':
      return 'image/x-icon';
    default:
      return 'image/jpeg'; // Safe fallback
  }
}

// Get optimized image format
export function getOptimizedFormat(imagePath: string): string {
  if (imagePath.includes('.svg')) {
    return imagePath; // Keep SVG as-is
  }

  // For other formats, prefer WebP but be more flexible
  return imagePath.replace(/\.(jpg|jpeg|png|gif|bmp|tiff|tif)$/i, '.webp');
}

// Check if image format can be optimized
export function canOptimizeImageFormat(imagePath: string): boolean {
  const extension = imagePath.toLowerCase().match(/\.([^.]+)$/)?.[1];
  // SVG and WebP don't need optimization, ICO is usually small
  return !['svg', 'webp', 'ico'].includes(extension || '');
}