# CLAUDE.md

Guía para Claude Code al trabajar con este frontend.

## Estado del proyecto

Frontend de la plataforma BI ("plataforma_BI") — SPA con autenticación, panel administrativo completo y vistas por empresa. La mayoría de módulos están construidos con datos mock (sin integración API real). Tres dashboards de empresa son placeholders.

## Comandos

- `npm run dev` / `npm start` — servidor de desarrollo Vite con HMR
- `npm run build` — build producción (output en `dist/`)
- `npm run preview` — previsualizar build producción
- `npm run lint` — ESLint sobre el proyecto

Sin test runner configurado.

## Stack & dependencias

### Build
- **Vite 8** + `@vitejs/plugin-react` v6 con React Compiler habilitado vía `@rolldown/plugin-babel` con preset `reactCompilerPreset`.
- Entrada: `index.html` → `/src/main.jsx`.
- Fuentes Google Fonts: **Sora** (headings) e **Inter** (body) precargadas en `index.html`.

### React & routing
- **React 19**, `react-dom` 19, `react-router-dom` v7
- Entry: `src/main.jsx` renderiza `<App />` envuelto en `<BrowserRouter>` y `StrictMode`
- Bootstrap CSS importado globalmente desde `main.jsx`: `bootstrap/dist/css/bootstrap.min.css`
- CSS global: `src/index.css` con variables CSS (tema amarillo/negro), reset y estilos base

### UI
- `bootstrap` ^5.3.8 + `react-bootstrap` ^2.10.10 (layout, navbar, dropdown, pagination)
- `react-icons` (FaArrowLeft, FaPlus, FaEdit, FaTrashAlt, FaNewspaper, FaSave, FaTimes, FaImage, FaUserCircle, FaIdBadge, FaSignOutAlt, etc.)
- `sweetalert2` + `sweetalert2-react-content` para diálogos y modales

### Linting
- **ESLint** v10 flat config (`eslint.config.js`)
- Plugins: `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- Ignores: `dist/`
- JSX habilitado, globals browser

## Enrutamiento (`src/App.jsx`)

14 rutas definidas, todas envueltas en `<AuthProvider>`:

| Ruta | Componente | Protección |
|------|-----------|------------|
| `/` | Login | Pública |
| `/home` | Home | Admin only |
| `/colmena` | Colmena | Empresa colmena |
| `/almasa` | Almasa | Empresa almasa |
| `/gyj` | Gyj | Empresa gyj |
| `/admin` | Admin | Admin only |
| `/admin/usuarios` | Usuarios | Admin only |
| `/admin/reportes` | ReportesPowerBi | Admin only |
| `/admin/perfiles` | Perfiles | Admin only |
| `/admin/permisos` | Permisos | Admin only |
| `/admin/noticias` | Noticias | Admin only |
| `/admin/areas` | Areas | Admin only |
| `*` | Redirect a `/` | — |

**Protección de rutas**: `ProtectedRoute.jsx` verifica `isAuthenticated` del contexto. Si `adminOnly=true` y el usuario no es admin, redirige a su empresa. Si `company` está definida y no coincide con el usuario (y no es admin), redirige a su empresa.

## Auth (`src/context/`)

- `AuthContextBase.js` — crea el `AuthContext` con `createContext(null)`
- `AuthContext.jsx` — `AuthProvider` con estado `user` persistido en `localStorage('session_user')`. Provee `user`, `isAuthenticated`, `login(userData)`, `logout()`. Al hacer login guarda el objeto completo excepto `password`.
- `useAuth.js` — hook custom que consume `AuthContext`, lanza error si se usa fuera de `AuthProvider`.

Login autentica contra `employees.json` en `src/database/`.

## Estructura del proyecto

```
frontend/
├── index.html                     # Entry HTML con Google Fonts
├── vite.config.js                 # Vite + React + Babel Compiler
├── eslint.config.js               # ESLint flat config
├── package.json
├── src/
│   ├── main.jsx                   # Mount point con BrowserRouter + StrictMode
│   ├── App.jsx                    # Routes
│   ├── index.css                  # Variables CSS, reset, estilos globales
│   ├── assets/                    # Imágenes de marca
│   │   ├── admin.png
│   │   ├── ALMASA.jpg
│   │   ├── COLMENA.jpg
│   │   └── GYJ.jpg
│   ├── components/
│   │   ├── Navbar.jsx             # Navbar con dropdown perfil/logout
│   │   └── ProtectedRoute.jsx     # Guard de rutas
│   ├── context/
│   │   ├── AuthContextBase.js     # createContext
│   │   ├── AuthContext.jsx        # AuthProvider (persistencia localStorage)
│   │   └── useAuth.js            # Hook useAuth
│   ├── views/
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── Admin.jsx
│   │   ├── Colmena.jsx
│   │   ├── Almasa.jsx
│   │   └── Gyj.jsx
│   ├── views/views admin/        # Módulos admin (todos con datos mock)
│   │   ├── Usuarios.jsx
│   │   ├── ReportesPowerBi.jsx
│   │   ├── Perfiles.jsx
│   │   ├── Permisos.jsx
│   │   ├── Noticias.jsx
│   │   └── Areas.jsx
│   ├── css/
│   │   ├── Navbar.css
│   │   ├── Login.css
│   │   ├── Home.css
│   │   ├── Admin.css
│   │   ├── Company.css
│   │   └── css admin/
│   │       ├── Usuarios.css
│   │       ├── ReportesPowerBi.css
│   │       ├── Perfiles.css
│   │       ├── Permisos.css
│   │       ├── Noticias.css
│   │       └── Areas.css
```

## Estilo

- **Tema**: Amarillo (`#FFCC00`) / Negro (`#2A2A2B`) / Gris suave
- **Variables CSS** en `:root` via `index.css`
- **Fuentes**: Sora (headings, `--font-heading`), Inter (body, `--font-body`)
- **Diseño**: Responsivo con Bootstrap, bordes redondeados (`--radius-sm: 8px`, `--radius-md: 14px`), sombras suaves
- **Transiciones**: `200ms ease` (`--transition`)
- `prefers-reduced-motion` respetado
