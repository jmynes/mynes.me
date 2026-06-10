// ═══════════════════════════════════════════════════════════════════════════
// Lightbox Module
// Portfolio modal for project details
// ═══════════════════════════════════════════════════════════════════════════

const projectInfo = {
  vpc8: {
    title: 'VPC8',
    status: 'Live',
    description:
      "Vocalist Producer Challenge VIII — a nerdcore hiphop competition where vocalist/producer teams battle across gameshow-style rounds. Punch-Out-inspired fight-card aesthetic, full streaming audio player with MediaSession controls, live leaderboard, and per-entry judges' feedback.",
    discord: 'https://discord.gg/JDJrW5h67U',
    live: 'https://nerdcorevpc.com',
    liveLabel: 'Listen In',
    comingSoon: false,
    tech: ['SvelteKit', 'Bun', 'Tailwind v4', 'Howler.js'],
  },
  hexhive: {
    title: 'HexHive',
    status: 'WIP',
    description:
      "A Pokémon ROM-hack asset hub built for the Gen 3 binary (hex-editing) romhacking scene. The community's knowledge has long been scattered across Discord pinned messages, tiny preview thumbnails, and GitHub gists with no way to audition MIDIs — HexHive gives it a real home: browse and upload romhacks, sprites, sounds, and scripts with proper previews, durable version history, and full-text search. Backed by OAuth + passkeys, direct browser-to-R2 presigned uploads, SQLite FTS5 with typo-tolerant trigram fallback, and a unified 4-step upload wizard.",
    discord: 'https://discord.gg/YSVdnqjHE',
    live: 'https://hexhive.app',
    liveLabel: 'Try It',
    comingSoon: false,
    tech: [
      'SvelteKit',
      'Bun',
      'Drizzle',
      'Turso',
      'Cloudflare R2',
      'Better Auth',
    ],
  },
  punt: {
    title: 'Punt',
    status: 'Stable',
    description:
      'A self-hosted issue tracker with backlog and Kanban views. Lightweight, local-first project management for teams who want the essentials without the overhead—drag-and-drop boards, sprint planning with carryover tracking, multi-select bulk actions, undo/redo, and real-time sync via SSE. Keep your data on your own infrastructure.',
    github: 'https://github.com/jmynes/punt',
    live: 'https://punt-demo-production.up.railway.app',
    liveLabel: 'Try Demo',
    comingSoon: false,
    tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Tailwind'],
  },
  clopen: {
    title: 'Clopen',
    status: 'Stable',
    description:
      "A personal timesheet that tracks the hours you've worked against the hours you were supposed to work, and what that means for your pay. Pick a period — week, bi-week, month, quarter, year — and the dashboard shows a running balance in hours and dollars; long days offset short ones, the comparison is always totals, never day by day. Entries go in however you have them: clock in/out that parses '2pm' or '14:00', plain hours, a week grid you can paste into from a spreadsheet, or CSV import. PTO, sick, holiday, and vacation each come paid or unpaid — paid leave credits the baseline, unpaid is drawn hatched so the difference is visible. Everything is local: one SQLite file on disk, no accounts, no network. The name comes from the close-then-open shift (and, yes, the topology term).",
    github: 'https://github.com/jmynes/clopen',
    live: 'https://clopen-production.up.railway.app/',
    liveLabel: 'Try Demo',
    comingSoon: false,
    tech: ['SvelteKit', 'Bun', 'Drizzle', 'SQLite', 'Tailwind v4'],
    images: [
      {
        src: 'src/assets/images/clopen-screenshot.png',
        alt: 'Clopen - timesheet dashboard showing period balance in hours and dollars with a weekly hours chart',
      },
      {
        src: 'src/assets/images/clopen-screenshot-log.png',
        alt: 'Clopen - log page with clock in/out entry form, leave buttons, and a paste-friendly week grid',
      },
    ],
  },
  pokeraoke: {
    title: 'Pokeraoke',
    status: 'Demo',
    description:
      'Twitch streamer <a href="https://www.twitch.tv/bradleyrose" target="_blank" rel="noopener">BradleyRose</a> picked up my Gen 3 binary romhack Pokémon Fire Red Omega++ (a hack of Drayano\'s 2009 Fire Red Omega) for a "21st Night of September" themed semi-nuzlocke, restricted to Ground, Flying, and Fire types, with every caught Pokémon named after a lyric from the Earth, Wind & Fire track. Pokeraoke is the karaoke machine I built for the series: it loads real .lrc files, fuzzy-matches lyrics to Pokémon, and reveals his roster line by line as the song plays. Reassign Pokémon or rewrite the lyric sheet on the fly. <a href="https://www.twitch.tv/bradleyrose/clip/CrepuscularHelplessHamsterLitFam-VDW-tyw4MdtuAkdh?filter=clips&range=all" target="_blank" rel="noopener">Here\'s a clip.</a>',
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
  } else if (type === 'discord') {
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      'd',
      'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9554 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z',
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
  const lightboxCounter = document.getElementById('lightbox-counter');
  const counterCurrent = lightboxCounter?.querySelector('.counter-current');
  const counterTotal = lightboxCounter?.querySelector('.counter-total');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const screenshotWrappers = document.querySelectorAll(
    '.project-screenshot-wrapper',
  );

  if (!lightbox || !lightboxImage) return;

  // Carousel state for the currently open project
  let galleryImages = [];
  let galleryIndex = 0;

  function showImage(index) {
    if (!galleryImages.length) return;
    galleryIndex = (index + galleryImages.length) % galleryImages.length;
    const image = galleryImages[galleryIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    if (counterCurrent) counterCurrent.textContent = galleryIndex + 1;
  }

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

      // Set image(s) — projects with an images array get a carousel
      galleryImages = info.images || [{ src: img.src, alt: img.alt }];
      const multiple = galleryImages.length > 1;
      if (counterTotal) counterTotal.textContent = galleryImages.length;
      lightboxCounter?.setAttribute('aria-hidden', multiple ? 'false' : 'true');
      lightboxPrev?.setAttribute('aria-hidden', multiple ? 'false' : 'true');
      lightboxNext?.setAttribute('aria-hidden', multiple ? 'false' : 'true');
      lightboxImage.classList.toggle('is-carousel', multiple);
      showImage(0);

      // Set title (with optional status badge)
      lightboxTitle.replaceChildren();
      lightboxTitle.appendChild(document.createTextNode(info.title));
      if (info.status) {
        const badge = document.createElement('span');
        badge.className = 'project-badge';
        badge.textContent = info.status;
        lightboxTitle.appendChild(badge);
      }

      // Set description (HTML allowed — content is statically authored above)
      lightboxDescription.innerHTML = info.description;

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

      if (info.discord) {
        const discordLink = document.createElement('a');
        discordLink.href = info.discord;
        discordLink.className = 'lightbox-action github discord';
        discordLink.target = '_blank';
        discordLink.rel = 'noopener';
        discordLink.appendChild(createIcon('discord'));
        const discordText = document.createElement('span');
        discordText.textContent = 'Discord';
        discordLink.appendChild(discordText);
        lightboxActions.appendChild(discordLink);
      }

      if (info.live) {
        const liveLink = document.createElement('a');
        liveLink.href = info.live;
        liveLink.className = 'lightbox-action live';
        liveLink.target = '_blank';
        liveLink.rel = 'noopener';
        liveLink.appendChild(createIcon('external'));
        const liveText = document.createElement('span');
        liveText.textContent = info.liveLabel || 'Visit Live';
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

      // Show lightbox and lock background scroll (lock both <html> and <body>
      // since the scrolling element varies across browsers)
      lightbox.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox on backdrop or close button click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('.lightbox-close')) {
      closeLightbox();
    }
  });

  // Clicking the image advances the carousel
  lightboxImage.addEventListener('click', () => {
    if (galleryImages.length > 1) showImage(galleryIndex + 1);
  });

  // Arrow buttons navigate the carousel
  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(galleryIndex - 1);
  });
  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(galleryIndex + 1);
  });

  // Keyboard: Escape closes, arrows navigate the carousel
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') !== 'false') return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight' && galleryImages.length > 1) {
      showImage(galleryIndex + 1);
    } else if (e.key === 'ArrowLeft' && galleryImages.length > 1) {
      showImage(galleryIndex - 1);
    }
  });

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
}
