// ═══════════════════════════════════════════════════════════════════════════
// Lightbox Module
// Image viewer functionality for project screenshots
// ═══════════════════════════════════════════════════════════════════════════

const projectInfo = {
  'punt': {
    title: 'PUNT',
    description: 'A self-hosted issue tracker with backlog and Kanban views. Lightweight, local-first project management for teams who want the essentials without the overhead—drag-and-drop boards, sprint planning with carryover tracking, multi-select bulk actions, undo/redo, and real-time sync via SSE. Keep your data on your own infrastructure.'
  },
  'pokeraoke': {
    title: 'Pokeraoke',
    description: 'Built for BradleyRose\'s "21st Night of September" Twitch stream—a semi-nuzlocke run of Pokémon Fire Red Omega++ themed around the Earth, Wind & Fire song. Every caught Pokémon was named after lyrics from the track. This karaoke machine syncs trainer sprites and Pokémon to the music, visualizing Bradley\'s actual catches from the run.'
  }
};

/**
 * Initialize lightbox functionality
 */
export function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxDescription = document.getElementById('lightbox-description');
  const screenshotWrappers = document.querySelectorAll('.project-screenshot-wrapper');

  if (!lightbox || !lightboxImage) return;

  // Open lightbox on screenshot click
  screenshotWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const img = wrapper.querySelector('img');
      const project = wrapper.dataset.project;
      const info = projectInfo[project] || { title: '', description: '' };

      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightboxCaption.textContent = info.title;
      lightboxDescription.textContent = info.description;
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
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
