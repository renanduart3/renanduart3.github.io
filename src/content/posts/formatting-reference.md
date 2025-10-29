---
title: Formatting Reference
date: 2025-09-08
description: Explore all the markdown, extended markdown, and other embed features available in this blog theme.
tags:
  - markdown
  - formatting
  - tutorial
  - reference
  - meta
  - blog
image: "[[attachments/mountains.png]]"
imageAlt: Mountains and water.
imageOG: false
hideCoverImage: false
hideTOC: false
targetKeyword:
draft: false
---
This post demonstrates all the markdown, extended markdown, and other embed features available in Astro Modular. Use this as both a reference guide and a showcase of what's possible.

## Basic Formatting

### Text Emphasis

- **Bold text** using `**bold**` or `__bold__`
- *Italic text* using `*italic*` or `_italic_`
- ***Bold and italic*** using `***text***`
- ~~Strikethrough~~ using `~~text~~`
- ==Highlighted text== using `==text==`
- `Inline code` using backticks

### Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

## Callouts and Admonitions

Our theme supports Obsidian-style callouts with proper icons and styling. Each callout type has its own color scheme and matching Lucide icon.

### Basic Callouts

> [!note] Note
> This is a note callout. Use it for general information that readers should be aware of.

> [!tip] Tip
> This is a tip callout. Perfect for helpful suggestions and best practices.

> [!important] Important
> This is an important callout. Use it to highlight critical information.

> [!warning] Warning
> This is a warning callout. Use it to alert readers about potential issues.

> [!caution] Caution
> This is a caution callout. Use it for dangerous or risky situations.

### Custom Titles

> [!note] Custom Note Title
> You can customize the title of any callout by adding text after the callout type.

> [!tip] Pro Tip
> Custom titles help you provide more context for your callouts.

### Collapsible Callouts

You can make callouts collapsible by adding `+` (expanded by default) or `-` (collapsed by default) after the callout type:

> [!note]+ Expanded by Default
> This callout starts expanded and can be collapsed by clicking the toggle button or the title.

> [!warning]- Collapsed by Default
> This callout starts collapsed and can be expanded by clicking the toggle button or the title.

> [!tip]+ Collapsible with Custom Title
> You can combine collapsible functionality with custom titles for more control over your content organization.

### Extended Callout Types

> [!info] Info
> Info callouts provide additional context or details.

> [!success] Success
> Success callouts highlight positive outcomes or achievements.

> [!question] Question
> Question callouts can be used to pose questions or highlight areas of uncertainty.

> [!example] Example
> Example callouts are perfect for showcasing code examples or demonstrations.

> [!quote] Quote
> Quote callouts can be used to highlight important quotes or references.

## Media Content

### Images

#### Single Image With Caption

![Mountains](/posts/attachments/mountains.png)
*Photo by [Antoine Rault](https://unsplash.com/@antoinerault?utm_source=Obsidian%20Image%20Inserter%20Plugin&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=Obsidian%20Image%20Inserter%20Plugin&utm_medium=referral)*

#### Multiple Image Layouts

This theme automatically arranges consecutive images in responsive grid layouts based on the number of images. Images can be placed together without empty lines between them to create these layouts.

**Two Images Side by Side**

![Mountain landscape](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop)
![Ocean view](https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop)

**Three Images in a Row**

![Forest path](https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop)
![Desert sunset](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop)
![City skyline](https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop)

**Four Images in a Row**

![Winter landscape](https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop)
![Spring flowers](https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop)
![Summer beach](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop)
![Autumn leaves](https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=800&h=600&fit=crop)

**How to Use Multiple Images / Gallery**

Simply place multiple images together without empty lines between them:

```markdown
![Image 1](image1.jpg)
![Image 2](image2.jpg)
![Image 3](image3.jpg)
```

On mobile devices, all layouts switch to a single column for better readability.

### Video Files

![[attachments/video.mp4]]

Video files are embedded as HTML5 video players with controls and responsive design.

### YouTube Videos

![](https://www.youtube.com/watch?v=ZhizarvwLnU)

YouTube videos are automatically embedded with responsive design and optimized settings.

### Audio Files

![[attachments/sound.wav]]

Audio files are embedded as HTML5 audio players with controls and filename display.

### PDF Documents

![[attachments/document.pdf]]

PDFs are embedded as inline viewers with download links. 

Use `![[attachments/document.pdf#page=3]]` to select a specific PDF page to display.

### Twitter/X Posts

![](https://x.com/davidvkimball/status/1933196479801536736)

Twitter posts are embedded with theme-aware styling that matches your site's light/dark mode.

## Buttons

These buttons use your existing color palette and adapt perfectly to light/dark themes. Wrap them in internal or external links if you prefer:

<div class="btn-group my-8">
  <a href="https://google.com" class="no-styling no-underline" target="_blank"><button class="btn btn-primary">Primary Action</button></a>
  <a href="https://google.com" class="no-styling no-underline" target="_blank"><button class="btn btn-secondary">Secondary</button></a>
    <a href="https://google.com" class="no-styling no-underline" target="_blank"><button class="btn btn-outline">Outlined</button></a>
      <a href="https://google.com" class="no-styling no-underline" target="_blank"><button class="btn btn-ghost">Subtle</button></a>
</div>

```html
<div class="btn-group-center my-8">
  <a href="https://google.com" class="no-styling no-underline" target="_blank"><button class="btn btn-primary">Primary Action</button></a>
  <a href="https://google.com" class="no-styling no-underline" target="_blank"><button class="btn btn-secondary">Secondary</button></a>
    <a href="https://google.com" class="no-styling no-underline" target="_blank"><button class="btn btn-outline">Outlined</button></a>
      <a href="https://google.com" class="no-styling no-underline" target="_blank"><button class="btn btn-ghost">Subtle</button></a>
</div>
```

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item
  - Another nested item
    - Deeply nested item
- Third item

### Ordered Lists

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
      1. Sub-sub-step
3. Third step

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task
  - [ ] Nested incomplete task
  - [x] Nested completed task
- [ ] Final incomplete task

## Links and References

### External Links

Here's an [external link](https://obsidian.md).

### Internal Links

You can create internal links using double brackets (wikilinks) or with standard markdown. 

For example: [[getting-started|Getting Started]] or [Astro Suite Obsidian Vault Guide (Astro Modular)](posts/astro-suite-obsidian-vault-guide-astro-modular.md).

```markdown
For example: [[getting-started|Getting Started]] or [Astro Suite Vault (Modular) Guide](astro-suite-vault-modular-guide).
```

Here's an internal link with an anchor: [[sample-folder-based-post/index#Benefits of Folder-Based Approach|Benefits of Folder-Based Approach]]

Here's a relative link: [Mermaid Diagram Test](/posts/mermaid-diagram-test) 
### Reference Links

This is a [reference link][1] and this is another [reference link][markdown].

[1]: https://example.com
[markdown]: https://daringfireball.net/projects/markdown/

### Linked Images

[![Mountains](/posts/attachments/mountains.png)](https://obsidian.md)

```
[![Mountains](/posts/attachments/mountains.png)](https://obsidian.md)
```

## Mathematical Notation

This theme includes comprehensive LaTeX math support using KaTeX for fast, client-side rendering. All math works seamlessly in both light and dark themes.

### Inline Math

Use single dollar signs for inline math: $E = mc^2$ or $\int_0^{2\pi} d\theta x+e^{-i\theta}$.

### Display Math

Use double dollar signs for centered display math:

$$
\begin{vmatrix}a & b\\
c & d
\end{vmatrix}=ad-bc
$$

$$
f(x) = x^2 + 3x + 2
$$

### Common Mathematical Notation

#### Fractions and Superscripts
- Fractions: $\frac{a}{b}$, $\frac{x^2 + 1}{x - 1}$
- Superscripts: $x^2$, $e^{i\pi} + 1 = 0$
- Subscripts: $x_1$, $H_2O$

#### Greek Letters
- $\alpha, \beta, \gamma, \delta, \epsilon, \theta, \lambda, \mu, \pi, \sigma, \phi, \omega$
- $\Gamma, \Delta, \Theta, \Lambda, \Pi, \Sigma, \Phi, \Omega$

#### Mathematical Symbols
- Summation: $\sum_{i=1}^{n} x_i$
- Product: $\prod_{i=1}^{n} x_i$
- Integral: $\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$
- Limit: $\lim_{x \to 0} \frac{\sin x}{x} = 1$

#### Matrices and Vectors
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
x \\
y
\end{pmatrix}
=
\begin{pmatrix}
ax + by \\
cx + dy
\end{pmatrix}
$$

#### Complex Equations
$$
\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t}
$$

$$
i\hbar\frac{\partial}{\partial t}\Psi(\vec{r},t) = \hat{H}\Psi(\vec{r},t)
$$

### Math in Callouts

Math works perfectly within callouts:

> [!note] Mathematical Proof
> The Pythagorean theorem states that for a right triangle:
> $$a^2 + b^2 = c^2$$
> 
> Where $c$ is the hypotenuse and $a$ and $b$ are the other two sides.

> [!tip] Integration by Parts
> The formula for integration by parts is:
> $$\int u \, dv = uv - \int v \, du$$
> 
> This is particularly useful for integrals involving products of functions.

### Advanced Mathematical Typesetting

#### Aligned Equations
$$
\begin{align}
f(x) &= ax^2 + bx + c \\
f'(x) &= 2ax + b \\
f''(x) &= 2a
\end{align}
$$

#### Cases and Piecewise Functions
$$
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$

#### Set Notation
- Natural numbers: $\mathbb{N} = \{1, 2, 3, \ldots\}$
- Real numbers: $\mathbb{R}$
- Complex numbers: $\mathbb{C}$
- Set union: $A \cup B$
- Set intersection: $A \cap B$
- Subset: $A \subseteq B$

### Math with Text

You can mix math with regular text seamlessly. For example, the quadratic formula is $x = \frac{1}{2}$, which gives us the roots of any quadratic equation $ax^2 + bx + c = 0$.

### Obsidian Compatibility

All math notation works identically in Obsidian and your published blog:

- **Inline math**: `$...$` syntax
- **Display math**: `$$...$$` syntax  
- **LaTeX commands**: Full support for standard LaTeX math commands
- **Greek letters**: Use `\alpha`, `\beta`, etc.
- **Symbols**: Use `\sum`, `\int`, `\infty`, etc. 

## Code Blocks

### Inline Code

Use `const variable = 'value'` for inline code snippets.

### JavaScript

```javascript
function greetUser(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome to our blog, ${name}`;
}

const user = "Developer";
greetUser(user);
```

### Python

```python
def calculate_fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

# Example usage
for i in range(10):
    print(f"F({i}) = {calculate_fibonacci(i)}")
```

### CSS

```css
.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  transition: transform 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}
```

### Bash/Shell

```bash
#!/bin/bash
echo "Setting up development environment..."

# Install dependencies
npm install

# Start development server
npm run dev

echo "Development server started on http://localhost:3000"
```

## Tables

### Basic Tables

| Feature   | Supported | Notes                           |
| --------- | --------- | ------------------------------- |
| Markdown  | ✅         | Full CommonMark support         |
| Wikilinks | ✅         | Obsidian-style double brackets  |
| Callouts  | ✅         | Multiple types with icons       |
| Math      | ✅         | LaTeX math with KaTeX rendering |
| Diagrams  | ✅         | Mermaid diagram support         |

### Advanced Tables

| Language | Use Case | Performance | Learning Curve |
|----------|----------|-------------|----------------|
| JavaScript | Web Development | ⭐⭐⭐⭐ | Easy |
| Python | Data Science | ⭐⭐⭐ | Easy |
| Rust | Systems Programming | ⭐⭐⭐⭐⭐ | Hard |
| Go | Backend Services | ⭐⭐⭐⭐ | Medium |

## Blockquotes

### Simple Quotes

> The best way to predict the future is to invent it.
> — Alan Kay

### Nested Quotes

> This is a top-level quote.
> 
> > This is a nested quote within the first quote.
> > 
> > > And this is a quote nested even deeper.
> 
> Back to the top level.

## Horizontal Rules

You can create horizontal rules using three dashes:

---

Or three asterisks:

***

Or three underscores:

___

## Keyboard Shortcuts

Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy and <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste.

Use <kbd>Cmd</kbd> + <kbd>K</kbd> to open the command palette.

## Special Characters and Symbols

- Copyright: ©
- Trademark: ™
- Registered: ®
- Arrows: ← ↑ → ↓ ↔ ↕
- Symbols: ★ ☆ ♠ ♣ ♥ ♦
- Currency: $ € £ ¥


## HTML Elements

Sometimes you need to use HTML for more complex formatting:

<details>
<summary>Click to expand</summary>

This content is hidden by default and can be expanded by clicking the summary.

</details>

<small>Small text for fine print</small>

## Works with Obsidian

All of these formatting options should also appear in Obsidian, with some differences depending on the theme you use. 

### Quick Reference

- **Bold**: `**text**` or `__text__`
- **Italic**: `*text*` or `_text_`
- **Code**: `` `code` ``
- **Highlight:** `==text==`
- **Links**: `[text](url)` or `[[wikilink]]`
- **Images**: `![alt](url)`
- **Lists**: `-` or `1.` for ordered
- **Tasks**: `- [ ]` and `- [x]`
- **Tables**: Use `|` to separate columns
- **Quotes**: Start lines with `>`
- **Callouts**: `> [!TYPE]`
- **Horizontal rule**: `---`

Happy writing! 
