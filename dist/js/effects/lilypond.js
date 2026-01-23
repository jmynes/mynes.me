// ═══════════════════════════════════════════════════════════════════════════
// Lily Pond Theme — Interactive Effects
// Falling Wisteria Petals + Fireflies + Water Ripples
// ═══════════════════════════════════════════════════════════════════════════

let canvas = null;
let ctx = null;
let petals = [];
let fireflies = [];
let animationId = null;
let isActive = false;

// Wisteria color palette
const wisteriaColors = [
  { h: 270, s: 50, l: 85 },  // Pale lavender
  { h: 275, s: 45, l: 78 },  // Light purple
  { h: 268, s: 40, l: 70 },  // Medium lavender
  { h: 280, s: 55, l: 65 },  // Deeper purple
  { h: 285, s: 35, l: 90 },  // Almost white purple
];

// Firefly class - warm golden glowing particles
class Firefly {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = 2 + Math.random() * 3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.brightness = Math.random();
    this.brightnessSpeed = 0.008 + Math.random() * 0.015;
    this.brightnessDir = Math.random() > 0.5 ? 1 : -1;
    this.hue = 50 + Math.random() * 25; // Warm gold to amber
    this.maxBrightness = 0.5 + Math.random() * 0.4;
  }

  update() {
    // Gentle floating movement
    this.x += this.speedX + Math.sin(Date.now() * 0.0008 + this.y * 0.01) * 0.25;
    this.y += this.speedY + Math.cos(Date.now() * 0.0008 + this.x * 0.01) * 0.2;

    // Pulsing glow
    this.brightness += this.brightnessSpeed * this.brightnessDir;
    if (this.brightness >= this.maxBrightness || this.brightness <= 0.05) {
      this.brightnessDir *= -1;
    }

    // Wrap around screen
    if (this.x < -20) this.x = window.innerWidth + 20;
    if (this.x > window.innerWidth + 20) this.x = -20;
    if (this.y < -20) this.y = window.innerHeight + 20;
    if (this.y > window.innerHeight + 20) this.y = -20;
  }

  draw(ctx) {
    const alpha = this.brightness;
    const glowSize = this.size * (2 + this.brightness * 2.5);

    // Outer glow
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, glowSize
    );
    gradient.addColorStop(0, `hsla(${this.hue}, 85%, 80%, ${alpha})`);
    gradient.addColorStop(0.3, `hsla(${this.hue}, 75%, 65%, ${alpha * 0.5})`);
    gradient.addColorStop(1, `hsla(${this.hue}, 65%, 45%, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Bright core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 90%, 92%, ${alpha})`;
    ctx.fill();
  }
}

// Wisteria Petal class - falling purple petals
class Petal {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * window.innerWidth;
    this.y = initial ? Math.random() * window.innerHeight : -20;
    this.size = 4 + Math.random() * 6;
    this.speedY = 0.4 + Math.random() * 0.8;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 2;
    this.wobbleOffset = Math.random() * Math.PI * 2;
    this.wobbleSpeed = 0.02 + Math.random() * 0.02;
    this.opacity = 0.5 + Math.random() * 0.4;
    const colorIdx = Math.floor(Math.random() * wisteriaColors.length);
    this.color = wisteriaColors[colorIdx];
  }

  update() {
    // Gentle falling with horizontal wobble
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(Date.now() * this.wobbleSpeed + this.wobbleOffset) * 0.5;
    this.rotation += this.rotationSpeed;

    // Reset when fallen off screen
    if (this.y > window.innerHeight + 20) {
      this.reset();
    }
    // Wrap horizontally
    if (this.x < -20) this.x = window.innerWidth + 20;
    if (this.x > window.innerWidth + 20) this.x = -20;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);

    // Petal shape - elongated teardrop
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
    gradient.addColorStop(0, `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l + 10}%, ${this.opacity})`);
    gradient.addColorStop(0.6, `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, ${this.opacity * 0.8})`);
    gradient.addColorStop(1, `hsla(${this.color.h}, ${this.color.s + 10}%, ${this.color.l - 10}%, 0)`);

    ctx.beginPath();
    ctx.ellipse(0, 0, this.size * 0.4, this.size, 0, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Subtle highlight
    ctx.beginPath();
    ctx.ellipse(-this.size * 0.1, -this.size * 0.3, this.size * 0.15, this.size * 0.3, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.color.h}, ${this.color.s - 10}%, 95%, ${this.opacity * 0.4})`;
    ctx.fill();

    ctx.restore();
  }
}

function createCanvas() {
  canvas = document.createElement('canvas');
  canvas.id = 'firefly-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
}

function removeCanvas() {
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
  canvas = null;
  ctx = null;
}

function initParticles() {
  // Petals - more numerous
  const petalCount = Math.min(35, Math.floor(window.innerWidth * window.innerHeight / 30000));
  petals = [];
  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  // Fireflies - fewer, magical accents
  const fireflyCount = Math.min(18, Math.floor(window.innerWidth * window.innerHeight / 60000));
  fireflies = [];
  for (let i = 0; i < fireflyCount; i++) {
    fireflies.push(new Firefly());
  }
}

function animate() {
  if (!isActive || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw petals first (behind fireflies)
  petals.forEach(petal => {
    petal.update();
    petal.draw(ctx);
  });

  // Draw fireflies on top (they glow)
  fireflies.forEach(firefly => {
    firefly.update();
    firefly.draw(ctx);
  });

  animationId = requestAnimationFrame(animate);
}

function handleResize() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

// Water ripple effect on click/touch
function createRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'pond-ripple';
  const size = 150 + Math.random() * 100;
  ripple.style.width = size + 'px';
  ripple.style.height = size + 'px';
  ripple.style.left = (x - size / 2) + 'px';
  ripple.style.top = (y - size / 2) + 'px';
  document.body.appendChild(ripple);

  // Create secondary smaller ripple
  setTimeout(() => {
    const ripple2 = document.createElement('div');
    ripple2.className = 'pond-ripple';
    const size2 = size * 0.6;
    ripple2.style.width = size2 + 'px';
    ripple2.style.height = size2 + 'px';
    ripple2.style.left = (x - size2 / 2) + 'px';
    ripple2.style.top = (y - size2 / 2) + 'px';
    ripple2.style.animationDuration = '1s';
    document.body.appendChild(ripple2);
    setTimeout(() => ripple2.remove(), 1000);
  }, 150);

  // Remove after animation
  setTimeout(() => ripple.remove(), 1200);
}

function handleClick(e) {
  if (!isActive) return;
  // Don't create ripples on interactive elements
  if (e.target.closest('a, button, .project-screenshot-wrapper, .lightbox')) return;
  createRipple(e.clientX, e.clientY);
}

export function start() {
  if (isActive) return;
  isActive = true;
  createCanvas();
  initParticles();
  animate();
  window.addEventListener('resize', handleResize);
  document.addEventListener('click', handleClick);
}

export function stop() {
  if (!isActive) return;
  isActive = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  removeCanvas();
  petals = [];
  fireflies = [];
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('click', handleClick);
  // Clean up any remaining ripples
  document.querySelectorAll('.pond-ripple').forEach(r => r.remove());
}

export const themeName = 'lilypond';
