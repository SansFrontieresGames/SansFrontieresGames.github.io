# AGENTS.md

## Language Rule
All communication, comments, and code must be in English only.

## Project overview

Astro website for Sans Frontieres, a game studio. Formerly React + Vite, fully migrated to Astro.

- **Entry point**: `src/pages/index.astro` via `src/layouts/BaseLayout.astro`
- **Build system**: Astro (static output)
- **Deployment**: GitHub Pages at `https://SansFrontieresGames.github.io`

## Core Rules

- If a task matches a skill, invoke it with the `skill` tool before acting.
- Skills are located in `.opencode/skills/<skill-name>/SKILL.md`.
- Follow the skill workflow strictly; do not partially apply it.
- Never skip required steps such as spec, plan, or test when a skill demands them.

## Commands

| Command | What it does |
|---|---|
| `pnpm run dev` / `pnpm dev` | Astro dev server |
| `pnpm run build` / `pnpm build` | Astro production build → `dist/` |
| `pnpm run preview` | Preview Astro production build |
| `pnpm run lint` | ESLint on all JS files |
| `pnpm run predeploy` | Build before deploy |
| `pnpm run deploy` / `pnpm deploy` | Build + push `dist/` to `gh-pages` branch (with `--nojekyll`) |

**No test runner configured.** There are no test scripts or test files.

## Key architectural facts

### Astro-only architecture

- All pages are `.astro` files under `src/pages/`
- Shared layout: `src/layouts/BaseLayout.astro` (wraps all pages with head, navbar, footer)
- Components: `src/components/` (Navbar.astro, Footer.astro)
- Global styles: `src/styles/global.css` (imported by `BaseLayout.astro`)
- Public assets: `public/` (images, scripts, `.nojekyll`) — copied verbatim to `dist/`

### Navbar

- **Navbar component**: `src/components/Navbar.astro` — Astro component with static links
- **Navbar JS**: `public/scripts/navbar.js` — vanilla JS for mobile hamburger menu toggle, scroll styling, focus trap
- Loaded via `<script src="/scripts/navbar.js" defer>` in `BaseLayout.astro`

### Styling

- Single global stylesheet: `src/styles/global.css`
- No Bootstrap, no React-specific CSS — all custom
- Google Fonts (Cinzel, Cinzel Decorative) loaded from CDN in `BaseLayout.astro`

### GSAP / Animation

- **GSAP** (`gsap` v3.15.0 with `ScrollTrigger`): Used via `<script>` modules in page-level `.astro` files (Servicios, Proyectos, Equipo) for scroll-triggered card animations.
- **Animation script**: `src/scripts/animations.js` exports `initCardGrid(gridSelector, cardSelector)`, which handles both standard and `prefers-reduced-motion: reduce` paths.
- **GSAP initialisation**: `gsap.registerPlugin(ScrollTrigger)` runs inside `animations.js`. Do not re-register globally.

#### Cards visibility pattern: CSS `visibility: hidden` + `gsap.from()`

Cards are hidden on page load via CSS (`global.css`):

```css
[data-cards-grid] [data-card] {
  visibility: hidden;
}
```

GSAP reveals them via `initCardGrid()`. The correct pattern is:

```js
// Always override visibility before gsap.from()
gsap.set(cards, { visibility: 'visible' })
gsap.from(cards, {
  autoAlpha: 0,
  y: 24,
  scale: 0.98,
  duration: 0.6,
  stagger: 0.12,
  ease: 'power2.out',
  scrollTrigger: { trigger: grid, start: 'top 75%', once: true },
})
```

#### Footgun: `gsap.from()` with pre-hidden elements

`gsap.from()` tweens FROM the provided state TO the element's computed CSS state at animation time. If the CSS sets `visibility: hidden`, the target state is hidden — so the element stays hidden after the tween completes.

| Approach | Safe? | Notes |
|---|---|---|
| `gsap.from(el, { autoAlpha: 0 })` after CSS `visibility: hidden` | broken | Target is computed `visibility: hidden` |
| `gsap.set(el, { visibility: 'visible' })` before `gsap.from()` | correct | Overrides CSS before tween reads computed state |
| `gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1 })` | correct | Explicitly defines both start and end states |
| Reduced-motion path: `el.style.visibility = 'visible'` | correct | Same fix for the reduced-motion branch |

**Rule of thumb:** When cards start with `visibility: hidden` in CSS, always `gsap.set()` visibility to `'visible'` before calling `gsap.from()`. Alternatively, use `gsap.fromTo()` with explicit start/end states to avoid depending on computed CSS at all.

### Vanilla JS scripts

- `public/scripts/navbar.js`: Mobile hamburger menu toggle, scroll-based navbar styling, focus trap for accessibility.
- `src/scripts/animations.js`: GSAP-based card grid animations with reduced-motion support.

### Astro config

- `astro.config.mjs`: `site: 'https://SansFrontieresGames.github.io'`, `base: '/'`, `output: 'static'`
- `.astro/` directory: Astro's internal cache/collections — do not delete.

### Package manager

Both `package-lock.json` and `pnpm-lock.yaml` exist. The `predeploy` and `deploy` scripts use `pnpm`, making it the preferred package manager.

### No TypeScript

The project is plain JavaScript. ESLint is configured for `*.js` only.

## ESLint

- Ignores `dist/`
- Unused vars are errors, except uppercase identifiers (`^[A-Z_]`), which are treated as intentional exports/constants
- Run with `pnpm lint`

## Deployment

`pnpm run deploy` runs `pnpm run build` then `gh-pages -d dist --nojekyll`. The built `dist/` is pushed to the `gh-pages` branch. Assets resolve relative to `https://SansFrontieresGames.github.io/` (configured via `site` in `astro.config.mjs`).

The `--nojekyll` flag and `public/.nojekyll` file prevent GitHub Pages from ignoring `_astro/` directories (Jekyll ignores underscore-prefixed paths by default).

### GitHub Pages note

This is a user/org site (`SansFrontieresGames.github.io`), served at the root path. `base: '/'` is correct. A 404 page is auto-generated by Astro.
