// ═══════════════════════════════════════════════════════════════════════════
// Theme Switching Module
// Handles theme selection, shuffle mode, and localStorage persistence
// ═══════════════════════════════════════════════════════════════════════════

import { showLoader } from './loaders/index.js';

const themes = [
  'aero',
  'bubbly',
  'christmas',
  'fireflies',
  'groovy',
  'hacker',
  'halloween',
  'inferno',
  'lilypond',
  'powerpc',
  'retrogame',
  'starwars',
  'synthwave',
];

/**
 * Apply initial theme immediately (before DOMContentLoaded)
 * Note: The inline script in index.html handles theme selection to prevent flash.
 * This function just cleans up the URL param if present.
 */
export function applyInitialTheme() {
  // Prevent scroll restoration on refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // Clear theme param from URL if present (inline script already used it)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('theme')) {
    urlParams.delete('theme');
    const newUrl = urlParams.toString()
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;
    history.replaceState(null, '', newUrl);
  }

  // Return the theme that was already set by inline script
  return document.documentElement.dataset.theme;
}

/**
 * Initialize theme UI after DOM is ready
 */
export async function initTheme() {
  const currentTheme = document.documentElement.dataset.theme;
  const shuffleEnabled = localStorage.getItem('mynes-shuffle') !== 'false';

  // Load theme CSS first so loader has proper styling (wait for CSS to fully load)
  await loadThemeCss(currentTheme);

  // Show loader animation on initial page load (if enabled and one exists for this theme)
  if (introsEnabled()) {
    await showLoader(currentTheme);
  }

  // Sort theme buttons alphabetically by their text content
  const themeToggles = document.querySelector('.theme-toggles');
  if (themeToggles) {
    const buttons = [...themeToggles.querySelectorAll('.theme-btn')];
    buttons.sort((a, b) => a.textContent.localeCompare(b.textContent));
    for (const btn of buttons) {
      themeToggles.appendChild(btn);
    }
  }

  // Set initial active button
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === currentTheme);
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent navigation, handle theme switch via JS
      if (!btn.classList.contains('disabled')) {
        setTheme(btn.dataset.theme);
      }
    });
  });

  // Set initial shuffle button state
  const shuffleBtn = document.getElementById('shuffle-btn');
  if (shuffleBtn) {
    shuffleBtn.classList.toggle('active', shuffleEnabled);
    shuffleBtn.addEventListener('click', toggleShuffle);
  }

  // Set initial intros button state
  const introsOn = localStorage.getItem('mynes-intros') !== 'false'; // default true
  const introsBtn = document.getElementById('intros-btn');
  if (introsBtn) {
    introsBtn.classList.toggle('active', introsOn);
    introsBtn.addEventListener('click', toggleIntros);
  }

  // Scroll active button into view on mobile
  scrollActiveButtonIntoView();
}

/**
 * Load a CSS file and wait for it to be applied
 */
function loadThemeCss(themeName) {
  return new Promise((resolve) => {
    const themeCssLink = document.getElementById('theme-css');
    if (!themeCssLink) {
      resolve();
      return;
    }

    const newHref = `dist/css/themes/${themeName}.css`;

    // If already loaded, resolve immediately
    if (themeCssLink.href.endsWith(newHref)) {
      resolve();
      return;
    }

    // Wait for the stylesheet to load
    const onLoad = () => {
      themeCssLink.removeEventListener('load', onLoad);
      resolve();
    };
    themeCssLink.addEventListener('load', onLoad);

    // Add cache-busting parameter and update href
    themeCssLink.href = `${newHref}?v=${Date.now()}`;
  });
}

/**
 * Switch to a specific theme
 */
async function setTheme(themeName) {
  const themeButtons = document.querySelectorAll('.theme-btn');

  // Disable buttons during transition
  themeButtons.forEach((btn) => {
    btn.classList.add('disabled');
  });

  // Load theme CSS first so loader has proper styling
  await loadThemeCss(themeName);

  // Update data attribute (triggers effect observers)
  document.documentElement.dataset.theme = themeName;

  // Show loader animation (if enabled and one exists for this theme)
  if (introsEnabled()) {
    await showLoader(themeName);
  }

  // Save as last theme
  localStorage.setItem('mynes-last-theme', themeName);

  // Update active button and re-enable
  themeButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === themeName);
    btn.classList.remove('disabled');
  });

  // Scroll active button into view on mobile
  scrollActiveButtonIntoView();
}

/**
 * Toggle shuffle mode on/off
 */
function toggleShuffle() {
  const shuffleBtn = document.getElementById('shuffle-btn');
  if (shuffleBtn) {
    const isActive = shuffleBtn.classList.toggle('active');
    localStorage.setItem('mynes-shuffle', isActive ? 'true' : 'false');
  }
}

/**
 * Toggle intro animations on/off
 */
function toggleIntros() {
  const introsBtn = document.getElementById('intros-btn');
  if (introsBtn) {
    const isActive = introsBtn.classList.toggle('active');
    localStorage.setItem('mynes-intros', isActive ? 'true' : 'false');
  }
}

/**
 * Check if intro animations are enabled
 */
function introsEnabled() {
  return localStorage.getItem('mynes-intros') !== 'false';
}

/**
 * Scroll the active theme button to center of the container (for mobile)
 */
function scrollActiveButtonIntoView() {
  const container = document.querySelector('.theme-toggles');
  const activeBtn = document.querySelector('.theme-btn.active');

  if (!container || !activeBtn) return;

  const buttons = container.querySelectorAll('.theme-btn');
  const firstBtn = buttons[0];
  const lastBtn = buttons[buttons.length - 1];

  if (activeBtn === firstBtn) {
    // First button - ensure fully visible on left
    activeBtn.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  } else if (activeBtn === lastBtn) {
    // Last button - ensure fully visible on right
    activeBtn.scrollIntoView({
      behavior: 'smooth',
      inline: 'end',
      block: 'nearest',
    });
  } else {
    // Middle buttons - center the button
    activeBtn.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }
}

// Export for potential external use
export { themes, setTheme };
