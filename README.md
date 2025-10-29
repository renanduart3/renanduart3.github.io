# Astro Modular

A flexible blog theme designed for Obsidian users. 

<img width="1600" height="900" alt="Astro Modular theme shown off in 3 screenshots, with the left screenshot showing the homepage, the top right showing the bottom of a post, and the bottom right showing a minimal homepage." src="https://github.com/user-attachments/assets/612b2171-d141-412b-a891-5b1caa1447b8" />

<img width="1920" height="1080" alt="Astro Modular Obsidian vault." src="https://github.com/user-attachments/assets/f87be126-b6dc-4367-82bc-511ab73f5a07" />


## Stats

![Alt](https://repobeats.axiom.co/api/embed/66fe41c94d95b32b92c1a2fd8d6dc83d386bc10a.svg "Repobeats analytics image")

<img width="1319" height="298" alt="pagespeed" src="https://github.com/user-attachments/assets/e09c8ee1-6f91-46d6-84a5-e2d8a35c1e14" />


### Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/3f849f7a-71e6-463b-84af-01c523012348/deploy-status)](https://app.netlify.com/sites/astro-modular/deploys)
[![GitHub last commit](https://img.shields.io/github/last-commit/davidvkimball/astro-modular)](https://github.com/davidvkimball/astro-modular)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/davidvkimball/astro-modular)](https://github.com/davidvkimball/astro-modular)

### Tech Stack
[![Astro](https://img.shields.io/badge/Astro-5.13.4-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8+-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Obsidian 1.10.0+](https://img.shields.io/badge/Obsidian-1.10.0+-7C3AED?logo=obsidian&logoColor=white)](https://obsidian.md/)
[![Markdown Extended](https://img.shields.io/badge/Markdown-Extended-000000?logo=markdown&logoColor=white)](https://daringfireball.net/projects/markdown/)

## Why Astro Modular?

- **Obsidian As A CMS**: Works with Obsidian out of the box, write and publish instantly
- **Highly Customizable**: Every feature can be enabled/disabled independently
- **Performance-Focused**: Assets are highly optimized for lightning-fast loading
- **SEO-Ready**: Automatic sitemap, RSS feed, and Open Graph image generation

## Features

- [x] **Custom Themes** 
- [x] **Feature Toggle Control** 
- [x] **Dark/Light Mode** 
- [x] **Search & Command Palette** 
- [x] **Wikilinks & Linked Mentions** 
- [x] **Obsidian-Style Callouts** 
- [x] **Folder-Based Posts** 
- [x] **Multiple Content Types** (Posts, Pages, Projects, Documentation)
- [x] **Image Optimization** 
- [x] **Automatic Sitemap, RSS, Open Graph, robots.txt, & llms.txt Generation** 
- [x] **Table of Contents** 
- [x] **Smooth Scroll & Page Transitions** 
- [x] **Image Gallery & Lightbox** 
- [x] **Reading Time & Word Count** 
- [x] **Tagging**
- [x] **Graph View**
- [x] **Mermaid Diagrams**
- [x] **LaTeX & Math Rendering** 
- [x] **Profile Picture** 
- [x] **Comments**

## Quick Start

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/davidvkimball/astro-modular)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/davidvkimball/astro-modular)

### Prerequisites
- Node.js 18 or higher
- pnpm (recommended) or npm

> [!NOTE]
> While this theme works great with any markdown editor, it's specifically optimized for Obsidian use. See the [Astro Suite Vault Guide](src/content/posts/astro-suite-vault-modular-guide.md) for Obsidian-specific features.

### Setup

1. **Install pnpm (if you don't have it):**
   ```bash
   npm install -g pnpm
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Preview:**
   ```bash
   pnpm dev
   ```
   Your blog will be available at `http://localhost:5000`

4. **Build for production:**
   ```bash
   pnpm build
   ```

### Configuration

Edit `src/config.ts` to customize your site - change the theme, enable/disable features, and configure all settings.

## Deployment

Set your deployment platform once in `src/config.ts` under `deployment.platform` ("netlify", "vercel", or "github-pages"). The build process automatically generates the correct configuration files for your chosen platform - no environment variables needed!

## Documentation

For detailed guides, see the included blog posts:
- **[Getting Started](src/content/posts/getting-started.md)** - complete setup and workflow guide
- **[Formatting Reference](src/content/posts/formatting-reference.md)** - comprehensive formatting reference  
- **[Astro Suite Vault Guide](src/content/posts/astro-suite-vault-modular-guide.md)** - Obsidian vault walkthrough

**For AI Agents & Developers:** See [AGENTS.md](AGENTS.md) for comprehensive technical documentation.

## Contributing

This is an open-source project. Feel free to submit feature requests, report bugs, or contribute improvements.

## License

[MIT License](https://github.com/davidvkimball/astro-modular?tab=MIT-1-ov-file)
