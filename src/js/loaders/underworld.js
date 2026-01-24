// ═══════════════════════════════════════════════════════════════════════════
// Underworld Theme Loader — Hellish Ascent
// Flames rise from below, lava cracks glow, infernal energy builds
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'underworld';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animate the underworld loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--underworld';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create container
  const container = document.createElement('div');
  container.className = 'underworld-scene';
  overlay.appendChild(container);

  // Create embers
  const embers = document.createElement('div');
  embers.className = 'underworld-embers';
  container.appendChild(embers);

  for (let i = 0; i < 12; i++) {
    const ember = document.createElement('div');
    ember.className = 'underworld-ember';
    ember.style.left = `${10 + Math.random() * 80}%`;
    ember.style.animationDelay = `${Math.random() * 1.5}s`;
    ember.style.animationDuration = `${1 + Math.random() * 1}s`;
    embers.appendChild(ember);
  }

  // Create title text
  const title = document.createElement('div');
  title.className = 'underworld-title';
  title.textContent = 'DESCEND';
  container.appendChild(title);

  // Start dark
  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Embers float up
  embers.classList.add('active');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Title appears
  title.classList.add('visible');

  // Let it play
  await sleep(1200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Fade everything out
  container.classList.add('fade-out');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  restoreScrollbar();
}
