// ═══════════════════════════════════════════════════════════════════════════
// Main Entry Point
// Initializes all modules after DOM is ready
// ═══════════════════════════════════════════════════════════════════════════

import { initEffects } from './effects/index.js';
import { initLightbox } from './lightbox.js';
import { applyInitialTheme, initTheme } from './theme.js';

// Apply theme immediately to prevent flash (runs before DOMContentLoaded)
applyInitialTheme();

/**
 * Check if theme toggles overflow and wrap header to new row if needed.
 * Also adjusts body padding to account for header height.
 */
function updateHeaderWrap() {
  const header = document.querySelector('.site-header');
  const toggles = document.querySelector('.theme-toggles');
  if (!header || !toggles) return;

  // Skip on mobile (header is not fixed)
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) {
    header.classList.remove('wrapped');
    document.body.style.paddingTop = '';
    return;
  }

  // Temporarily unwrap to measure true overflow
  header.classList.remove('wrapped');

  // Check if content overflows (scrollWidth > clientWidth)
  const overflows = toggles.scrollWidth > toggles.clientWidth + 1; // +1 for rounding

  header.classList.toggle('wrapped', overflows);

  // Adjust body padding to match header height
  const headerHeight = header.offsetHeight;
  document.body.style.paddingTop = `${headerHeight + 16}px`; // +16 for breathing room
}

// Initialize all modules after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLightbox();
  initEffects();

  // Check header wrap on load and resize
  updateHeaderWrap();
  window.addEventListener('resize', updateHeaderWrap);
});
