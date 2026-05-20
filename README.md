# Sans Frontieres — Game Studio Website

Sitio web oficial de **Sans Frontieres**, un estudio de videojuegos independiente con sede en Costa Rica. Construido con React + Vite, en proceso de migración a Astro.

**Live site:** [SansFrontieresGames.github.io](https://SansFrontieresGames.github.io)

---

## Tech Stack

| Categoria | Tecnologia |
|-----------|------------|
| Framework | React 19 |
| Build | Vite (`rolldown-vite` 7) |
| Migracion | Astro 4 (en progreso) |
| Routing | react-router-dom (`HashRouter`) |
| Estilos | Bootstrap 5, CSS modules |
| Animacion | framer-motion, GSAP |
| Linting | ESLint 9 (flat config) |
| Deploy | gh-pages → GitHub Pages |

---

## Estructura del proyecto

```
src/
  main.jsx             # Punto de entrada React + HashRouter
  App.jsx              # Componente raiz con rutas
  index.css            # Reset y estilos base
  global.css           # Estilos globales legacy (React)
  components/
    Navbar/            # Navbar React (activo)
    Navbar.astro       # Navbar Astro (migracion)
    Hero/              # Hero animado con GSAP
    TabContent/        # Componente de tabs
  pages/
    index.astro        # Homepage Astro (migracion)
    Home/              # Homepage React
    Proyectos/         # Portafolio de proyectos
    Servicios/         # Servicios del estudio
    Contacto/          # Formulario de contacto
    Equipo/            # Miembros del equipo
  layouts/
    BaseLayout.astro   # Layout base Astro
  scripts/
    navbar.js          # Script vanilla para menu mobile
  styles/
    global.css         # Estilos globales Astro
  assets/Imagenes/     # Fotos del equipo y logos
public/                # Assets estaticos
```

---

## Comandos

| Comando | Descripcion |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo Vite (React) |
| `pnpm build` | Build de produccion Vite → `dist/` |
| `pnpm preview` | Previsualizar build de produccion |
| `pnpm lint` | Ejecutar ESLint |
| `pnpm deploy` | Build + deploy a GitHub Pages |
| `pnpm astro:dev` | Servidor de desarrollo Astro |
| `pnpm astro:build` | Build de produccion Astro |
| `pnpm astro:preview` | Previsualizar build Astro |

---

## Instalacion y desarrollo

```bash
# Instalar dependencias
pnpm install

# Desarrollo (React)
pnpm dev

# Build de produccion
pnpm build

# Lint
pnpm lint
```

---

## Deployment

El sitio se despliega en GitHub Pages como pagina de usuario/organizacion.

```bash
pnpm deploy
```

Este comando ejecuta `pnpm build` y luego publica `dist/` en la rama `gh-pages`.

- Se usa `HashRouter` para evitar errores 404 en GitHub Pages.
- La propiedad `homepage` en `package.json` apunta a `https://SansFrontieresGames.github.io`.
- Vite y Astro usan `base: '/'`.

---

## Migracion a Astro

El proyecto esta migrando de React a Astro. La migracion se encuentra en la rama `Astro-Dev`. Consulta [AGENTS.md](./AGENTS.md) para mas detalles sobre la arquitectura dual.
