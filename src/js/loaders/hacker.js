// ═══════════════════════════════════════════════════════════════════════════
// Hacker Theme Loader — Typewriter Terminal Effect
// Types out text character by character with blinking cursor
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'hacker';

const messages = [
  'INITIALIZING SYSTEM...',
  'ACCESSING MAINFRAME...',
  'LOADING INTERFACE...',
  'DECRYPTING DATA...',
  'BYPASSING SECURITY...',
];

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Type text character by character
 */
async function typeText(element, text, delay, isCancelled) {
  for (let i = 0; i < text.length; i++) {
    if (isCancelled()) return;
    element.textContent += text[i];
    await sleep(delay + Math.random() * 30); // Slight randomness for realism
  }
}

/**
 * Animate the hacker loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay using safe DOM method
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--hacker';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  // Create terminal container
  const terminal = document.createElement('div');
  terminal.className = 'hacker-terminal';

  // Create text line with cursor
  const textLine = document.createElement('div');
  textLine.className = 'hacker-terminal__line';

  const prompt = document.createElement('span');
  prompt.className = 'hacker-terminal__prompt';
  prompt.textContent = '> ';

  const text = document.createElement('span');
  text.className = 'hacker-terminal__text';

  const cursor = document.createElement('span');
  cursor.className = 'hacker-terminal__cursor';
  cursor.textContent = '_';

  textLine.appendChild(prompt);
  textLine.appendChild(text);
  textLine.appendChild(cursor);
  terminal.appendChild(textLine);
  overlay.appendChild(terminal);

  // Pick random message
  const message = messages[Math.floor(Math.random() * messages.length)];

  // Helper to restore scrollbar on cancel
  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Type out the message
  await typeText(text, message, 40, isCancelled);

  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Hold for a moment
  await sleep(400);

  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Clear and show "READY"
  text.textContent = '';
  await typeText(text, 'READY', 60, isCancelled);

  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Brief pause before fade out
  await sleep(300);

  // Restore scrollbar
  restoreScrollbar();
}
