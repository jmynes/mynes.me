# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mynes.me is a static portfolio landing page with 13 switchable visual themes.

## Build

```bash
pnpm install        # Install dependencies
pnpm run build      # Build CSS and JS to dist/
pnpm run watch      # Watch for changes during development
```

The `dist/` directory is gitignored — compiled assets are generated from source.

## Architecture

**Theme System**: Themes are SCSS files in `src/scss/themes/` that compile to `dist/css/themes/`. Each theme defines colors, fonts, animations, and decorative effects using the `.theme-bg`, `.theme-effects`, and `.theme-overlay` layers.

- `src/scss/base.scss` — Layout structure, component scaffolding, responsive breakpoints
- `src/scss/themes/*.scss` — Theme-specific visual styling

**Theme Switching**: JavaScript in `src/js/` handles theme selection via localStorage (`mynes-shuffle`, `mynes-last-theme`). Shuffle mode (default on) prevents the same theme from loading twice in a row.

**Lightbox**: Built-in screenshot viewer for project images, triggered by clicking `.project-screenshot-wrapper` elements.

## Adding a New Theme

1. Create `src/scss/themes/{name}.scss` following the pattern of existing theme files
2. Add button to `.theme-toggles` in `index.html`
3. Add theme name to the `themes` array in the `<script>` block
4. Run `pnpm run build` to compile
