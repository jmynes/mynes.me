// ═══════════════════════════════════════════════════════════════════════════
// Bubbly Theme Effects — JS-controlled bubbles that pop at navbar
// ═══════════════════════════════════════════════════════════════════════════

let animationFrame = null;
let bubbles = [];
let container = null;
let navbar = null;
let isActive = false;

const BUBBLE_COUNT = 16;
const MIN_SIZE = 50;
const MAX_SIZE = 140;
const MIN_SPEED = 0.8; // pixels per frame
const MAX_SPEED = 1.9;
const RESPAWN_DELAY = 3000; // ms before respawning after pop
const WOBBLE_AMPLITUDE = 60; // max horizontal sway in pixels
const WOBBLE_SPEED = 0.015; // how fast the wobble oscillates

/**
 * Create a new bubble at the bottom of the screen
 */
function spawnBubble() {
  if (!isActive || !container) return null;

  const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
  const left = Math.random() * (window.innerWidth - size);
  const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);

  const el = document.createElement('div');
  el.className = 'bubble bubble-js';
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.left = `${left}px`;
  el.style.bottom = `${-size - 20}px`;

  container.appendChild(el);

  return {
    el,
    y: -size - 20, // Start below screen
    baseX: left, // Original x position for wobble calculation
    speed,
    size,
    phase: Math.random() * Math.PI * 2, // Random start phase for wobble
    popped: false,
  };
}

/**
 * Main animation loop
 */
function animate() {
  if (!isActive || !navbar) return;

  const navbarRect = navbar.getBoundingClientRect();
  const navbarBottom = navbarRect.bottom;
  const screenHeight = window.innerHeight;

  for (let i = 0; i < bubbles.length; i++) {
    const bubble = bubbles[i];
    if (!bubble || bubble.popped) continue;

    // Move bubble up
    bubble.y += bubble.speed;
    bubble.el.style.bottom = `${bubble.y}px`;

    // Apply horizontal wobble for curvy path
    const wobbleX =
      Math.sin(bubble.y * WOBBLE_SPEED + bubble.phase) * WOBBLE_AMPLITUDE;
    bubble.el.style.left = `${bubble.baseX + wobbleX}px`;

    // Check if bubble reached navbar
    const bubbleTop = screenHeight - bubble.y - bubble.size;
    if (bubbleTop <= navbarBottom) {
      popBubble(bubble, i);
    }
  }

  animationFrame = requestAnimationFrame(animate);
}

/**
 * Pop a bubble with sparkle particles
 */
function popBubble(bubble, index) {
  bubble.popped = true;

  const rect = bubble.el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Create sparkle particles
  for (let i = 0; i < 6; i++) {
    createSparkle(centerX, centerY, i, 6);
  }

  // Remove bubble element
  bubble.el.remove();
  bubbles[index] = null;

  // Respawn after delay
  setTimeout(
    () => {
      if (isActive) {
        bubbles[index] = spawnBubble();
      }
    },
    RESPAWN_DELAY + Math.random() * 2000,
  );
}

/**
 * Create a sparkle particle that bursts outward
 */
function createSparkle(x, y, index, total) {
  const sparkle = document.createElement('div');
  sparkle.className = 'bubble-pop-sparkle';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;

  const angle = (index / total) * Math.PI * 2;
  const distance = 30 + Math.random() * 20;
  sparkle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
  sparkle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);

  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 400);
}

/**
 * Start bubbly effects
 */
export function start() {
  if (isActive) return;
  isActive = true;

  container = document.querySelector('.theme-effects');
  navbar = document.querySelector('.site-header');
  if (!container || !navbar) return;

  // Hide any CSS-animated bubbles
  const cssBubbles = container.querySelectorAll('.bubble:not(.bubble-js)');
  for (const b of cssBubbles) {
    b.style.display = 'none';
  }

  // Spawn initial bubbles with staggered positions
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    const bubble = spawnBubble();
    if (bubble) {
      // Stagger initial positions so they're spread out
      bubble.y = Math.random() * window.innerHeight * 0.8;
      bubble.el.style.bottom = `${bubble.y}px`;
      bubbles.push(bubble);
    }
  }

  animate();
}

/**
 * Stop bubbly effects
 */
export function stop() {
  isActive = false;

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  // Remove JS bubbles
  for (const bubble of bubbles) {
    if (bubble?.el) bubble.el.remove();
  }
  bubbles = [];

  // Restore CSS bubbles
  if (container) {
    const cssBubbles = container.querySelectorAll('.bubble:not(.bubble-js)');
    for (const b of cssBubbles) {
      b.style.display = '';
    }
  }

  container = null;
  navbar = null;
}

export const themeName = 'bubbly';
