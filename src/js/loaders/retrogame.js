// ═══════════════════════════════════════════════════════════════════════════
// Retrogame Theme Loader — CRT Monitor Effect
// Flicker, scan lines, and retro loading text
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'retrogame';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animate the retrogame loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--retrogame';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create CRT screen container
  const crt = document.createElement('div');
  crt.className = 'retro-crt';
  overlay.appendChild(crt);

  // Create scan lines overlay
  const scanlines = document.createElement('div');
  scanlines.className = 'retro-scanlines';
  crt.appendChild(scanlines);

  // Create flicker effect
  const flicker = document.createElement('div');
  flicker.className = 'retro-flicker';
  crt.appendChild(flicker);

  // CRT turn-on flicker sequence
  overlay.classList.add('retro-powering-on');
  await sleep(150);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  overlay.classList.remove('retro-powering-on');
  await sleep(100);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  overlay.classList.add('retro-powering-on');
  await sleep(200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Screen is now on
  overlay.classList.remove('retro-powering-on');
  overlay.classList.add('retro-on');

  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Create loading text
  const textContainer = document.createElement('div');
  textContainer.className = 'retro-text-container';

  const loadingText = document.createElement('div');
  loadingText.className = 'retro-loading-text';
  loadingText.textContent = 'LOADING';

  const dots = document.createElement('span');
  dots.className = 'retro-dots';

  textContainer.appendChild(loadingText);
  textContainer.appendChild(dots);
  crt.appendChild(textContainer);

  // Animate dots
  for (let i = 0; i < 3; i++) {
    if (isCancelled()) {
      restoreScrollbar();
      return;
    }
    dots.textContent += '.';
    await sleep(400);
  }

  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Show READY
  loadingText.textContent = 'READY';
  dots.textContent = '';
  loadingText.classList.add('retro-ready');

  await sleep(500);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // CRT turn-off effect
  overlay.classList.add('retro-powering-off');
  await sleep(300);

  restoreScrollbar();
}
