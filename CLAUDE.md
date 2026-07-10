# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This is the frontend for a BI platform landing page ("plataforma_BI"), currently a fresh Vite + React scaffold — `src/App.jsx` still contains the default Vite template (counter demo, hero/React/Vite logos). No routes, pages, or BI-specific components have been built yet.

Brand assets already present in `src/assets/`: `ALMASA.jpg`, `COLMENA.jpg`, `GYJ.jpg`, `hero.png`.

## Commands

- `npm run dev` / `npm start` — start the Vite dev server with HMR
- `npm run build` — production build (output to `dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint over the project

There is no test runner configured.

## Stack & architecture

- **Build tool**: Vite 8, with `@vitejs/plugin-react` (Oxc-based) plus `@rolldown/plugin-babel` running the `reactCompilerPreset` — i.e. the React Compiler is enabled, so avoid manual memoization (`useMemo`/`useCallback`/`React.memo`) unless needed for correctness.
- **React 19**, entry point `src/main.jsx` renders `<App />` (in `StrictMode`) into `#root` from `index.html`.
- **Routing**: `react-router-dom` v7 is installed but not yet wired up — no router is configured in `main.jsx`/`App.jsx` yet.
- **UI libraries available**: `bootstrap` + `react-bootstrap` for layout/components, `react-icons` for icons, `sweetalert2` + `sweetalert2-react-content` for modal/alert dialogs.
- **Linting**: flat ESLint config (`eslint.config.js`) using `@eslint/js` recommended rules, `eslint-plugin-react-hooks` (flat recommended), and `eslint-plugin-react-refresh` (Vite preset). Applies to `**/*.{js,jsx}`, ignores `dist`.
- Static assets served from `public/` (`favicon.svg`, `icons.svg`) are referenced via absolute paths (e.g. `/icons.svg#documentation-icon`).
