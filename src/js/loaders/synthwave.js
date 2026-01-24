// ═══════════════════════════════════════════════════════════════════════════
// Synthwave Theme Loader — Retro Neon Sun Rise
// Neon sun rises from horizon with scan lines
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'synthwave';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animate the synthwave loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--synthwave';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create the scene container
  const scene = document.createElement('div');
  scene.className = 'synthwave-scene';
  overlay.appendChild(scene);

  // Create horizon line
  const horizon = document.createElement('div');
  horizon.className = 'synthwave-horizon';
  scene.appendChild(horizon);

  // Create the neon sun
  const sun = document.createElement('div');
  sun.className = 'synthwave-sun';
  scene.appendChild(sun);

  // Create sun stripes (the iconic striped sun)
  for (let i = 0; i < 6; i++) {
    const stripe = document.createElement('div');
    stripe.className = 'synthwave-sun-stripe';
    stripe.style.setProperty('--stripe-index', i);
    sun.appendChild(stripe);
  }

  // Create perspective grid
  const grid = document.createElement('div');
  grid.className = 'synthwave-grid';
  scene.appendChild(grid);

  // Create scan lines overlay
  const scanlines = document.createElement('div');
  scanlines.className = 'synthwave-scanlines';
  overlay.appendChild(scanlines);

  // Wait for elements to be ready
  await sleep(100);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Trigger sun rise animation
  sun.classList.add('rising');

  await sleep(600);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Horizon glows
  horizon.classList.add('glowing');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Grid appears
  grid.classList.add('visible');

  // Add title text
  const title = document.createElement('div');
  title.className = 'synthwave-title';
  title.textContent = 'SYNTHWAVE';
  scene.appendChild(title);

  await sleep(200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  title.classList.add('visible');

  // Let it play out
  await sleep(1200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Fade out title
  title.classList.add('fade-out');

  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  restoreScrollbar();
}
