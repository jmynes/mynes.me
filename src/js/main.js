// ═══════════════════════════════════════════════════════════════════════════
// Main Entry Point
// Initializes all modules after DOM is ready
// ═══════════════════════════════════════════════════════════════════════════

import { applyInitialTheme, initTheme } from './theme.js';
import { initLightbox } from './lightbox.js';
import { initEffects } from './effects/index.js';

// Apply theme immediately to prevent flash (runs before DOMContentLoaded)
applyInitialTheme();

// Initialize all modules after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLightbox();
  initEffects();
});
