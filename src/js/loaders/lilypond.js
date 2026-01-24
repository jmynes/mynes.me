// ═══════════════════════════════════════════════════════════════════════════
// Lilypond Theme Loader — Monet's Garden at Giverny
// Water ripples, lily pads, and wisteria petals
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'lilypond';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a wisteria petal
 */
function createPetal(container, index) {
  const petal = document.createElement('div');
  petal.className = 'lilypond-petal';

  // Random horizontal position
  const x = Math.random() * 100;
  petal.style.left = `${x}%`;
  petal.style.setProperty('--delay', `${index * 0.2}s`);
  petal.style.setProperty('--duration', `${3 + Math.random() * 2}s`);
  petal.style.setProperty('--drift', `${-30 + Math.random() * 60}px`);
  petal.style.setProperty('--rotation', `${Math.random() * 360}deg`);

  container.appendChild(petal);
  return petal;
}

/**
 * Animate the lilypond loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--lilypond';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create container
  const container = document.createElement('div');
  container.className = 'lilypond-scene';
  overlay.appendChild(container);

  // Create water ripple effect
  const ripples = document.createElement('div');
  ripples.className = 'lilypond-ripples';
  container.appendChild(ripples);

  // Create 3 expanding ripples
  for (let i = 0; i < 3; i++) {
    const ripple = document.createElement('div');
    ripple.className = 'lilypond-ripple';
    ripple.style.setProperty('--delay', `${i * 0.4}s`);
    ripples.appendChild(ripple);
  }

  // Create lily pad
  const lilypad = document.createElement('div');
  lilypad.className = 'lilypond-lilypad';
  container.appendChild(lilypad);

  // Create petal container
  const petals = document.createElement('div');
  petals.className = 'lilypond-petals';
  container.appendChild(petals);

  // Start animation
  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Ripples start
  ripples.classList.add('active');

  await sleep(500);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Lily pad appears
  lilypad.classList.add('visible');

  // Spawn wisteria petals
  for (let i = 0; i < 8; i++) {
    if (isCancelled()) {
      restoreScrollbar();
      return;
    }
    createPetal(petals, i);
    await sleep(100);
  }

  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Add title
  const title = document.createElement('div');
  title.className = 'lilypond-title';
  title.textContent = 'Giverny';
  container.appendChild(title);

  await sleep(200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  title.classList.add('visible');

  // Let it play
  await sleep(1400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Fade out
  title.classList.add('fade-out');
  lilypad.classList.add('fade-out');
  petals.classList.add('fade-out');
  ripples.classList.add('fade-out');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  restoreScrollbar();
}
