---
title: Astro Suite Obsidian Vault Guide (Astro Modular)
date: 2025-09-10
description: How to use the included Astro Suite Obsidian vault.
tags:
  - tutorial
  - setup
  - configuration
  - astro
  - obsidian
image: "[[attachments/astro-composer-suite-for-obsidian.png]]"
imageAlt: Astro and Obsidian logos stacked vertically with a "+" (plus) sign between them.
imageOG: true
hideCoverImage: true
hideTOC: false
targetKeyword: astro suite obsidian vault
draft: false
aliases:
  - astro-suite-vault-modular-guide
---
![Astro and Obsidian logos stacked vertically with a "+" (plus) sign between them.](/posts/attachments/astro-composer-suite-for-obsidian.png)

## Overview

All plugins, key bindings, and the theme can be customized to your liking, but this is what's on by default. Optimized for use with the [Modular Astro theme](https://github.com/davidvkimball/astro-modular). 

## Philosophy 

1. Plug-and-play Astro blogging experience. 
2. Emphasis on customization and modularity. 
3. Visual parity between backend and frontend.

## Theme

For out-of-the-box customization, [Minimal](https://minimal.guide/home) theme is used. It uses an understated color scheme with high contract options. 

The [Minimal Theme Settings](https://github.com/kepano/obsidian-minimal-settings), [Hider](https://github.com/kepano/obsidian-hider), and [Style Settings](https://obsidian.md/plugins?id=obsidian-style-settings) community plugins are also installed by default, giving you complete control over your experience. 

## CSS Snippets

`astro-modular-styling` gives embedded HTML elements a similar look to how the theme handles them on the front end, for example form and button styling.

> [!tip]- Tip: Optional CSS Snippets
> An optional custom CSS snippet called `custom-draggable-top-area.css` makes moving your window is easier when the window frame is hidden and there's no tab bar. There are also versions specific to Windows and Mac that have OS-specific UI offsets, or just use the base version for no offsets. All can be configured in Settings > Appearance > CSS Snippets. None of these are active in mobile.
> 
> `hide-properties-heading-and-add-properties-button.css` is included if you'd rather use a CSS snippet instead of the Style Settings plugin, mentioned later in this post.
> 
> `hide-tabs-icon-mobile.css` removes the tabs icon in the mobile version of Obsidian. If you enable the Disable Tabs plugin, you may want to enable this snippet as well.
> 
> Both `hide-longpress-flair-mobile.css` and `hide-header-title-mobile.css` are also related to making the mobile interface more simple. Enable any of these snippets to hide these elements.

## Important Hotkeys

Here's a guide for some important hotkeys set especially for this theme:
- Toggle left side panel: `CTRL + ALT + Z`
- Toggle right side panel: `CTRL + ALT + X`
- Toggle tab bar: `CTRL + ALT + S`
- Navigate back: `ALT + ←`
- Navigate forward: `ALT + →`
- Open homepage: `CTRL + M` 
- Add a new property: `CTRL + ;`
- Toggle property visibility for current note: `CTRL + ALT + P`
- Toggle reading view: `CTRL + E`
- Toggle Zen mode: `CTRL + SHIFT + Z`
- Insert image: `CTRL + '`
- Insert callout: `CTRL + SHIFT + C`
- Rename current note: `CTRL + R` 
- Open SEO audit: `CTRL + SHIFT + A`
- Start Terminal: `CTRL + SHIFT + D`
- Open config file: `CTRL + SHIFT + ,`
- Git: Commit and Sync `CTRL + SHIFT + S`

If you're on Mac, `CTRL` = `CMD`.

## Plugins 

Disabled default core plugins: 
- Canvas
- Daily notes
- Note composer
- Page preview
- Templates
- Sync

Community plugins enabled: 
- Alias Filename History
- Astro Composer
- Default New Tab Page
- Git
- Hider
- Homepage
- Image Inserter
- Minimal Theme Settings
- Paste image rename
- Property Over Filename
- ProZen
- SEO
- Shell commands
- Style Settings
- Title-Only Tab

### Astro Composer and Alias Filename History

Handy for easily creating new notes as Astro blog posts. Just create a new note with `CTRL + N`, type in a title in Title case or with special characters, and the note or folder name generated is a kebab-case version of the title without special characters. This is ideal for automating post slugs. 

You can also define and set default properties that can be generated automatically or manually set for any open note as well. The "Standardize properties" command can help set or reorganize any missing properties or tags, especially if you update your properties template down the road.

Unlike other themes, you can use wikilinks or standard markdown links, ***without*** having to convert those to internal links for Astro with the "Convert internal links for Astro" command. This theme supports any internal link that works with Obsidian.

You can also easily grab links to headings by right clicking one and selecting "Copy Heading Link". 

`CTRL + R` allows you to easily rename blog posts, and note filenames (or parent folders) get updated in kebab-case automatically. When this happens, the old filename will be stored as an alias by default via the Alias Filename History plugin. This means redirects of the old post or page URL will go to the current post's slug, which is configured in Astro. 

You can adjust lots of settings including regex for ignoring names (like `Untitled` or a `_` prefix), timeout in seconds to store the name, or looking for changes in the parent folder name as well if you use the folder-based post option.

### Homepage and Default New Tab Page

Both of these work together so you're default screen is a `.base` file that's a directory of all of your blog posts, listed in reverse-chronological order. You're able to customize the note properties and views to your liking. 

The Base is nested within a folder called `_bases` because Astro will ignore files and folders with an underscore prefix, letting you use this for Obsidian without processing it for the live site.

I call this "Home Base."

### Minimal Theme Settings, Hider, and Style Settings

As mentioned earlier, these plugins keep you focused and distraction-free while allowing for customization of your experience. 

Should you desire to hide any of the panels, you can use `CTRL + ALT Z` for the left side panel, `CTRL + ALT + X` for the right side panel, or `CTRL + ALT + S` for the tab bar. Pressing it again will reveal it again. 

In Style Settings, the only options that have been modified are hiding the Properties heading and the "Add Property" button. If you prefer, you disable this plugin and use the `hide-properties-heading-and-add-properties-button.css` CSS snippet.

### Paste Image Rename 

Quickly drag and drop image files or paste directly from your clipboard and give them kebab-case, SEO-friendly names. 

### Image Inserter

Pull in images from Unsplash or other sources easily with just a few keystrokes. Just use `CTRL + '` to insert an image - and immediately set a SEO-friendly filename for it via the Paste Image Rename plugin.

### Title-Only Tab

Pulls from the `title` property instead of using the filename for any tab. 

### Property Over Filename

When linking or searching notes, you can use the `title` property as its primary identifier, which is more helpful semantically for linking between and searching for posts and pages, since note filenames are post/page slugs in kebab case instead of titles. 

When you link to another note, its `title` is automatically set as the hyperlinked text, but you can easily change it to something else after it's been inserted.

### ProZen

Zen mode offers another quick option to focus on your writing. Pressing `CTRL + SHIFT + Z` will enter Zen mode: automatic full-screen, all elements removed except for your content. Then use `ESC` to exit. 

This plugin is a great alternative if you don't prefer to use Hider to remove the UI, and prefer to toggle it all on or off at once as needed. Alternatively, you can use the Focus Mode included in the Minimal theme.

### SEO

Get a snappy audit of your content for search engine rankings and AI parsing. You can get a quick snapshot of your whole vault or drill down into specific posts.  

### Shell commands and Commander

Shell commands helps us open two things quickly: terminal and Astro's `config.ts` file. 

To open terminal quickly, use the `Start Terminal` command. It's been modified for Windows, macOS, and Linux to start terminal in the relevant directory so you can easily do standard package manager commands like `npm` or `pnpm`. It can be activated with `CTRL + SHIFT + D`. 

To open your `config.ts` file quickly, simply use the `Astro Configuration` command. You can also press `CTRL + SHIFT + ,` to open it with your default application. 

Commander helps us place a button for each of these actions on the file explorer UI.

> [!warning]- Linux User Warning
> On Linux, there isn't a universal method to open the default terminal. Additionally, the widely used Flatpak (via Flathub) employs non-trivial sandboxing, which introduces further challenges. To address this, both commands utilize FreeDesktop's `xdg-open` to access the configuration file and launch the file manager. Most file managers offer a right-click option like `Open in Terminal`, so if you're using a Linux distribution, you can rely on that feature.

### BRAT (Temporary)

Only used temporarily to load Alias Filename History, Astro Composer, Disable Tabs, and Property Over Filename plugins before they're available in the Obsidian plugin directory. Future versions of this vault will remove BRAT in favor of the official releases.

### Git

With the [Git](https://obsidian.md/plugins?id=obsidian-git) plugin, you can easily publish to your Astro blog without leaving Obsidian using `CTRL + SHIFT + S`. Simply enable the plugin and configure with git to turn it on.

### Disable Tabs

This is off by default, but if enabled, opening any new tab replaces the current one only. Especially nice for when you're hiding the tab bar and don't want multiple tabs. If you enable this plugin, you'd probably want to use some of those optional CSS snippets mentioned above to make window management easier.

When combined with the Homepage and New Default Tab plugins, `CTRL + T` and `CTRL + M` essentially do the same thing.