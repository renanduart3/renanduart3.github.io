---
title: Getting Started
date: 2025-09-06
description: Quick start guide for Astro Modular - get your blog running in minutes.
tags:
  - tutorial
  - setup
  - quick-start
  - astro
  - blog
image: "[[attachments/sunset.jpg]]"
imageAlt: Sunset skyline.
imageOG: true
hideCoverImage: false
hideTOC: false
targetKeyword: astro blog quick start
draft: false
---
Welcome to Astro Modular! This quick start guide will get your blog running in minutes. Choose your preferred workflow below.

## Prerequisites & Installation

You'll need:
- **Node.js 18+**
- **pnpm** (recommended) or npm

### Quick Setup

```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Preview
pnpm dev # or pnpm preview
# Available at http://localhost:5000

# Build for production
pnpm build
```

## Choose Your Workflow

### Using Obsidian?

Perfect! Astro Modular is designed specifically for Obsidian users.

**Quick Start:**
1. **Open the included vault**: Navigate to `src/content/` in Obsidian
2. **Trust the author** and enable the preconfigured plugins
3. **Use the Astro Modular Settings plugin** to configure your theme and preferences
4. **Start writing** with the included templates and hotkeys

**What you get:**
- **Seamless publishing** - write in Obsidian, publish to your blog with git
- **Versatile internal linking support** - `[[Wikilinks]]` work perfectly
- **Obsidian-specific features** - `> [!note]` and more display beautifully
- **Preconfigured plugins & hotkeys** - all optimized for blogging

**Next Steps:**
- Read the [Astro Suite Vault Guide](astro-suite-vault-modular-guide.md) for detailed setup
- Use the **Astro Modular Settings plugin** to customize your theme and preferences
- Start writing your first post with the included templates

### 📝 **Not Using Obsidian?**

No problem! You can still use Astro Modular with any editor.

**Quick Start:**
1. **Edit `src/config.ts`** to customize your site settings
2. **Create content** in `src/content/posts/` using standard markdown
3. **Use the command palette** (`Ctrl+K`) for navigation and theme switching
4. **Deploy** when ready

**What you get:**
- **Full customization** - complete control over themes, fonts, and layout
- **Command palette** - instant navigation and search
- **Multiple content types** - posts, pages, projects, and documentation
- **Modern features** - dark mode, responsive design, SEO optimization

**Next Steps:**
- Read the [Complete Setup Guide](docs/astro-modular-setup.md) for detailed configuration
- Explore the [Formatting Reference](formatting-reference.md) for markdown features
- Customize your theme and layout in `src/config.ts`

## Essential Configuration

Update these core settings in `src/config.ts`:

```typescript
export const siteConfig = {
  site: 'https://yourdomain.com',
  title: 'Your Blog Title',
  description: 'Your blog description',
  author: 'Your Name',
  language: 'en',
}
```

## Key Features

### 🎨 **17+ Beautiful Themes**
Switch between Oxygen, Minimal, Nord, Dracula, and more. Use `Ctrl+K` → "Change Theme" for instant switching.

### 🔍 **Command Palette**
Press `Ctrl+K` for instant navigation, search, and theme switching.

### 📱 **Responsive & Fast**
Optimized for performance with automatic image optimization and lazy loading.

### 🔗 **Smart Linking**
- **Wikilinks** (Obsidian users): `[[Post Title]]`
- **Standard links** (all users): `[Post Title](posts/post-slug)`

### 📊 **Content Types**
- **Posts** - Blog articles with tags and linked mentions
- **Pages** - Static pages like About, Contact
- **Projects** - Portfolio items and showcases
- **Documentation** - Guides and references

## Next Steps

### For Obsidian Users:
1. **Set up the vault** - Open `src/content/` in Obsidian
2. **Configure with the plugin** - Use Astro Modular Settings
3. **Start writing** - Use the included templates and hotkeys
4. **Read the vault guide** - [Astro Suite Vault Guide](astro-suite-vault-modular-guide.md)

### For Non-Obsidian Users:
1. **Customize your site** - Edit `src/config.ts`
2. **Read the full guide** - [Complete Setup Guide](docs/astro-modular-setup.md)
3. **Explore features** - [Formatting Reference](formatting-reference.md)
4. **Start writing** - Create your first post

## Need Help?

- **Complete Setup Guide**: [docs/astro-modular-setup.md](docs/astro-modular-setup.md)
- **Obsidian Vault Guide**: [astro-suite-vault-modular-guide.md](astro-suite-vault-modular-guide.md)
- **Formatting Reference**: [formatting-reference.md](formatting-reference.md)

Your modular Astro blog is ready to go! 🚀