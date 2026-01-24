// ═══════════════════════════════════════════════════════════════════════════
// Aero Theme Loader — Windows Vista Boot Screen Effect
// Orbiting glowing pearls with aurora gradient
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'aero';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animate the aero loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--aero';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create container for the pearls animation
  const container = document.createElement('div');
  container.className = 'aero-boot';
  overlay.appendChild(container);

  // Create the orbiting pearls container
  const pearlsContainer = document.createElement('div');
  pearlsContainer.className = 'aero-pearls';
  container.appendChild(pearlsContainer);

  // Create 5 orbiting pearls (like Vista boot animation)
  const pearlCount = 5;
  for (let i = 0; i < pearlCount; i++) {
    const pearl = document.createElement('div');
    pearl.className = 'aero-pearl';
    pearl.style.setProperty('--pearl-index', i);
    pearl.style.setProperty('--pearl-delay', `${i * 0.15}s`);
    pearlsContainer.appendChild(pearl);
  }

  // Wait for pearls to start orbiting
  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Add the "Starting..." text
  const text = document.createElement('div');
  text.className = 'aero-text';
  text.textContent = 'Starting...';
  container.appendChild(text);

  // Wait for text to fade in
  await sleep(200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  text.classList.add('visible');

  // Create subtle aurora glow effect
  const glow = document.createElement('div');
  glow.className = 'aero-glow';
  container.appendChild(glow);

  // Let the animation play
  await sleep(2000);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Fade out text first
  text.classList.remove('visible');
  text.classList.add('fade-out');

  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Pearls scatter outward
  pearlsContainer.classList.add('scatter');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Loader index.js handles the fade out
  restoreScrollbar();
}
