// ═══════════════════════════════════════════════════════════════════════════
// Theme Switching Module
// Handles theme selection, shuffle mode, and localStorage persistence
// ═══════════════════════════════════════════════════════════════════════════

const themes = [
  'aero', 'bubbly', 'christmas', 'fireflies', 'groovy',
  'hacker', 'halloween', 'lilypond', 'powerpc', 'retrogame',
  'starwars', 'synthwave', 'underworld'
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

  // Theme selection logic
  const shuffleEnabled = localStorage.getItem('mynes-shuffle') !== 'false'; // default true
  const lastTheme = localStorage.getItem('mynes-last-theme');
  let selectedTheme;

  if (shuffleEnabled) {
    // Random theme, excluding the last one
    const availableThemes = lastTheme ? themes.filter(t => t !== lastTheme) : themes;
    selectedTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
  } else {
    // Keep same theme, or pick random if none saved
    selectedTheme = lastTheme && themes.includes(lastTheme)
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
export function initTheme() {
  const themeCssLink = document.getElementById('theme-css');
  const currentTheme = document.documentElement.dataset.theme;
  const shuffleEnabled = localStorage.getItem('mynes-shuffle') !== 'false';

  // Update CSS link to match selected theme
  if (themeCssLink && currentTheme) {
    themeCssLink.href = `dist/css/themes/${currentTheme}.css`;
  }

  // Set initial active button
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === currentTheme);
    btn.addEventListener('click', () => {
      if (!btn.disabled) {
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
}

/**
 * Switch to a specific theme
 */
function setTheme(themeName) {
  const themeCssLink = document.getElementById('theme-css');
  const themeButtons = document.querySelectorAll('.theme-btn');

  // Update CSS link
  if (themeCssLink) {
    themeCssLink.href = `dist/css/themes/${themeName}.css`;
  }

  // Update data attribute (triggers effect observers)
  document.documentElement.dataset.theme = themeName;

  // Save as last theme
  localStorage.setItem('mynes-last-theme', themeName);

  // Update active button
  themeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === themeName);
  });
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

// Export for potential external use
export { themes, setTheme };
