# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mynes.me is a static portfolio landing page with 13 switchable visual themes. No build step — just open `index.html` in a browser.

## Architecture

**Theme System**: Themes are implemented as separate CSS files that override base styles. Each theme defines colors, fonts, animations, and decorative effects (bubbles, particles, scanlines, etc.) using the `.theme-bg`, `.theme-effects`, and `.theme-overlay` layers.

- `base.css` — Layout structure, component scaffolding, responsive breakpoints
- Theme files — Visual styling only: `aero.css`, `bubbly.css`, `christmas.css`, `fireflies.css`, `groovy.css`, `hacker.css`, `halloween.css`, `lilypond.css`, `powerpc.css`, `retrogame.css`, `starwars.css`, `synthwave.css`, `underworld.css`

**Theme Switching**: JavaScript in `index.html` handles theme selection via localStorage (`mynes-shuffle`, `mynes-last-theme`). Shuffle mode (default on) prevents the same theme from loading twice in a row.

**Lightbox**: Built-in screenshot viewer for project images, triggered by clicking `.project-screenshot-wrapper` elements.

## Adding a New Theme

1. Create `styles/{name}.css` following the pattern of existing theme files
2. Add button to `.theme-toggles` in `index.html`
3. Add theme name to the `themes` array in the `<script>` block
