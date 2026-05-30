# Sans Frontieres — Game Studio Website

Official website of **Sans Frontieres**, an independent game studio based in Costa Rica. Built with Astro, deployed on GitHub Pages.

**Live site:** [SansFrontieresGames.github.io](https://SansFrontieresGames.github.io)

---

## Tech Stack

| Category    | Technology        |
|-------------|-------------------|
| Framework   | Astro v6.3.6      |
| Output      | Static (SSG)      |
| Styling     | Custom CSS        |
| Animation   | GSAP v3.15.0 + ScrollTrigger |
| Linting     | ESLint 9 (flat config) |
| Deployment  | gh-pages → GitHub Pages |

---

## Project Structure

```
src/
  pages/                # Astro pages (index, proyectos, servicios, equipo, contacto, 404)
  layouts/
    BaseLayout.astro    # Shared layout (head, navbar, footer)
  components/
    Navbar.astro        # Navbar component
    Footer.astro        # Footer component
  styles/
    global.css          # All styles (single stylesheet)
  scripts/
    animations.js       # GSAP card-grid animations + reduced-motion support
  assets/               # Images, logos, team photos
public/
  scripts/
    navbar.js           # Mobile hamburger menu, scroll styling, focus trap
  images/               # Public images
  .nojekyll             # Prevents Jekyll from ignoring _astro/ paths
astro.config.mjs        # Astro configuration
```

---

## Commands

| Command               | Description                              |
|-----------------------|------------------------------------------|
| `pnpm dev`            | Astro dev server                         |
| `pnpm build`          | Astro production build → `dist/`         |
| `pnpm preview`        | Preview production build                 |
| `pnpm lint`           | Run ESLint on JS files                   |
| `pnpm predeploy`      | Build before deploy                      |
| `pnpm deploy`         | Build + push `dist/` to `gh-pages` branch |

---

## Setup & Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Production build
pnpm build

# Lint
pnpm lint
```

---

## Deployment

The site deploys to GitHub Pages as a user/organisation site (`SansFrontieresGames.github.io`), served at the root path.

```bash
pnpm deploy
```

- Runs `astro build` then pushes `dist/` to the `gh-pages` branch with `--nojekyll`.
- `site` in `astro.config.mjs` is set to `https://SansFrontieresGames.github.io`.
- `base` is `'/'` (user/org site root).
- The `public/.nojekyll` file prevents Jekyll from ignoring `_astro/` directories.

---

## Architecture Notes

For detailed architecture, GSAP patterns, and development conventions, see [AGENTS.md](./AGENTS.md).
