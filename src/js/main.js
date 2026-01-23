// ═══════════════════════════════════════════════════════════════════════════
// Main Entry Point
// Initializes all modules after DOM is ready
// ═══════════════════════════════════════════════════════════════════════════

import { initEffects } from './effects/index.js';
import { initLightbox } from './lightbox.js';
import { applyInitialTheme, initTheme } from './theme.js';

// Apply theme immediately to prevent flash (runs before DOMContentLoaded)
applyInitialTheme();

// Initialize all modules after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLightbox();
  initEffects();
});
