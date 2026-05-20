# AGENTS.md

## Language Rule
All communication, comments, and code must be in English only.

## Project overview

React + Vite website for Sans Frontieres, a game studio. Currently being migrated to Astro — both systems coexist.

- **Active entry**: `index.html` → `src/main.jsx` (React + HashRouter)
- **Astro migration** (in progress): `src/pages/index.astro`, `src/layouts/BaseLayout.astro`, `src/components/Navbar.astro`
- **Deployment**: GitHub Pages at `https://SansFrontieresGames.github.io`

## Commands

| Command | What it does |
|---|---|
| `pnpm run dev` / `pnpm dev` | Vite dev server (React app) |
| `pnpm run build` / `pnpm build` | Vite production build → `dist/` |
| `pnpm run preview` | Preview Vite production build |
| `pnpm run lint` | ESLint on all JS/JSX files |
| `pnpm run deploy` / `pnpm deploy` | Build + push `dist/` to `gh-pages` branch |
| `pnpm run astro:dev` | Astro dev server (migration target) |
| `pnpm run astro:build` | Astro production build |
| `pnpm run astro:preview` | Preview Astro production build |
| `pnpm run migrate:astro` | Placeholder echo for migration tasks |

**No test runner configured.** There are no test scripts or test files.

## Key architectural facts

### Dual Navbar components
- **React Navbar**: `src/components/Navbar/Navbar.jsx` + `Navbar.css` — used by the current React app
- **Astro Navbar**: `src/components/Navbar.astro` — used by the Astro migration
- These are separate implementations, not interchangeable.

### Vite is rolldown-vite
The `vite` dependency is aliased to `npm:rolldown-vite@7.2.5` (see `package.json` overrides). Do not treat this as standard Vite — some plugins or config options may differ.

### HashRouter
Client-side routing uses `HashRouter` (`src/main.jsx:3`). This is intentional for GitHub Pages (no server-side 404 handling). All route paths in `App.jsx` are relative to `#/`.

### Bootstrap dual-loading
- **React app**: imports Bootstrap from npm (`bootstrap/dist/css/bootstrap.min.css` + JS bundle in `main.jsx`)
- **Astro layout**: loads Bootstrap from CDN (`BaseLayout.astro:16-22`)
- When editing styles, be aware which system you're touching.

### Animation libraries
- **framer-motion** (`react`): Used in React components (e.g., Navbar, App lazy loading)
- **GSAP** (`gsap`): Used in Hero section (`src/components/Hero/Hero.jsx`) for scroll-triggered animations

### Style directories
- `src/index.css`: Core reset, base styles, reduced motion support, container utility
- `src/global.css`: Legacy React global styles
- `src/styles/global.css`: Astro global styles (used by `BaseLayout.astro`)
- These are separate; when editing styles, know which build system you're targeting.

### Vanilla JS scripts
- `src/scripts/navbar.js`: Mobile hamburger menu toggle and scroll-based navbar styling. Separate from both React and Astro navbar implementations. Imported in `BaseLayout.astro`.

### Package manager
Both `package-lock.json` and `pnpm-lock.yaml` exist. The `predeploy` and `deploy` scripts use `pnpm`, making it the preferred package manager.

### No TypeScript
The project is plain JavaScript with JSX. ESLint is configured for `*.{js,jsx}` only.

## ESLint

- Ignores `dist/`
- Unused vars are errors, except uppercase identifiers (`^[A-Z_]`), which are treated as intentional exports/constants
- Run with `pnpm lint`

## Deployment

`npm run deploy` runs `npm run build` then `gh-pages -d dist`. The built `dist/` is pushed to the `gh-pages` branch. Assets resolve relative to `https://SansFrontieresGames.github.io/` (configured via `homepage` in `package.json` and `base: '/'` in both `vite.config.js` and `astro.config.mjs`).

## Migration notes (React → Astro)

- Migration work lives on the `Astro-Dev` branch (currently uncommitted).
- Astro files live alongside React files. The current active build is Vite/React (`pnpm dev`/`pnpm build`).
- The Astro migration is incomplete: only a homepage (`index.astro`), layout (`BaseLayout.astro`), and navbar (`Navbar.astro`) exist in Astro. Other pages (Proyectos, Servicios, Contacto, Equipo) are still React components under `src/pages/`.
- The `.astro/` directory contains Astro's internal cache/collections — do not delete it.
- Astro config outputs static files at base `/` to the same site URL as the React build.
