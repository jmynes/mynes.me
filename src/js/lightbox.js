// ═══════════════════════════════════════════════════════════════════════════
// Lightbox Module
// Portfolio modal for project details
// ═══════════════════════════════════════════════════════════════════════════

const projectInfo = {
  punt: {
    title: 'PUNT',
    description:
      'A self-hosted issue tracker with backlog and Kanban views. Lightweight, local-first project management for teams who want the essentials without the overhead—drag-and-drop boards, sprint planning with carryover tracking, multi-select bulk actions, undo/redo, and real-time sync via SSE. Keep your data on your own infrastructure.',
    github: 'https://github.com/jmynes/punt',
    live: 'https://punt-demo-production.up.railway.app',
    comingSoon: false,
    tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Tailwind'],
  },
  pokeraoke: {
    title: 'Pokeraoke',
    description:
      'Built for BradleyRose\'s "21st Night of September" Twitch stream—a semi-nuzlocke run of Pokémon Fire Red Omega++ themed around the Earth, Wind & Fire song. Every caught Pokémon was named after lyrics from the track. This karaoke machine syncs trainer sprites and Pokémon to the music, visualizing Bradley\'s actual catches from the run.',
    github: 'https://github.com/jmynes/pokeraoke',
    live: 'https://pokeraoke.pages.dev',
    comingSoon: false,
    tech: ['React', 'Vite', 'Canvas API'],
  },
};

/**
 * Create SVG icon element
 */
function createIcon(type) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  if (type === 'github') {
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      'd',
      'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
    );
    svg.appendChild(path);
  } else if (type === 'external') {
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.5');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M7 17L17 7M17 7H7M17 7V17');
    svg.appendChild(path);
  } else if (type === 'arrow') {
    svg.setAttribute('width', '14');
    svg.setAttribute('height', '14');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.5');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M5 12h14M12 5l7 7-7 7');
    svg.appendChild(path);
  }

  return svg;
}

/**
 * Initialize lightbox functionality
 */
export function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxActions = document.getElementById('lightbox-actions');
  const lightboxTech = document.getElementById('lightbox-tech');
  const screenshotWrappers = document.querySelectorAll(
    '.project-screenshot-wrapper',
  );

  if (!lightbox || !lightboxImage) return;

  // Open lightbox on screenshot click
  screenshotWrappers.forEach((wrapper) => {
    wrapper.addEventListener('click', () => {
      const img = wrapper.querySelector('img');
      const project = wrapper.dataset.project;
      const info = projectInfo[project] || {
        title: '',
        description: '',
        github: null,
        live: null,
        tech: [],
      };

      // Set image
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;

      // Set title
      lightboxTitle.textContent = info.title;

      // Set description
      lightboxDescription.textContent = info.description;

      // Build action buttons using DOM methods
      lightboxActions.replaceChildren();

      if (info.github) {
        const githubLink = document.createElement('a');
        githubLink.href = info.github;
        githubLink.className = 'lightbox-action github';
        githubLink.target = '_blank';
        githubLink.rel = 'noopener';
        githubLink.appendChild(createIcon('github'));
        const githubText = document.createElement('span');
        githubText.textContent = 'GitHub';
        githubLink.appendChild(githubText);
        lightboxActions.appendChild(githubLink);
      }

      if (info.live) {
        const liveLink = document.createElement('a');
        liveLink.href = info.live;
        liveLink.className = 'lightbox-action live';
        liveLink.target = '_blank';
        liveLink.rel = 'noopener';
        liveLink.appendChild(createIcon('external'));
        const liveText = document.createElement('span');
        liveText.textContent = 'Visit Live';
        liveLink.appendChild(liveText);
        lightboxActions.appendChild(liveLink);
      } else if (info.comingSoon) {
        const comingSoon = document.createElement('span');
        comingSoon.className = 'lightbox-action coming-soon';
        comingSoon.appendChild(createIcon('arrow'));
        const csText = document.createElement('span');
        csText.textContent = 'Coming Soon';
        comingSoon.appendChild(csText);
        lightboxActions.appendChild(comingSoon);
      }

      // Build tech tags using DOM methods
      lightboxTech.replaceChildren();
      (info.tech || []).forEach((tag) => {
        const tagEl = document.createElement('span');
        tagEl.className = 'lightbox-tag';
        tagEl.textContent = tag;
        lightboxTech.appendChild(tagEl);
      });

      // Show lightbox
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox on backdrop or close button click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('.lightbox-close')) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      lightbox.getAttribute('aria-hidden') === 'false'
    ) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
