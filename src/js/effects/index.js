// ═══════════════════════════════════════════════════════════════════════════
// Effects Registry
// Manages theme-specific visual effects and observes theme changes
// ═══════════════════════════════════════════════════════════════════════════

import * as bubbly from './bubbly.js';
import * as christmas from './christmas.js';
import * as fireflies from './fireflies.js';
import * as halloween from './halloween.js';
import * as inferno from './inferno.js';
import * as pond from './pond.js';

// Registry of effects by theme name
const effects = {
  bubbly,
  christmas,
  fireflies,
  halloween,
  inferno,
  pond,
};

let currentEffect = null;

/**
 * Update active effect based on current theme
 */
function updateActiveEffect() {
  const currentTheme = document.documentElement.dataset.theme;

  // Stop current effect if different theme
  if (currentEffect && currentEffect.themeName !== currentTheme) {
    currentEffect.stop();
    currentEffect = null;
  }

  // Start matching effect if available
  if (effects[currentTheme] && !currentEffect) {
    currentEffect = effects[currentTheme];
    currentEffect.start();
  }
}

/**
 * Initialize effect system and watch for theme changes
 */
export function initEffects() {
  // Initial check
  updateActiveEffect();

  // Watch for theme changes via data-theme attribute
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        updateActiveEffect();
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });
}
