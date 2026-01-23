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
  'lilypond',
  'powerpc',
  'retrogame',
  'starwars',
  'synthwave',
  'underworld',
];

/**
 * Apply initial theme immediately (before DOMContentLoaded)
 * This prevents flash of wrong theme on page load
 */
export function applyInitialTheme() {
  // Prevent scroll restoration on refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // Check for theme in URL parameter (for direct linking)
  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme');

  // If valid theme in URL, use it and clear the param
  if (urlTheme && themes.includes(urlTheme)) {
    // Remove the theme param from URL without reload
    urlParams.delete('theme');
    const newUrl = urlParams.toString()
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;
    history.replaceState(null, '', newUrl);

    localStorage.setItem('mynes-last-theme', urlTheme);
    document.documentElement.dataset.theme = urlTheme;
    return urlTheme;
  }

  // Normal theme selection logic
  const shuffleEnabled = localStorage.getItem('mynes-shuffle') !== 'false'; // default true
  const lastTheme = localStorage.getItem('mynes-last-theme');
  let selectedTheme;

  if (shuffleEnabled) {
    // Random theme, excluding the last one
    const availableThemes = lastTheme
      ? themes.filter((t) => t !== lastTheme)
      : themes;
    selectedTheme =
      availableThemes[Math.floor(Math.random() * availableThemes.length)];
  } else {
    // Keep same theme, or pick random if none saved
    selectedTheme =
      lastTheme && themes.includes(lastTheme)
        ? lastTheme
        : themes[Math.floor(Math.random() * themes.length)];
  }

  localStorage.setItem('mynes-last-theme', selectedTheme);
  document.documentElement.dataset.theme = selectedTheme;

  return selectedTheme;
}

/**
 * Initialize theme UI after DOM is ready
 */
export async function initTheme() {
  const themeCssLink = document.getElementById('theme-css');
  const currentTheme = document.documentElement.dataset.theme;
  const shuffleEnabled = localStorage.getItem('mynes-shuffle') !== 'false';

  // Show loader animation on initial page load (if one exists for this theme)
  await showLoader(currentTheme);

  // Update CSS link to match selected theme
  if (themeCssLink && currentTheme) {
    themeCssLink.href = `dist/css/themes/${currentTheme}.css`;
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

  // Show loader animation (if one exists for this theme)
  await showLoader(themeName);

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
 * Scroll the active theme button to center of the container (for mobile)
 */
function scrollActiveButtonIntoView() {
  const container = document.querySelector('.theme-toggles');
  const activeBtn = document.querySelector('.theme-btn.active');

  if (!container || !activeBtn) return;

  // Calculate scroll position to center the button
  const containerRect = container.getBoundingClientRect();
  const buttonRect = activeBtn.getBoundingClientRect();

  const scrollLeft =
    activeBtn.offsetLeft - container.offsetWidth / 2 + buttonRect.width / 2;

  container.scrollTo({
    left: Math.max(0, scrollLeft),
    behavior: 'smooth',
  });
}

// Export for potential external use
export { themes, setTheme };
