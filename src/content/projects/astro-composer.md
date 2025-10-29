---
title: Astro Composer
description: An Obsidian plugin to create and manage Astro blog posts easily with automated file renaming, note properties management, and internal link conversion.
date: 2025-08-20
categories:
  - Obsidian
  - Astro
  - Plugin
repositoryUrl:
projectUrl: https://github.com/davidvkimball/obsidian-astro-composer
status: in-progress
image: "[[attachments/rock.png]]"
imageAlt: Gray, rocky wall
hideCoverImage: false
hideTOC: false
draft: false
featured: true
aliases:
  - obsidian-astro-composer
---
## Project Overview

Astro Composer is a powerful Obsidian plugin designed to streamline the blogging workflow for Astro static sites. It provides automated file renaming, note properties management for post frontmatter, and seamless internal link conversion between Obsidian and Astro formats.

## Key Features

- **New Post Dialog**: Automatically prompts for a title when creating new Markdown files, generating kebab-case filenames (e.g., "My Blog Post" → `my-blog-post.md`)
- **Property Standardization**: Updates note properties to match customizable templates while preserving existing frontmatter values
- **Draft Management**: Optionally adds underscore prefixes to hide drafts from Astro builds
- **Internal Link Conversion**: Converts Obsidian wikilinks and markdown internal links to Astro-friendly Markdown links
- **Configurable Workflow**: Customize posts folder, link base path, creation mode, date format, and excluded directories
- **Rename Post Command**: Easily rename notes by updating the title property and getting automatic kebab-case file/folder updates

## Technical Implementation

Built with TypeScript and following Obsidian's plugin development best practices, the plugin integrates seamlessly with Obsidian's file system and provides a smooth user experience for content creators.

## Use Cases

- **Content Creators**: Streamline the process of creating and managing blog posts
- **Astro Developers**: Bridge the gap between Obsidian note-taking and Astro publishing
- **Technical Writers**: Maintain consistent formatting and file organization
- **Bloggers**: Focus on content creation rather than file management

## Installation & Usage

The plugin can be installed directly into Obsidian's `.obsidian/plugins/` directory and configured through Obsidian's settings interface. It supports both file-based and folder-based post structures, making it flexible for different Astro setups.

## Project Status

This project is in-progress and actively maintained. The latest version includes robust automation features and comprehensive configuration options for various Astro workflows.

<a href="https://github.com/davidvkimball/obsidian-astro-composer" class="no-styling no-underline" target="_blank"><button class="btn btn-primary w-full">  
    View Project  
  </button></a>