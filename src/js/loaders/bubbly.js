// ═══════════════════════════════════════════════════════════════════════════
// Bubbly Theme Loader — Playful Bubble Rise
// Colorful bubbles float up, shimmer, and pop with 2007 glossy optimism
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'bubbly';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animate the bubbly loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--bubbly';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create container
  const container = document.createElement('div');
  container.className = 'bubbly-scene';
  overlay.appendChild(container);

  // Create bubbles container
  const bubblesContainer = document.createElement('div');
  bubblesContainer.className = 'bubbly-bubbles';
  container.appendChild(bubblesContainer);

  // Create multiple bubbles with varying sizes and positions
  const bubbleConfigs = [
    { size: 80, left: 15, delay: 0, hue: 190 },
    { size: 120, left: 35, delay: 0.15, hue: 160 },
    { size: 60, left: 55, delay: 0.3, hue: 200 },
    { size: 100, left: 75, delay: 0.1, hue: 140 },
    { size: 50, left: 25, delay: 0.4, hue: 180 },
    { size: 90, left: 65, delay: 0.25, hue: 170 },
    { size: 70, left: 45, delay: 0.35, hue: 150 },
    { size: 40, left: 85, delay: 0.5, hue: 195 },
  ];

  bubbleConfigs.forEach((config, i) => {
    const bubble = document.createElement('div');
    bubble.className = `bubbly-bubble bubbly-bubble--${i + 1}`;
    bubble.style.width = `${config.size}px`;
    bubble.style.height = `${config.size}px`;
    bubble.style.left = `${config.left}%`;
    bubble.style.animationDelay = `${config.delay}s`;
    bubble.style.setProperty('--bubble-hue', config.hue);

    // Inner shine
    const shine = document.createElement('div');
    shine.className = 'bubbly-bubble-shine';
    bubble.appendChild(shine);

    bubblesContainer.appendChild(bubble);
  });

  // Create sparkles
  const sparkles = document.createElement('div');
  sparkles.className = 'bubbly-sparkles';
  container.appendChild(sparkles);

  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'bubbly-sparkle';
    sparkle.style.left = `${5 + Math.random() * 90}%`;
    sparkle.style.top = `${10 + Math.random() * 80}%`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    sparkles.appendChild(sparkle);
  }

  // Create title
  const title = document.createElement('div');
  title.className = 'bubbly-title';
  title.textContent = 'POP!';
  container.appendChild(title);

  // Start animation
  await sleep(100);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Bubbles start rising
  bubblesContainer.classList.add('rising');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Sparkles appear
  sparkles.classList.add('active');

  await sleep(500);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Title pops in
  title.classList.add('visible');

  // Let it play
  await sleep(1000);
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
