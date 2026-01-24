// ═══════════════════════════════════════════════════════════════════════════
// Christmas Theme — String Lights on Project Cards + tsParticles Snow
// Colorful twinkling lights along the top of each card, plus falling snow
// ═══════════════════════════════════════════════════════════════════════════

let isActive = false;
let resizeTimeout;
let snowContainer = null;
let tsParticlesInstance = null;

const TSPARTICLES_CDN =
  'https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js';

/**
 * Load tsParticles from CDN
 */
function loadTsParticles() {
  return new Promise((resolve, reject) => {
    if (window.tsParticles) {
      resolve(window.tsParticles);
      return;
    }

    const script = document.createElement('script');
    script.src = TSPARTICLES_CDN;
    script.onload = () => resolve(window.tsParticles);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Start the snow effect using tsParticles
 */
async function startSnow() {
  // Create container for snow
  snowContainer = document.createElement('div');
  snowContainer.id = 'christmas-snow';
  snowContainer.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 5;
    pointer-events: none;
  `;
  document.body.appendChild(snowContainer);

  // Hide CSS particles (this theme uses tsparticles instead)
  const effectsContainer = document.querySelector('.theme-effects');
  if (effectsContainer) {
    const cssParticles = effectsContainer.querySelectorAll('.particle');
    for (const p of cssParticles) {
      p.style.display = 'none';
    }
  }

  try {
    const tsParticles = await loadTsParticles();
    tsParticlesInstance = await tsParticles.load('christmas-snow', {
      background: {
        color: 'transparent',
      },
      particles: {
        color: {
          value: '#ffffff',
        },
        number: {
          value: 50,
          density: {
            enable: true,
            area: 800,
          },
        },
        opacity: {
          value: { min: 0.2, max: 0.6 },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 8 },
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'bottom',
          random: false,
          straight: false,
          outModes: {
            default: 'out',
          },
        },
        wobble: {
          enable: true,
          distance: 5,
          speed: 3,
        },
      },
    });
  } catch (err) {
    console.warn('Failed to load tsParticles for snow:', err);
  }
}

/**
 * Stop the snow effect
 */
function stopSnow() {
  if (tsParticlesInstance) {
    tsParticlesInstance.destroy();
    tsParticlesInstance = null;
  }

  if (snowContainer) {
    snowContainer.remove();
    snowContainer = null;
  }

  // Restore CSS particles
  const effectsContainer = document.querySelector('.theme-effects');
  if (effectsContainer) {
    const cssParticles = effectsContainer.querySelectorAll('.particle');
    for (const p of cssParticles) {
      p.style.display = '';
    }
  }
}

const lightColors = [
  { bg: '#ff4444', glow: 'rgba(255, 68, 68, 0.8)' }, // Red
  { bg: '#44dd44', glow: 'rgba(68, 221, 68, 0.8)' }, // Green
  { bg: '#ffdd00', glow: 'rgba(255, 221, 0, 0.9)' }, // Gold
  { bg: '#44aaff', glow: 'rgba(68, 170, 255, 0.8)' }, // Blue
];

function createLightsForCard(card) {
  // Remove existing lights if any
  const existing = card.querySelector('.christmas-lights');
  if (existing) existing.remove();

  // Create lights container
  const lightsContainer = document.createElement('div');
  lightsContainer.className = 'christmas-lights';
  lightsContainer.style.cssText = `
    position: absolute;
    top: -10px;
    left: 10px;
    right: 10px;
    height: 20px;
    z-index: 20;
    pointer-events: none;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `;

  // Create wire
  const wire = document.createElement('div');
  wire.style.cssText = `
    position: absolute;
    top: 4px;
    left: 0;
    right: 0;
    height: 2px;
    background: #222;
    border-radius: 1px;
    z-index: 1;
  `;
  lightsContainer.appendChild(wire);

  // Calculate number of lights based on card width
  const cardWidth = card.offsetWidth || 300;
  const numLights = Math.max(6, Math.floor(cardWidth / 40));

  // Create individual lights
  for (let i = 0; i < numLights; i++) {
    const light = document.createElement('div');
    const color = lightColors[i % lightColors.length];
    const delay = (i * 0.3) % 1.2; // Stagger animations

    light.style.cssText = `
      width: 8px;
      height: 10px;
      background: ${color.bg};
      border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
      position: relative;
      z-index: 2;
      margin-top: 2px;
      box-shadow: 0 0 6px 2px ${color.glow}, inset 0 -2px 4px rgba(0,0,0,0.3);
      animation: christmasBulbGlow 1.5s ease-in-out infinite;
      animation-delay: ${delay}s;
    `;

    // Add socket
    const socket = document.createElement('div');
    socket.style.cssText = `
      position: absolute;
      top: -3px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: #333;
      border-radius: 1px 1px 0 0;
    `;
    light.appendChild(socket);

    lightsContainer.appendChild(light);
  }

  card.appendChild(lightsContainer);
}

function addLights() {
  // Add CSS animation if not already present
  if (!document.getElementById('christmas-lights-style')) {
    const style = document.createElement('style');
    style.id = 'christmas-lights-style';
    style.textContent = `
      @keyframes christmasBulbGlow {
        0%, 100% {
          filter: brightness(1);
          transform: scale(1);
        }
        50% {
          filter: brightness(1.4);
          transform: scale(1.1);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Add lights to all project cards
  document.querySelectorAll('.project').forEach((card) => {
    createLightsForCard(card);
  });
}

function removeLights() {
  document.querySelectorAll('.christmas-lights').forEach((el) => {
    el.remove();
  });
}

function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (isActive) {
      removeLights();
      addLights();
    }
  }, 200);
}

export function start() {
  if (isActive) return;
  isActive = true;
  addLights();
  startSnow(); // async but we don't need to wait
  window.addEventListener('resize', handleResize);
}

export function stop() {
  if (!isActive) return;
  isActive = false;
  removeLights();
  stopSnow();
  window.removeEventListener('resize', handleResize);
}

export const themeName = 'christmas';
