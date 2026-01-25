// ═══════════════════════════════════════════════════════════════════════════
// Halloween Theme — Floating SVG-style Ghosts
// Based on Steve Gardner's CodePen - ghosts grow and warp along sinusoidal path
// ═══════════════════════════════════════════════════════════════════════════

let canvas = null;
let ctx = null;
let ghosts = [];
let animationId = null;
let isActive = false;
let spawnTimeout = null;
let isPageVisible = true;

// Mobile detection for performance tuning (using matchMedia for reliability)
const isMobile = () =>
  window.matchMedia('(max-width: 768px)').matches ||
  ('ontouchstart' in window && window.innerWidth < 1024);

class Ghost {
  constructor() {
    // Start position (spread across bottom)
    this.startX =
      window.innerWidth * 0.2 + Math.random() * window.innerWidth * 0.6;
    this.startY = window.innerHeight + 50;

    // End position (spread across upper area)
    this.endX =
      window.innerWidth * 0.1 + Math.random() * window.innerWidth * 0.8;
    this.endY = -300;

    // Ghost grows from nothing to full size (like original)
    this.startThickness = 0;
    this.endThickness = 120 + Math.random() * 40; // 120-160
    this.height = 0;
    this.endHeight = 120 + Math.random() * 60; // 120-180

    // Animation progress
    this.y = 0; // Current position along guide
    this.progress = 0; // 0 to 1

    // Wave properties for the guide path
    this.frequency = 0.01 + Math.random() * 0.01;
    this.amplitude = 20 + Math.random() * 40;
    this.guideOffset = Math.random() * 1000;

    // Duration in frames (~2 seconds at 60fps, slower on mobile ~5-8 seconds)
    const baseDuration = isMobile() ? 300 : 120;
    const durationVariance = isMobile() ? 180 : 60;
    this.duration = baseDuration + Math.random() * durationVariance;
    this.frame = 0;

    // Build the guide path
    this.guide = [];
    this.buildGuide();
  }

  buildGuide() {
    this.guide = [];
    const totalHeight = this.startY - this.endY;
    const widthChange = this.startX - this.endX;
    let y = this.startY;

    while (y >= this.endY) {
      const x = this.startX + (widthChange - (widthChange / totalHeight) * y);
      const wave = Math.sin(y * this.frequency + this.guideOffset);
      this.guide.push({
        x: x + ((wave * this.amplitude) / 2 + this.amplitude / 2),
        y: y,
      });
      y--;
    }
  }

  // Get point along guide with thickness offset (matching original logic)
  getPoint(guideY, offsetXPercentage) {
    if (this.guide.length === 0) return { x: 0, y: 0 };

    const idx = Math.max(
      0,
      Math.min(this.guide.length - 1, Math.round(guideY)),
    );
    const point = this.guide[idx];

    // Calculate thickness at this point along the guide (grows as ghost rises)
    const thicknessDiff = this.endThickness - this.startThickness;
    const percentAlongGuide = (guideY / this.guide.length) * 100;
    const thickness =
      this.startThickness + (thicknessDiff / 100) * percentAlongGuide;
    const xOffset = (thickness / 2 / 100) * offsetXPercentage;

    return { x: point.x + xOffset, y: point.y };
  }

  // Easing function (slow in middle, like original SlowMo)
  ease(t) {
    // Simple ease-in-out
    return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  }

  update() {
    this.frame++;
    this.progress = Math.min(1, this.frame / this.duration);
    const easedProgress = this.ease(this.progress);

    // Animate both position and height (like TweenMax in original)
    this.y = easedProgress * this.guide.length;
    this.height = easedProgress * this.endHeight;

    return this.progress < 1;
  }

  draw(ctx) {
    if (this.height < 10) return; // Too small to draw

    const y = Math.round(this.y);
    const h = Math.round(this.height);
    const chunks = h / 6;

    ctx.save();
    ctx.globalAlpha = 0.8;

    // Ghost body path (matching original exactly)
    ctx.beginPath();

    // Start at bottom center
    let p = this.getPoint(y, 10);
    ctx.moveTo(p.x, p.y);

    // Right side curve up
    let p1 = this.getPoint(y, 75);
    let p2 = this.getPoint(y - chunks * 2, 80);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);

    // Right edge going up
    p = this.getPoint(y - chunks * 3, 85);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 4, 90);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 5, 95);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 6, 100);
    ctx.lineTo(p.x, p.y);

    // Wavy top (head)
    p = this.getPoint(y - chunks * 5, 75);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 6, 50);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 5, 25);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 6, 0);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 5, -25);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 6, -50);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 5, -75);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 6, -100);
    ctx.lineTo(p.x, p.y);

    // Left edge going down
    p = this.getPoint(y - chunks * 5, -95);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 4, -90);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 3, -85);
    ctx.lineTo(p.x, p.y);
    p = this.getPoint(y - chunks * 2, -80);
    ctx.lineTo(p.x, p.y);

    // Left side curve back to start
    p1 = this.getPoint(y, -75);
    p2 = this.getPoint(y, 10);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);

    ctx.closePath();
    ctx.fillStyle = '#eeeeee';
    ctx.fill();

    // Face (dark features)
    ctx.fillStyle = 'rgba(17, 17, 17, 0.9)';

    // Left eye (rounded rectangle with curves)
    ctx.beginPath();
    p = this.getPoint(y - chunks * 2, -40);
    ctx.moveTo(p.x, p.y);
    p1 = this.getPoint(y - chunks * 2, -50);
    p2 = this.getPoint(y - chunks * 2.5, -50);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    p1 = this.getPoint(y - chunks * 3, -50);
    p2 = this.getPoint(y - chunks * 3, -40);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    p1 = this.getPoint(y - chunks * 3, -30);
    p2 = this.getPoint(y - chunks * 2.5, -30);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    p1 = this.getPoint(y - chunks * 2, -30);
    p2 = this.getPoint(y - chunks * 2, -40);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    ctx.closePath();
    ctx.fill();

    // Right eye (rounded rectangle with curves)
    ctx.beginPath();
    p = this.getPoint(y - chunks * 2, 40);
    ctx.moveTo(p.x, p.y);
    p1 = this.getPoint(y - chunks * 2, 50);
    p2 = this.getPoint(y - chunks * 2.5, 50);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    p1 = this.getPoint(y - chunks * 3, 50);
    p2 = this.getPoint(y - chunks * 3, 40);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    p1 = this.getPoint(y - chunks * 3, 30);
    p2 = this.getPoint(y - chunks * 2.5, 30);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    p1 = this.getPoint(y - chunks * 2, 30);
    p2 = this.getPoint(y - chunks * 2, 40);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    ctx.closePath();
    ctx.fill();

    // Mouth (oval with curves)
    ctx.beginPath();
    p = this.getPoint(y - chunks * 3, 0);
    ctx.moveTo(p.x, p.y);
    p1 = this.getPoint(y - chunks * 3, 20);
    p2 = this.getPoint(y - chunks * 3.5, 20);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    p1 = this.getPoint(y - chunks * 4.5, 20);
    p2 = this.getPoint(y - chunks * 4.5, 0);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    p1 = this.getPoint(y - chunks * 4.5, -20);
    p2 = this.getPoint(y - chunks * 3.5, -20);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    p1 = this.getPoint(y - chunks * 3, -20);
    p2 = this.getPoint(y - chunks * 3, 0);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

function createCanvas() {
  canvas = document.createElement('canvas');
  canvas.id = 'halloween-canvas';
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

function spawnGhost() {
  if (!isActive || !isPageVisible) return;
  ghosts.push(new Ghost());
  spawnTimeout = setTimeout(spawnGhost, Math.random() * 625);
}

function handleVisibilityChange() {
  isPageVisible = !document.hidden;
  if (isPageVisible && isActive) {
    // Clear existing ghosts when returning to prevent buildup
    ghosts = [];
    // Restart spawning
    if (spawnTimeout) clearTimeout(spawnTimeout);
    spawnGhost();
  }
}

function animate() {
  if (!isActive || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ghosts = ghosts.filter((ghost) => {
    const alive = ghost.update();
    if (alive) ghost.draw(ctx);
    return alive;
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
  isPageVisible = !document.hidden;
  createCanvas();
  ghosts = [];
  spawnGhost();
  animationId = requestAnimationFrame(animate);
  window.addEventListener('resize', handleResize);
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

export function stop() {
  if (!isActive) return;
  isActive = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (spawnTimeout) {
    clearTimeout(spawnTimeout);
    spawnTimeout = null;
  }
  removeCanvas();
  ghosts = [];
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
}

export const themeName = 'halloween';
