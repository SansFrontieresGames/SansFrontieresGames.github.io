# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment

This project is configured for GitHub Pages deployment as a user/org page at `https://SansFrontieresGames.github.io`.

### Build and deploy

1. Install dependencies:
   - `npm install`
2. Create a production build:
   - `npm run build`
3. Deploy to GitHub Pages:
   - `npm run deploy`

### Local preview

- Run `npm run preview` after `npm run build` to inspect the production output locally.

### Production notes

- The app uses `HashRouter` for client-side routing, which makes GitHub Pages navigation safe and avoids refresh/404 issues.
- Vite outputs production files into `dist/`, and `gh-pages` publishes that folder.
- `package.json` `homepage` is set to `https://SansFrontieresGames.github.io` for proper asset resolution on the live site.

### Future website deployment

- For later deployment to a standard website or custom domain, the same build process applies.
- If you move the app to a subpath, update `package.json` `homepage` and, if needed, add `base` to `vite.config.js`.
