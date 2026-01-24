// ═══════════════════════════════════════════════════════════════════════════
// Christmas Theme Loader — Snowfall with Festive Greeting
// Gentle snowfall gathers before revealing a holiday message
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'christmas';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animate the christmas loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--christmas';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create container
  const container = document.createElement('div');
  container.className = 'christmas-scene';
  overlay.appendChild(container);

  // Create snowflakes container
  const snowContainer = document.createElement('div');
  snowContainer.className = 'christmas-snow';
  container.appendChild(snowContainer);

  // Generate snowflakes
  const snowflakeCount = 50;
  for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'christmas-snowflake';
    snowflake.style.setProperty('--x', `${Math.random() * 100}%`);
    snowflake.style.setProperty('--delay', `${Math.random() * 2}s`);
    snowflake.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
    snowflake.style.setProperty('--size', `${4 + Math.random() * 8}px`);
    snowflake.style.setProperty('--drift', `${-20 + Math.random() * 40}px`);
    snowContainer.appendChild(snowflake);
  }

  // Create ornament
  const ornament = document.createElement('div');
  ornament.className = 'christmas-ornament';
  container.appendChild(ornament);

  // Ornament shine
  const shine = document.createElement('div');
  shine.className = 'christmas-ornament-shine';
  ornament.appendChild(shine);

  // Wait for snow to start falling
  await sleep(500);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Ornament appears
  ornament.classList.add('visible');

  await sleep(800);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Add greeting text
  const greeting = document.createElement('div');
  greeting.className = 'christmas-greeting';
  greeting.textContent = 'Happy Holidays';
  container.appendChild(greeting);

  await sleep(200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  greeting.classList.add('visible');

  // Let it play
  await sleep(1500);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Fade out
  greeting.classList.add('fade-out');
  ornament.classList.add('fade-out');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  restoreScrollbar();
}
