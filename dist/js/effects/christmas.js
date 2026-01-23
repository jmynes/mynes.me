// ═══════════════════════════════════════════════════════════════════════════
// Christmas Theme — String Lights on Project Cards
// Colorful twinkling lights along the top of each card
// ═══════════════════════════════════════════════════════════════════════════

let isActive = false;
let resizeTimeout;

const lightColors = [
  { bg: '#ff4444', glow: 'rgba(255, 68, 68, 0.8)' },   // Red
  { bg: '#44dd44', glow: 'rgba(68, 221, 68, 0.8)' },   // Green
  { bg: '#ffdd00', glow: 'rgba(255, 221, 0, 0.9)' },   // Gold
  { bg: '#44aaff', glow: 'rgba(68, 170, 255, 0.8)' }   // Blue
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
  document.querySelectorAll('.project').forEach(card => {
    createLightsForCard(card);
  });
}

function removeLights() {
  document.querySelectorAll('.christmas-lights').forEach(el => el.remove());
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
  window.addEventListener('resize', handleResize);
}

export function stop() {
  if (!isActive) return;
  isActive = false;
  removeLights();
  window.removeEventListener('resize', handleResize);
}

export const themeName = 'christmas';
