// ═══════════════════════════════════════════════════════════════════════════
// Halloween Theme Loader — Spooky Jack-o-Lantern Reveal
// Flickering candlelight reveals a glowing pumpkin face
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'halloween';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animate the halloween loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--halloween';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create container
  const container = document.createElement('div');
  container.className = 'halloween-scene';
  overlay.appendChild(container);

  // Create flickering darkness overlay
  const darkness = document.createElement('div');
  darkness.className = 'halloween-darkness';
  container.appendChild(darkness);

  // Create the jack-o-lantern
  const pumpkin = document.createElement('div');
  pumpkin.className = 'halloween-pumpkin';
  container.appendChild(pumpkin);

  // Create the face (eyes, nose, mouth) using CSS
  const face = document.createElement('div');
  face.className = 'halloween-face';
  pumpkin.appendChild(face);

  // Left eye
  const leftEye = document.createElement('div');
  leftEye.className = 'halloween-eye halloween-eye--left';
  face.appendChild(leftEye);

  // Right eye
  const rightEye = document.createElement('div');
  rightEye.className = 'halloween-eye halloween-eye--right';
  face.appendChild(rightEye);

  // Nose
  const nose = document.createElement('div');
  nose.className = 'halloween-nose';
  face.appendChild(nose);

  // Mouth
  const mouth = document.createElement('div');
  mouth.className = 'halloween-mouth';
  face.appendChild(mouth);

  // Start with darkness
  await sleep(200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // First flicker - brief glimpse
  darkness.classList.add('flicker-1');
  await sleep(100);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  darkness.classList.remove('flicker-1');
  await sleep(250);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Second flicker - slightly longer
  darkness.classList.add('flicker-2');
  await sleep(150);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  darkness.classList.remove('flicker-2');
  await sleep(200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Fade out darkness and light up pumpkin
  darkness.classList.add('fade-out');
  pumpkin.classList.add('lit');

  await sleep(200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Face elements glow
  face.classList.add('glowing');

  // Add "BOO!" text
  const boo = document.createElement('div');
  boo.className = 'halloween-boo';
  boo.textContent = 'BOO!';
  container.appendChild(boo);

  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  boo.classList.add('visible');

  // Let it play
  await sleep(1200);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Fade out
  boo.classList.add('fade-out');
  pumpkin.classList.add('fade-out');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  restoreScrollbar();
}
