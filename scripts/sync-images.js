#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';

// Simple logging utility
const isDev = process.env.NODE_ENV !== 'production';
const log = {
  info: (...args) => isDev && console.log(...args),
  error: (...args) => console.error(...args),
  warn: (...args) => console.warn(...args)
};

// Define source and target directories for posts, pages, projects, and docs
const IMAGE_SYNC_CONFIGS = [
  {
    source: 'src/content/posts/attachments',
    target: 'public/posts/attachments',
    name: 'posts'
  },
  {
    source: 'src/content/pages/attachments',
    target: 'public/pages/attachments',
    name: 'pages'
  },
  {
    source: 'src/content/projects/attachments',
    target: 'public/projects/attachments',
    name: 'projects'
  },
  {
    source: 'src/content/docs/attachments',
    target: 'public/docs/attachments',
    name: 'docs'
  }
];

// Recursively find all media files in a directory (images, audio, video, PDF)
async function findImageFiles(dir, relativePath = '') {
  const imageFiles = [];
  
  try {
    const items = await fs.readdir(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const itemRelativePath = path.join(relativePath, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory()) {
        // Recursively search subdirectories
        const subImages = await findImageFiles(itemPath, itemRelativePath);
        imageFiles.push(...subImages);
      } else if (/\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|tif|ico|mp3|wav|ogg|m4a|3gp|flac|aac|mp4|webm|ogv|mov|mkv|avi|pdf)$/i.test(item)) {
        imageFiles.push({
          sourcePath: itemPath,
          relativePath: itemRelativePath
        });
      }
    }
  } catch (error) {
    // Directory might not exist or be readable, continue
    if (error.code !== 'ENOENT') {
      log.warn(`Warning: Could not read directory ${dir}:`, error.message);
    }
  }
  
  return imageFiles;
}

// Function to find folder-based content and sync their images
async function syncFolderBasedImages(contentType) {
  const contentDir = `src/content/${contentType}`;
  const publicContentDir = `public/${contentType}`;
  
  try {
    const items = await fs.readdir(contentDir);
    let totalSynced = 0;
    let totalSkipped = 0;
    
    for (const item of items) {
      const itemPath = path.join(contentDir, item);
      const stat = await fs.stat(itemPath);
      
      // Check if it's a directory (folder-based content)
      if (stat.isDirectory()) {
        const targetDir = path.join(publicContentDir, item);
        
        // Find all media files recursively
        const imageFiles = await findImageFiles(itemPath);
        
        for (const imageFile of imageFiles) {
          // Handle attachments subfolder within folder-based content
          // Convert src/content/posts/post-name/attachments/image.png -> public/posts/post-name/image.png
          let targetRelativePath = imageFile.relativePath;
          // Handle both forward and backward slashes for cross-platform compatibility
          if (targetRelativePath.startsWith('attachments/') || targetRelativePath.startsWith('attachments\\')) {
            targetRelativePath = targetRelativePath.replace(/^attachments[/\\]/, '');
          }
          
          const targetPath = path.join(targetDir, targetRelativePath);
          const targetDirForFile = path.dirname(targetPath);
          
          // Ensure target directory exists
          await ensureDir(targetDirForFile);
          
          // Check if file needs updating
          let needsUpdate = true;
          try {
            const sourceStats = await fs.stat(imageFile.sourcePath);
            const targetStats = await fs.stat(targetPath);
            
            // Only update if source is newer or different size
            needsUpdate = sourceStats.mtime > targetStats.mtime || sourceStats.size !== targetStats.size;
          } catch {
            // Target doesn't exist, definitely needs update
            needsUpdate = true;
          }
          
          if (needsUpdate) {
            await fs.copyFile(imageFile.sourcePath, targetPath);
            totalSynced++;
          } else {
            totalSkipped++;
          }
        }
      }
    }
    
    if (totalSynced > 0 || totalSkipped > 0) {
      log.info(`📁 Syncing folder-based ${contentType} images...`);
      if (totalSynced > 0) log.info(`   Synced ${totalSynced} files`);
      if (totalSkipped > 0) log.info(`   Skipped ${totalSkipped} files that were unchanged`);
    }
    
    return { synced: totalSynced, skipped: totalSkipped };
  } catch (error) {
    log.error(`❌ Error syncing folder-based ${contentType} images:`, error);
    return { synced: 0, skipped: 0 };
  }
}

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function syncImagesForConfig(config) {
  // Ensure target directory exists
  await ensureDir(config.target);

  try {
    // Check if source directory exists
    let sourceFiles = [];
    try {
      sourceFiles = await fs.readdir(config.source);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return { synced: 0, skipped: 0, removed: 0 };
      }
      throw error;
    }

    // Find all image files recursively (including subdirectories)
    const imageFiles = await findImageFiles(config.source);
    
    let synced = 0;
    let skipped = 0;

    for (const imageFile of imageFiles) {
      const targetPath = path.join(config.target, imageFile.relativePath);
      const targetDirForFile = path.dirname(targetPath);
      
      // Ensure target directory exists (including subdirectories)
      await ensureDir(targetDirForFile);

      // Check if file needs updating
      let needsUpdate = true;
      try {
        const sourceStats = await fs.stat(imageFile.sourcePath);
        const targetStats = await fs.stat(targetPath);

        // Only update if source is newer or different size
        needsUpdate = sourceStats.mtime > targetStats.mtime || sourceStats.size !== targetStats.size;
      } catch {
        // Target doesn't exist, definitely needs update
        needsUpdate = true;
      }

      if (needsUpdate) {
        await fs.copyFile(imageFile.sourcePath, targetPath);
        synced++;
      } else {
        skipped++;
      }
    }

    // Cleanup: Remove files from target that no longer exist in source
    // We need to recursively clean up the target directory
    await cleanupTargetDirectory(config.target, imageFiles);

    return { synced, skipped, removed: 0 }; // removed count handled in cleanup function
  } catch (error) {
    log.error(`❌ Error syncing ${config.name} images:`, error);
    process.exit(1);
  }
}

// Recursively clean up target directory, removing files that no longer exist in source
async function cleanupTargetDirectory(targetDir, sourceImageFiles) {
  // Create a set that maps both original paths and attachments subfolder paths
  const sourceFileSet = new Set();
  sourceImageFiles.forEach(f => {
    sourceFileSet.add(f.relativePath);
    // Also add the path without attachments/ prefix for cleanup
    if (f.relativePath.startsWith('attachments/') || f.relativePath.startsWith('attachments\\')) {
      sourceFileSet.add(f.relativePath.replace(/^attachments[/\\]/, ''));
    }
  });
  let removed = 0;

  try {
    const items = await fs.readdir(targetDir);
    
    for (const item of items) {
      const itemPath = path.join(targetDir, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory()) {
        // Recursively clean subdirectories
        const subRemoved = await cleanupTargetDirectory(itemPath, sourceImageFiles);
        removed += subRemoved;
        
        // Remove empty directories
        try {
          const remainingItems = await fs.readdir(itemPath);
          if (remainingItems.length === 0) {
            await fs.rmdir(itemPath);
          }
        } catch {
          // Directory might not be empty or might have been removed already
        }
      } else {
        // Check if this file exists in source
        const relativePath = path.relative(targetDir, itemPath).replace(/\\/g, '/');
        if (!sourceFileSet.has(relativePath)) {
          await fs.unlink(itemPath);
          removed++;
        }
      }
    }
  } catch (error) {
    // Directory might not exist or be readable
    if (error.code !== 'ENOENT') {
      log.warn(`Warning: Could not clean directory ${targetDir}:`, error.message);
    }
  }
  
  return removed;
}

async function syncAllImages() {
  log.info('🖼️ Syncing images from content to public directory...');

  for (const config of IMAGE_SYNC_CONFIGS) {
    const result = await syncImagesForConfig(config);
    if (result.synced > 0 || result.skipped > 0) {
      log.info(`📁 Syncing ${config.name} images...`);
      if (result.synced > 0) log.info(`   Synced ${result.synced} files`);
      if (result.skipped > 0) log.info(`   Skipped ${result.skipped} files that were unchanged`);
    }
  }

  // Sync folder-based images for all content types
  const contentTypes = ['posts', 'pages', 'projects', 'docs'];
  for (const contentType of contentTypes) {
    await syncFolderBasedImages(contentType);
  }

  log.info('🎉 Image sync complete!');
}

syncAllImages();