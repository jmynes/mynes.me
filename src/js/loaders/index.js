// ═══════════════════════════════════════════════════════════════════════════
// Theme Loader System
// Manages themed loading overlays during theme transitions
// ═══════════════════════════════════════════════════════════════════════════

import * as aeroLoader from './aero.js';
import * as bubblyLoader from './bubbly.js';
import * as christmasLoader from './christmas.js';
import * as firefliesLoader from './fireflies.js';
import * as groovyLoader from './groovy.js';
import * as hackerLoader from './hacker.js';
import * as halloweenLoader from './halloween.js';
import * as infernoLoader from './inferno.js';
import * as pondLoader from './pond.js';
import * as powerpcLoader from './powerpc.js';
import * as retrogameLoader from './retrogame.js';
import * as starwarsLoader from './starwars.js';
import * as synthwaveLoader from './synthwave.js';

// Registry of loaders by theme name
const loaders = {
  aero: aeroLoader,
  bubbly: bubblyLoader,
  christmas: christmasLoader,
  fireflies: firefliesLoader,
  groovy: groovyLoader,
  hacker: hackerLoader,
  halloween: halloweenLoader,
  inferno: infernoLoader,
  pond: pondLoader,
  powerpc: powerpcLoader,
  retrogame: retrogameLoader,
  starwars: starwarsLoader,
  synthwave: synthwaveLoader,
};

// State management
let currentAnimation = null;
let overlayElement = null;

/**
 * Create the loader overlay element (reused across all themes)
 */
function createOverlay() {
  if (overlayElement) return overlayElement;

  overlayElement = document.createElement('div');
  overlayElement.className = 'theme-loader';
  overlayElement.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlayElement);

  return overlayElement;
}

/**
 * Remove the overlay element
 */
function removeOverlay() {
  if (overlayElement?.parentNode) {
    overlayElement.parentNode.removeChild(overlayElement);
  }
  overlayElement = null;
}

/**
 * Cancel any running animation
 */
function cancelCurrentAnimation() {
  if (currentAnimation) {
    currentAnimation.cancel();
    currentAnimation = null;
  }
}

/**
 * Fade out an element
 */
function fadeOut(element, duration) {
  return new Promise((resolve) => {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.visibility = 'hidden';
      resolve();
    }, duration);
  });
}

/**
 * Re-trigger entry animations on page elements
 * This makes elements animate in after the loader finishes
 */
function replayEntryAnimations() {
  const elements = document.querySelectorAll(
    '.site-header, .intro, .project, .theme-bg, .theme-effects, .theme-overlay',
  );

  // First, hide all elements and remove animations
  elements.forEach((el) => {
    const animation = getComputedStyle(el).animation;
    if (animation && animation !== 'none') {
      el.style.animation = 'none';
      el.style.opacity = '0';
    }
  });

  // Force reflow
  document.body.offsetHeight;

  // Then restore animations (elements will animate from their start state)
  elements.forEach((el) => {
    el.style.animation = '';
    el.style.opacity = '';
  });
}

/**
 * Show loader for a theme transition
 * Returns a Promise that resolves when the loader finishes
 */
export async function showLoader(themeName) {
  // Cancel any existing animation
  cancelCurrentAnimation();

  const loader = loaders[themeName];

  // If no loader for this theme, resolve immediately
  if (!loader) {
    return Promise.resolve();
  }

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  if (prefersReducedMotion) {
    return Promise.resolve();
  }

  const overlay = createOverlay();

  // Create cancellation token
  let isCancelled = false;
  const cancel = () => {
    isCancelled = true;
    removeOverlay();
  };

  currentAnimation = { cancel };

  // Show overlay
  overlay.style.opacity = '1';
  overlay.style.visibility = 'visible';

  try {
    // Run the theme-specific loader animation
    await loader.animate(overlay, () => isCancelled);

    if (!isCancelled) {
      // Re-trigger entry animations so they play after the loader
      // Skip for Star Wars (handles own post-intro state) and Inferno (burn already revealed content)
      if (themeName !== 'starwars' && themeName !== 'inferno') {
        replayEntryAnimations();
      }

      // Fade out overlay (skip for inferno - burn already made it transparent)
      if (themeName === 'inferno') {
        removeOverlay();
      } else {
        await fadeOut(overlay, 300);
        removeOverlay();
      }
    }
  } catch {
    if (!isCancelled) {
      removeOverlay();
    }
  }

  currentAnimation = null;
}
