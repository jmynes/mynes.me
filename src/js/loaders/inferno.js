// ═══════════════════════════════════════════════════════════════════════════
// Inferno Theme Loader — Hellish Ascent with Canvas Burn Effect
// Embers rise, title appears, then burns away like paper
// ═══════════════════════════════════════════════════════════════════════════

export const themeName = 'inferno';

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fast burn effect using expanding circles with organic edges
 * Much smoother and more performant than cellular automata
 */
function createBurnEffect(canvas, onComplete, isCancelled) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Burn holes - each grows over time with slight irregularity
  const baseSpeed = Math.max(width, height) * 0.018; // Scale speed to screen size
  const holes = [
    { x: 0.15, y: 0.2 },
    { x: 0.85, y: 0.15 },
    { x: 0.5, y: 0.5 },
    { x: 0.2, y: 0.75 },
    { x: 0.8, y: 0.8 },
    { x: 0.4, y: 0.3 },
    { x: 0.7, y: 0.6 },
  ].map((h) => {
    const x = (h.x + (Math.random() - 0.5) * 0.1) * width;
    const y = (h.y + (Math.random() - 0.5) * 0.1) * height;
    // Calculate radius needed to reach farthest corner from this position
    const maxRadius = Math.max(
      Math.hypot(x, y), // distance to top-left
      Math.hypot(width - x, y), // distance to top-right
      Math.hypot(x, height - y), // distance to bottom-left
      Math.hypot(width - x, height - y), // distance to bottom-right
    );
    return {
      x,
      y,
      radius: 0,
      speed: baseSpeed * (0.9 + Math.random() * 0.2),
      wobble: Math.random() * Math.PI * 2,
      maxRadius, // Each hole has its own max based on position
    };
  });
  const edgeWidth = Math.max(3, width * 0.004); // Scale edge width to screen

  // Helper to draw a wobbly circle path
  function drawWobblyPath(hole, radiusOffset = 0) {
    ctx.beginPath();
    const segments = 32; // More segments for smoother curves
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      // Gentler wobble with multiple frequencies for organic look
      const wobbleAmount =
        Math.sin(angle * 3 + hole.wobble) * (hole.radius * 0.08) +
        Math.sin(angle * 5 + hole.wobble * 1.3) * (hole.radius * 0.04);
      const r = hole.radius + wobbleAmount + radiusOffset;
      const px = hole.x + Math.cos(angle) * r;
      const py = hole.y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  function draw() {
    if (isCancelled()) {
      onComplete();
      return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw the overlay base
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#0d0503';
    ctx.fillRect(0, 0, width, height);

    // Update hole sizes
    for (const hole of holes) {
      if (hole.radius < hole.maxRadius) {
        hole.radius += hole.speed;
      }
      hole.wobble += 0.03; // Slower wobble for smoother animation
    }

    // Check if all four corners are covered by at least one hole
    const corners = [
      [0, 0],
      [width, 0],
      [0, height],
      [width, height],
    ];
    const allDone = corners.every(([cx, cy]) =>
      holes.some((hole) => {
        const dist = Math.hypot(hole.x - cx, hole.y - cy);
        return hole.radius > dist;
      }),
    );

    // Cut out ALL holes first (so edges don't overlap with any hole)
    ctx.globalCompositeOperation = 'destination-out';
    for (const hole of holes) {
      if (hole.radius > 0) {
        drawWobblyPath(hole);
        ctx.fill();
      }
    }

    // Now draw edges using source-atop - this only draws where there's still opaque paper
    ctx.globalCompositeOperation = 'source-atop';
    for (const hole of holes) {
      if (hole.radius > 0 && hole.radius < hole.maxRadius) {
        // Draw glowing edge just outside the hole (on the remaining paper)
        ctx.strokeStyle = 'rgba(255, 120, 40, 0.95)';
        ctx.lineWidth = edgeWidth;
        drawWobblyPath(hole, edgeWidth * 0.5);
        ctx.stroke();

        // Inner brighter edge
        ctx.strokeStyle = 'rgba(255, 200, 100, 0.7)';
        ctx.lineWidth = edgeWidth * 0.5;
        drawWobblyPath(hole, edgeWidth * 0.2);
        ctx.stroke();
      }
    }

    ctx.globalCompositeOperation = 'source-over';

    if (allDone) {
      onComplete();
    } else {
      requestAnimationFrame(draw);
    }
  }

  draw();
}

/**
 * Animate the inferno loader
 * @param {HTMLElement} overlay - The loader overlay element
 * @param {Function} isCancelled - Function that returns true if cancelled
 * @returns {Promise} Resolves when animation completes
 */
export async function animate(overlay, isCancelled) {
  // Clear overlay
  while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
  }
  overlay.className = 'theme-loader theme-loader--inferno';

  // Hide scrollbar during animation
  document.documentElement.style.overflow = 'hidden';

  const restoreScrollbar = () => {
    document.documentElement.style.overflow = '';
  };

  // Create container for scene elements (embers, title)
  const container = document.createElement('div');
  container.className = 'inferno-scene';
  overlay.appendChild(container);

  // Create embers
  const embers = document.createElement('div');
  embers.className = 'inferno-embers';
  container.appendChild(embers);

  for (let i = 0; i < 12; i++) {
    const ember = document.createElement('div');
    ember.className = 'inferno-ember';
    ember.style.left = `${10 + Math.random() * 80}%`;
    ember.style.animationDelay = `${Math.random() * 1.5}s`;
    ember.style.animationDuration = `${1 + Math.random() * 1}s`;
    embers.appendChild(ember);
  }

  // Create title text
  const title = document.createElement('div');
  title.className = 'inferno-title';
  title.textContent = 'BURN';
  container.appendChild(title);

  // Start dark
  await sleep(300);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Embers float up
  embers.classList.add('active');

  await sleep(400);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Title appears
  title.classList.add('visible');

  // Let title be visible
  await sleep(1000);
  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  // Create canvas for burn effect DIRECTLY on overlay (not inside container)
  // This way, when it burns transparent, the page content underneath shows through
  const canvas = document.createElement('canvas');
  canvas.className = 'inferno-burn-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  overlay.appendChild(canvas); // Append to overlay, not container

  // Fill canvas with the overlay color
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0d0503'; // --uw-black
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Hide the scene elements, let canvas take over as the overlay
  container.style.display = 'none';

  // Make overlay transparent so page shows through burned canvas holes
  overlay.style.background = 'transparent';

  // Run burn effect - when canvas pixels become transparent, the page shows through
  await new Promise((resolve) => {
    createBurnEffect(canvas, resolve, isCancelled);
  });

  if (isCancelled()) {
    restoreScrollbar();
    return;
  }

  restoreScrollbar();
}
