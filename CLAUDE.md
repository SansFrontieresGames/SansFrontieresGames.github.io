# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (HMR via rolldown-vite)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint
npm run deploy    # Build + publish dist/ to gh-pages branch
```

## Architecture

**Sans Frontieres Games** — React 19 + Vite (rolldown-vite) SPA deployed to GitHub Pages at `https://SansFrontieresGames.github.io`.

### Routing

`HashRouter` is used (not `BrowserRouter`) to avoid 404s on GitHub Pages. Routes are defined in [src/App.jsx](src/App.jsx):

| Path | Page |
|---|---|
| `/` | Home |
| `/proyectos` | Proyectos |
| `/servicios` | Servicios |
| `/contacto` | Contacto |
| `/equipo` | Equipo |

### File layout

- `src/main.jsx` — app entry; wraps everything in `HashRouter`
- `src/App.jsx` — global `<Navbar>` + route definitions
- `src/components/` — shared UI (Navbar, Hero, TabContent/Tabs); each component has a collocated `.css`
- `src/pages/` — one folder per route, each with its own `.jsx` and `.css`

### Animation libraries

Two animation libraries are used with distinct roles — keep them consistent:
- **Framer Motion** (`framer-motion`) — UI-level transitions: navbar entrance, active-link underline (`layoutId="underline"`), interactive hover states
- **GSAP** (`gsap`) — section-level entry animations (e.g., `Hero` fade-in via `useRef` + `useEffect`)

### Styling

Bootstrap 5 is imported globally in `main.jsx` (both CSS and JS bundle). Per-component styles live in collocated `.css` files. There are two global stylesheets: `index.css` and `global.css`.

### Deployment notes

- `package.json` `homepage` is `https://SansFrontieresGames.github.io` — required for correct asset resolution
- `vite.config.js` `base` is `'/'` — if moving to a subpath, update both this and `homepage`
- `npm run deploy` runs `predeploy` (build) automatically before publishing via `gh-pages`
