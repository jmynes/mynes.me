// ═══════════════════════════════════════════════════════════════════════════
// PowerPC Theme Loader — Classic Mac Boot Sequence
// Happy Mac icon appears, progress bar fills, nostalgic startup experience
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'powerpc';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animate the powerpc loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--powerpc';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create container
  const container = document.createElement('div');
  container.className = 'powerpc-scene';
  overlay.appendChild(container);

  // Create Happy Mac icon (pixel art style)
  const happyMac = document.createElement('div');
  happyMac.className = 'powerpc-happy-mac';
  container.appendChild(happyMac);

  // Mac screen (face area)
  const screen = document.createElement('div');
  screen.className = 'powerpc-mac-screen';
  happyMac.appendChild(screen);

  // Happy face on screen
  const face = document.createElement('div');
  face.className = 'powerpc-mac-face';
  screen.appendChild(face);

  // Progress bar container
  const progressContainer = document.createElement('div');
  progressContainer.className = 'powerpc-progress-container';
  container.appendChild(progressContainer);

  // Progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'powerpc-progress-bar';
  progressContainer.appendChild(progressBar);

  // Welcome text
  const welcome = document.createElement('div');
  welcome.className = 'powerpc-welcome';
  welcome.textContent = 'Welcome to Mac OS';
  container.appendChild(welcome);

  // Start with black screen
  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Happy Mac appears
  happyMac.classList.add('visible');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Progress bar appears
  progressContainer.classList.add('visible');

  // Animate progress bar in steps (classic Mac style)
  const steps = [20, 45, 60, 75, 90, 100];
  for (const step of steps) {
    if (isCancelled()) {
      restoreScrollbar();
      return;
    }
    progressBar.style.width = `${step}%`;
    await sleep(180);
  }

  await sleep(200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Welcome text appears
  welcome.classList.add('visible');

  // Classic Mac startup chime effect (visual pulse)
  happyMac.classList.add('chime');

  await sleep(800);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Fade out
  container.classList.add('fade-out');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  restoreScrollbar();
}
