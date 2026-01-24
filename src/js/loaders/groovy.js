// ═══════════════════════════════════════════════════════════════════════════
// Groovy Theme Loader — Lava Lamp Effect
// Morphing blobs that float and merge like a lava lamp
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'groovy';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animate the groovy loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--groovy';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create lava lamp container
  const lavaLamp = document.createElement('div');
  lavaLamp.className = 'groovy-lavalamp';
  overlay.appendChild(lavaLamp);

  // Create multiple blobs with staggered animations
  const blobCount = 6;
  const colors = [
    '#ff6b6b',
    '#ffd93d',
    '#6bcb77',
    '#4d96ff',
    '#ff6bd6',
    '#ffa94d',
  ];

  for (let i = 0; i < blobCount; i++) {
    const blob = document.createElement('div');
    blob.className = 'groovy-blob';
    blob.style.setProperty('--blob-color', colors[i % colors.length]);
    blob.style.setProperty('--blob-delay', `${i * 0.3}s`);
    blob.style.setProperty('--blob-x', `${20 + Math.random() * 60}%`);
    blob.style.setProperty('--blob-size', `${80 + Math.random() * 60}px`);
    lavaLamp.appendChild(blob);
  }

  // Wait for blobs to animate
  await sleep(800);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Add the groovy text
  const text = document.createElement('div');
  text.className = 'groovy-text';
  text.textContent = 'GROOVY';
  overlay.appendChild(text);

  // Wait for text to appear
  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  text.classList.add('visible');

  // Let it all play out
  await sleep(1500);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Fade out
  overlay.classList.add('groovy-fade-out');
  await sleep(600);

  restoreScrollbar();
}
