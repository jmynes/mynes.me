// ═══════════════════════════════════════════════════════════════════════════
// Inferno Theme — Dynamic Ember Effects
// Rising embers, smouldering particles, hellish glow
// ═══════════════════════════════════════════════════════════════════════════

let canvas = null;
let ctx = null;
let embers = [];
let animationId = null;
let isActive = false;

// Ember particle class
class Ember {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = window.innerHeight + 20;
    this.size = 2 + Math.random() * 4;
    this.speedY = -(1.5 + Math.random() * 2.5); // Rising speed
    this.speedX = (Math.random() - 0.5) * 1.5; // Horizontal drift
    this.life = 1;
    this.decay = 0.003 + Math.random() * 0.005;
    this.brightness = 0.8 + Math.random() * 0.2;
    this.flickerSpeed = 0.05 + Math.random() * 0.1;
    this.flickerOffset = Math.random() * Math.PI * 2;
    // Color varies from yellow-orange to deep red
    this.hue = 15 + Math.random() * 30; // 15-45 (orange-yellow range)
  }

  update() {
    // Rise upward with slight wave motion
    this.y += this.speedY;
    this.x +=
      this.speedX + Math.sin(Date.now() * 0.002 + this.flickerOffset) * 0.5;

    // Decrease life
    this.life -= this.decay;

    // Flicker brightness
    const flicker =
      Math.sin(Date.now() * this.flickerSpeed + this.flickerOffset) * 0.2;
    this.currentBrightness = Math.max(0.3, this.brightness + flicker);

    // Respawn when dead or off screen
    if (this.life <= 0 || this.y < -20) {
      this.reset();
    }
  }

  draw(ctx) {
    const alpha = this.life * this.currentBrightness;
    const glowSize = this.size * (2 + this.life);

    // Outer glow
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      glowSize,
    );
    gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${alpha})`);
    gradient.addColorStop(
      0.3,
      `hsla(${this.hue - 10}, 90%, 50%, ${alpha * 0.6})`,
    );
    gradient.addColorStop(
      0.6,
      `hsla(${this.hue - 20}, 80%, 30%, ${alpha * 0.3})`,
    );
    gradient.addColorStop(1, `hsla(0, 100%, 20%, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Bright hot core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue + 10}, 100%, 90%, ${alpha})`;
    ctx.fill();
  }
}

function createCanvas() {
  canvas = document.createElement('canvas');
  canvas.id = 'inferno-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
}

function removeCanvas() {
  if (canvas?.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
  canvas = null;
  ctx = null;
}

function initEmbers() {
  // More embers for intense smouldering effect
  const count = Math.min(
    40,
    Math.floor((window.innerWidth * window.innerHeight) / 25000),
  );
  embers = [];
  for (let i = 0; i < count; i++) {
    const ember = new Ember();
    // Stagger initial positions
    ember.y = Math.random() * window.innerHeight;
    ember.life = Math.random();
    embers.push(ember);
  }
}

function animate() {
  if (!isActive || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  embers.forEach((ember) => {
    ember.update();
    ember.draw(ctx);
  });

  animationId = requestAnimationFrame(animate);
}

function handleResize() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

export function start() {
  if (isActive) return;
  isActive = true;
  createCanvas();
  initEmbers();
  animate();
  window.addEventListener('resize', handleResize);
}

export function stop() {
  if (!isActive) return;
  isActive = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  removeCanvas();
  embers = [];
  window.removeEventListener('resize', handleResize);
}

export const themeName = 'inferno';
