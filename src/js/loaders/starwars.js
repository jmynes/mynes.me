// ═══════════════════════════════════════════════════════════════════════════
// Star Wars Theme Loader — Opening Crawl Effect
// Classic perspective text scroll with starfield background
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'starwars';

const introText = 'A long time ago in a galaxy far, far away....';

const crawlTitle = 'EPISODE VIBES';
const crawlSubtitle = 'THE THEME AWAKENS';
const crawlBody = `The galaxy is in turmoil. A brave
developer has discovered the
legendary STAR WARS theme.

As the dark void of space gives
way to vibrant colors and
iconic styling, a new hope
emerges for portfolio design.

The Force is strong with this
theme selection....`;

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animate the Star Wars loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--starwars';

  // Create starfield
  const starfield = document.createElement('div');
  starfield.className = 'starwars-starfield';
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'starwars-star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starfield.appendChild(star);
  }
  overlay.appendChild(starfield);

  // Create intro text ("A long time ago...")
  const intro = document.createElement('div');
  intro.className = 'starwars-intro';
  intro.textContent = introText;
  overlay.appendChild(intro);

  // Wait for intro to fade in and out
  await sleep(500);
  if (isCancelled()) return;
  intro.classList.add('visible');
  await sleep(2500);
  if (isCancelled()) return;
  intro.classList.add('fade-out');
  await sleep(500);
  if (isCancelled()) return;

  // Remove intro
  intro.remove();

  // Create crawl container
  const crawlContainer = document.createElement('div');
  crawlContainer.className = 'starwars-crawl-container';

  const crawl = document.createElement('div');
  crawl.className = 'starwars-crawl';

  const title = document.createElement('h1');
  title.className = 'starwars-crawl__title';
  title.textContent = crawlTitle;

  const subtitle = document.createElement('h2');
  subtitle.className = 'starwars-crawl__subtitle';
  subtitle.textContent = crawlSubtitle;

  const body = document.createElement('p');
  body.className = 'starwars-crawl__body';
  body.textContent = crawlBody;

  crawl.appendChild(title);
  crawl.appendChild(subtitle);
  crawl.appendChild(body);
  crawlContainer.appendChild(crawl);
  overlay.appendChild(crawlContainer);

  // Let the crawl animate
  await sleep(4000);
  if (isCancelled()) return;
}
