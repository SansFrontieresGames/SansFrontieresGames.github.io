# Astro Migration Plan

Migracion completa del sitio web Sans Frontieres de React + Vite a Astro.
**Objetivo:** Sitio 100% funcional, accesible, responsive y liviano. 0 issues.

---

## Estado actual

| Elemento | Estado |
|----------|--------|
| Rama activa | `Astro-Dev` (cambios sin commit) |
| Build activo | React + Vite (`pnpm dev`) |
| Paginas Astro existentes | Solo homepage (`index.astro`) |
| Integracion `@astrojs/react` | No instalada |
| CSS | 3 archivos globales con reglas solapadas |
| Bootstrap | Cargado doble (npm en React, CDN en Astro) |
| Accesibilidad | Cero features implementadas |
| Imagenes faltantes | 4/8 fotos de equipo, 4/4 imagenes de proyectos |

---

## Estrategia

**Full Astro + vanilla JS + GSAP. Eliminar React completamente.**

| Antes (React) | Despues (Astro) |
|---------------|-----------------|
| framer-motion animaciones | CSS animations + GSAP ScrollTrigger |
| HashRouter SPA | Astro View Transitions (MPA con SPA-like nav) |
| Bootstrap via npm + CDN | Solo via npm |
| 3 global CSS | 1 `global.css` consolidado |
| React state (form) | Vanilla JS |
| `import.meta.glob` (imagenes) | Astro `import.meta.glob` (nativo) |
| `useEffect` scroll listeners | Vanilla JS en `<script client:load>` |

---

## Arquitectura destino

```
src/
├── layouts/
│   └── BaseLayout.astro          # Shell HTML: fonts, meta, CSS global, skip link
├── components/
│   ├── Navbar.astro              # HTML estatico + vanilla JS (client:load)
│   ├── Footer.astro              # Footer del sitio
│   ├── Hero.astro                # Hero con GSAP
│   ├── CardGrid.astro            # Grid reutilizable (Proyectos/Servicios/Equipo)
│   ├── ProjectCard.astro         # Card de proyecto individual
│   ├── ServiceCard.astro         # Card de servicio
│   ├── TeamCard.astro            # Card de miembro del equipo
│   └── ContactForm.astro         # Formulario con vanilla JS + validacion
├── pages/
│   ├── index.astro               # Homepage (orbs, hero, CTA)
│   ├── proyectos.astro           # Portafolio de proyectos
│   ├── servicios.astro           # Grid de servicios
│   ├── contacto.astro            # Formulario + info de contacto
│   ├── equipo.astro              # Grid del equipo
│   └── 404.astro                 # Pagina 404 personalizada
├── scripts/
│   ├── navbar.js                 # Menu mobile, scroll, Escape, focus trap
│   ├── animations.js             # GSAP ScrollTrigger compartido
│   └── contact-form.js           # Validacion + submit del formulario
├── styles/
│   └── global.css                # Consolidado: reset, tipografia, componentes, utilidades, responsive
└── assets/
    └── Imagenes/                 # Fotos del equipo (completar las 4 faltantes)
```

---

## Fases

### Fase 1 — Desbloquear migracion

- [x] Identificar issues del codigo actual
- [x] Instalar `@astrojs/react` para renderizar paginas React existentes como islands
- [x] Corregir ruta del logo en `Navbar.astro` (`src/assets/logo.png`)
- [x] Agregar imagenes faltantes de proyectos (`public/img/proyecto1-4.jpg`)
- [x] Agregar fotos faltantes del equipo (Kendall, Kender, Daniela, Allison)

### Fase 2 — Construir paginas Astro

Patron por pagina: `.astro` importa componentes con `client:load` para los interactivos.
Datos como objetos/arrays inline en frontmatter (sin CMS).

- [x] **Proyectos** — GSAP ScrollTrigger stagger. Cards con CSS hover/tap. Pulse via CSS animation.
- [x] **Homepage** — Orbs con CSS animation. Hero con GSAP stagger. CTA con CSS hover/tap.
- [x] **Servicios** — Mismo patron que Proyectos.
- [x] **Contacto** — Vanilla JS form con HTML5 validation + `aria-live` para errores. Links sociales con `rel="noopener noreferrer"`.
- [x] **Equipo** — Astro `import.meta.glob` para imagenes. Mismo patron de cards.
- [x] **404** — Pagina simple con link de regreso al home.

### Fase 3 — Accesibilidad (WCAG 2.2 AA)

| Requisito | Implementacion |
|-----------|---------------|
| Skip link | `<a href="#main-content" class="skip-link">Saltar al contenido</a>` |
| Landmarks | `<header>`, `<nav aria-label="Principal">`, `<main id="main-content">`, `<footer>` |
| Heading hierarchy | h1 → h2 → h3, nunca saltar niveles |
| Focus visible | `:focus-visible` con anillo personalizado, `scroll-margin-top` para sticky nav |
| Focus trap | Menu mobile: foco atrapado mientras este abierto |
| Target size | Todo elemento interactivo ≥ 44×44px |
| Reduced motion | `prefers-reduced-motion: reduce` elimina todas las animaciones |
| Form labels | Todo input tiene `<label>` con `for`/`id`. Errores usan `aria-describedby` |
| Color contrast | Dorado `#d4b06a` sobre oscuro `#0b0b0d` = 4.86:1 (pasa AA). Verificar estados hover |
| Alt text | Todas las imagenes con `alt` descriptivo. Orbs decorativos con `alt=""` + `aria-hidden="true"` |
| Idioma | `<html lang="es">` (ya presente) |
| ARIA | `aria-current="page"` en link activo, `aria-label` en botones solo-icono, `aria-live="polite"` en mensajes del form, `aria-expanded` en hamburger |

### Fase 4 — Auditoria responsive

Breakpoints actuales a mantener:
| Breakpoint | Dispositivo |
|------------|-------------|
| 1024px | Desktop medio |
| 900px | Trigger del navbar hamburger |
| 768px | Tablet |
| 480px | Mobile pequeno |
| 380px | Mobile mini |

Mejoras:
- [x] Usar `clamp()` para tipografia fluida (evitar breakpoints discretos donde sea posible)
- [x] Probar en 320px, 375px, 414px, 768px, 1024px, 1280px, 1440px
- [x] Verificar 0 scroll horizontal en todos los viewports
- [x] Cards con `min()` + `auto-fit` para grids realmente fluidos

### Fase 5 — Consolidar CSS

Un solo archivo `src/styles/global.css` con:
1. CSS custom properties (colores, espaciado, tipografia)
2. Reset/base
3. Tipografia (Cinzel, headings, body)
4. Layout utilities (container, grid, sections)
5. Estilos de componentes (navbar, cards, forms, hero, orbs)
6. Utilidades (`.visually-hidden`, `.skip-link`)
7. Breakpoints responsive
8. Reduced motion
9. Estilos del scrollbar

Eliminar: `src/index.css`, `src/global.css`, `src/App.css`, CSS individuales de paginas.

### Fase 6 — Eliminar React

- [x] Desinstalar `react`, `react-dom`, `react-router-dom`, `framer-motion`
- [x] Desinstalar `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- [x] Remover override de `vite` (rolldown-vite)
- [x] Remover scripts de Vite de `package.json`
- [x] Actualizar `eslint.config.js` para vanilla JS
- [x] Eliminar `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`
- [x] Eliminar CSS legacy (`src/global.css`, `src/index.css`, `src/App.css`)
- [x] Eliminar componentes muertos (`Hero/`, `TabContent/`)
- [x] Eliminar navbar React (`src/components/Navbar/Navbar.jsx`, `Navbar.css`)
- [x] Eliminar paginas React (`src/pages/Home/`, `Proyectos/`, `Servicios/`, `Contacto/`, `Equipo/`)

### Fase 7 — Verificar deploy

- [x] `astro build` genera `dist/` limpio
- [x] `astro preview` sirve correctamente
- [x] Probar todas las rutas como `.html`
- [x] Verificar `base: '/'` resuelve todos los assets
- [x] Ejecutar `pnpm deploy` a GitHub Pages
- [x] Merge de `Astro-Dev` a `main`

---

## Riesgos y mitigaciones

| Riesgo | Mitigacion |
|--------|------------|
| GSAP causa layout shift al cargar | Inicializar con `opacity: 0`, revelar en `DOMContentLoaded` |
| View Transitions rompen scroll state | `transition:persist` en navbar, `data-astro-transition-scope` donde necesario |
| Imagenes faltantes rompen cards | Placeholder condicional en frontmatter de Astro |
| Spam en formulario (demo) | Honeypot field + validacion client-side |
| Menu mobile no accesible | Focus trap, tecla Escape, `aria-expanded` toggle |
| Bootstrap CSS conflictos | Cargar una sola vez desde npm, remover CDN |

---

## Notas

- Las animaciones GSAP se inicializan en `<script client:load>` para ejecutarse solo en el cliente
- Los orbs decorativos usan CSS `@keyframes` (sin JS)
- Las cards usan CSS `:hover`/`:active` para efectos (sin JS)
- Astro View Transitions dan navegacion fluida entre paginas sin SPA
- El formulario de contacto es demo — muestra confirmacion pero no envia datos (mantener comportamiento actual)
- Bootstrap se importa desde npm en `BaseLayout.astro` (no CDN)
