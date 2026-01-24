// ═══════════════════════════════════════════════════════════════════════════
// Fireflies Theme Loader — Magical Summer Night
// Glowing fireflies appear and dance in the twilight
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'fireflies';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a single firefly element
 */
function createFirefly(container, index) {
  const firefly = document.createElement('div');
  firefly.className = 'fireflies-fly';

  // Random position
  const x = 15 + Math.random() * 70;
  const y = 20 + Math.random() * 60;
  firefly.style.left = `${x}%`;
  firefly.style.top = `${y}%`;

  // Random animation delay and duration
  const delay = index * 0.15 + Math.random() * 0.3;
  const duration = 2 + Math.random() * 2;
  firefly.style.setProperty('--delay', `${delay}s`);
  firefly.style.setProperty('--duration', `${duration}s`);
  firefly.style.setProperty('--drift-x', `${-20 + Math.random() * 40}px`);
  firefly.style.setProperty('--drift-y', `${-15 + Math.random() * 30}px`);

  container.appendChild(firefly);
  return firefly;
}

/**
 * Animate the fireflies loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--fireflies';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create container
  const container = document.createElement('div');
  container.className = 'fireflies-scene';
  overlay.appendChild(container);

  // Create fireflies container
  const fliesContainer = document.createElement('div');
  fliesContainer.className = 'fireflies-container';
  container.appendChild(fliesContainer);

  // Start in darkness
  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Spawn fireflies gradually
  const fireflies = [];
  const fireflyCount = 15;
  for (let i = 0; i < fireflyCount; i++) {
    if (isCancelled()) {
      restoreScrollbar();
      return;
    }
    const fly = createFirefly(fliesContainer, i);
    fireflies.push(fly);
    await sleep(80);
  }

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Add title text
  const title = document.createElement('div');
  title.className = 'fireflies-title';
  title.textContent = 'summer night';
  container.appendChild(title);

  await sleep(200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  title.classList.add('visible');

  // Let it play
  await sleep(1500);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Fade out
  title.classList.add('fade-out');
  fliesContainer.classList.add('fade-out');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  restoreScrollbar();
}
