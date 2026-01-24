# mynes.me

A portfolio landing page showcasing projects built with vibes.

## Features

- **13 Themes**: Aero, Bubbly, Christmas, Fireflies, Groovy, Hacker, Halloween, Lilypond, PowerPC, Retrogame, Starwars, Synthwave, and Underworld — each with unique visual effects
- **Shuffle Mode**: Randomly picks a different theme on each visit (default on)
- **Portfolio Modal**: Click screenshots to open a split-panel lightbox with large image preview, project links, description, and tech stack
- **Responsive**: Works on desktop and mobile

## Projects

### PUNT
A self-hosted issue tracker with backlog and Kanban views. Features drag-and-drop boards, sprint planning with carryover tracking, multi-select bulk actions, undo/redo, and real-time sync via SSE.

### Pokeraoke
Turn any lyrics into a Pokemon sprite karaoke performance. Map words to Pokemon, sync with timed LRC files, and watch sprites bounce along to the music.

## Development

```bash
pnpm install        # Install dependencies
pnpm run build      # Build CSS and JS to dist/
pnpm run watch      # Watch for changes during development
```

Then open `index.html` in a browser.

## Structure

```
index.html              # Main page
src/
  scss/
    base.scss           # Shared layout and components
    themes/
      aero.scss         # Vista Aurora glass effects
      bubbly.scss       # Frutiger Aero bubbles
      christmas.scss    # Holiday snow and lights
      fireflies.scss    # Glowing firefly particles
      groovy.scss       # 70s psychedelic waves
      hacker.scss       # Matrix rain terminal
      halloween.scss    # Spooky pumpkins and bats
      pond.scss         # Tranquil water ripples
      powerpc.scss      # Classic Mac OS platinum
      retrogame.scss    # Arcade pixel aesthetic
      starwars.scss     # Hyperspace star field
      synthwave.scss    # 80s neon grid
      underworld.scss   # Volcanic ember particles
  js/                   # JavaScript modules
dist/                   # Compiled assets (gitignored)
```

## License

MIT
