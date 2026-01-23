// ═══════════════════════════════════════════════════════════════════════════
// Star Wars Theme Loader — Opening Crawl Effect
// Classic perspective text scroll using actual page content
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'starwars';

const introText = 'A long time ago in a galaxy far, far away....';

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

  // Hide header and footer from the start
  const header = document.querySelector('.site-header');
  const footer = document.querySelector('.site-footer');
  if (header) {
    header.style.opacity = '0';
    header.style.visibility = 'hidden';
  }
  if (footer) {
    footer.style.opacity = '0';
    footer.style.visibility = 'hidden';
  }

  // Helper to restore header/footer on cancel
  const restoreHeaderFooter = () => {
    if (header) {
      header.style.opacity = '';
      header.style.visibility = '';
    }
    if (footer) {
      footer.style.opacity = '';
      footer.style.visibility = '';
    }
  };

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
  if (isCancelled()) {
    restoreHeaderFooter();
    return;
  }
  intro.classList.add('visible');
  await sleep(2500);
  if (isCancelled()) {
    restoreHeaderFooter();
    return;
  }
  intro.classList.add('fade-out');
  await sleep(500);
  if (isCancelled()) {
    restoreHeaderFooter();
    return;
  }

  // Remove intro text
  intro.remove();

  // Now apply crawl effect to actual page content
  const main = document.querySelector('main');

  if (main) {
    // Add crawl class to main content
    main.classList.add('starwars-page-crawl');

    // Make overlay semi-transparent to show content behind
    overlay.classList.add('starwars-crawl-active');

    // Wait for crawl animation
    await sleep(4000);
    if (isCancelled()) {
      // Cleanup on cancel
      main.classList.remove('starwars-page-crawl');
      document.body.classList.remove('starwars-intro-complete');
      restoreHeaderFooter();
      return;
    }

    // Mark intro as complete to skip entry animations
    document.body.classList.add('starwars-intro-complete');

    // Remove crawl class - content is now in normal position
    main.classList.remove('starwars-page-crawl');

    // Fade out overlay to reveal content smoothly
    overlay.classList.add('starwars-fade-out');

    // Show header and footer with fade
    if (header) {
      header.style.transition = 'opacity 0.8s ease-out';
      header.style.opacity = '';
      header.style.visibility = '';
    }
    if (footer) {
      footer.style.transition = 'opacity 0.8s ease-out';
      footer.style.opacity = '';
      footer.style.visibility = '';
    }

    await sleep(800);
    if (isCancelled()) return;

    // Cleanup
    if (header) {
      header.style.transition = '';
    }
    if (footer) {
      footer.style.transition = '';
    }
  }
}
