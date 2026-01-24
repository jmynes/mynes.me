// ═══════════════════════════════════════════════════════════════════════════
// Fireflies Theme Effects — Glowing fireflies floating in the night
// ═══════════════════════════════════════════════════════════════════════════

let isActive = false;
let animationFrame = null;
let fireflies = [];
let container = null;

const FIREFLY_COUNT = 20;
const MIN_SIZE = 4;
const MAX_SIZE = 8;

/**
 * Create a firefly element
 */
function createFirefly() {
  if (!isActive || !container) return null;

  const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  const el = document.createElement('div');
  el.className = 'firefly-glow';
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  container.appendChild(el);

  return {
    el,
    x,
    y,
    size,
    // Movement parameters
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    // Drift pattern
    driftPhase: Math.random() * Math.PI * 2,
    driftSpeed: 0.005 + Math.random() * 0.01,
    driftAmount: 20 + Math.random() * 30,
    // Glow pulse
    glowPhase: Math.random() * Math.PI * 2,
    glowSpeed: 0.02 + Math.random() * 0.03,
    // Brightness state
    brightness: 0.5 + Math.random() * 0.5,
  };
}

/**
 * Update firefly positions and glow
 */
function animate() {
  if (!isActive) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  for (const fly of fireflies) {
    if (!fly) continue;

    // Update drift phase
    fly.driftPhase += fly.driftSpeed;
    fly.glowPhase += fly.glowSpeed;

    // Calculate new position with organic drift
    fly.x += fly.speedX + Math.sin(fly.driftPhase) * 0.3;
    fly.y += fly.speedY + Math.cos(fly.driftPhase * 0.7) * 0.2;

    // Wrap around screen edges
    if (fly.x < -20) fly.x = width + 20;
    if (fly.x > width + 20) fly.x = -20;
    if (fly.y < -20) fly.y = height + 20;
    if (fly.y > height + 20) fly.y = -20;

    // Update position
    fly.el.style.left = `${fly.x}px`;
    fly.el.style.top = `${fly.y}px`;

    // Update glow intensity
    const glow = 0.4 + Math.sin(fly.glowPhase) * 0.4 + Math.random() * 0.2;
    fly.el.style.opacity = glow;

    // Occasional bright flash
    if (Math.random() < 0.002) {
      fly.el.style.transform = 'scale(1.5)';
      setTimeout(() => {
        if (fly.el) fly.el.style.transform = 'scale(1)';
      }, 150);
    }
  }

  animationFrame = requestAnimationFrame(animate);
}

/**
 * Start fireflies effect
 */
export function start() {
  if (isActive) return;
  isActive = true;

  container = document.querySelector('.theme-effects');
  if (!container) return;

  // Create fireflies
  for (let i = 0; i < FIREFLY_COUNT; i++) {
    const fly = createFirefly();
    if (fly) {
      fireflies.push(fly);
    }
  }

  animate();
}

/**
 * Stop fireflies effect
 */
export function stop() {
  isActive = false;

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  // Remove firefly elements
  for (const fly of fireflies) {
    if (fly?.el) fly.el.remove();
  }
  fireflies = [];
  container = null;
}

export const themeName = 'fireflies';
