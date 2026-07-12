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

## Vistas — Análisis completo para diseño de base de datos

Cada vista se describe con su estado, datos que consume, operaciones CRUD, campos de formulario y relaciones con otras entidades.

---

### `Login.jsx` — Pública

| Ítem | Detalle |
|------|---------|
| **Estado** | `username`, `password`, `error`, `isSubmitting` |
| **Auth** | `useAuth().login()` — persiste en localStorage |
| **Datos** | `employees.json` → `usuarios[]` (archivo local) |
| **Lógica** | Busca `username` + `password` en el JSON; admin → `/home`, empleado → `/${empresa}` |
| **Form** | username (text), password (password) |

---

### `Home.jsx` — Admin only (`/home`)

| Ítem | Detalle |
|------|---------|
| **Estado** | Ninguno |
| **Datos** | Hardcoded: 4 tarjetas de navegación (3 empresas + admin) |
| **Lógica** | Solo enlaces; redirige a `/almasa`, `/colmena`, `/gyj`, `/admin` |

---

### `Admin.jsx` — Admin only (`/admin`)

| Ítem | Detalle |
|------|---------|
| **Estado** | Ninguno |
| **Datos** | Hardcoded: 6 tarjetas de navegación a módulos admin |
| **Lógica** | Enlaces a: Usuarios, Perfiles, Permisos, Reportes, Noticias, Áreas |

---

### `Usuarios.jsx` — Admin CRUD (`/admin/usuarios`)

| Ítem | Detalle |
|------|---------|
| **Estado** | `page`, `showModal`, `editUser`, `formData: { nombre, username, email, rol }` |
| **Mock** | `MOCK_USUARIOS`: 87 items |
| **CRUD** | Tabla paginada (10/pág). Modal crear/editar. Delete presente sin handler. Sin handler de guardado. |
| **Form** | nombre (text), username (text), email (email), rol (select: Admin/Editor/Lector) |

**Entidad: Usuario**

| Campo | Tipo | Notas |
|-------|------|-------|
| id | PK number | |
| nombre | string | Nombre completo |
| username | string | Único, login |
| email | string | |
| password | string | Solo en employees.json |
| cargo | string | Puesto laboral |
| empresa | FK string | "ALL" \| "almasa" \| "colmena" \| "gyj" |
| rol | enum | "admin" \| "empleado" (sistema) |
| fechaCreacion | datetime | |

---

### `Perfiles.jsx` — Admin CRUD (`/admin/perfiles`)

| Ítem | Detalle |
|------|---------|
| **Estado** | `page`, `selected`, `showForm`, `formData: { nombre, areas[], usuarios[] }`, `userSearch` |
| **Mock** | `MOCK_PERFILES`: 10; `ALL_AREAS`: 5; `ALL_USERS`: 34 nombres |
| **CRUD** | Paginado + panel detalle. Form crear/editar con chips multi-select. Save sin handler. |
| **Form** | nombre (text), áreas (chips toggle), usuarios (chips toggle + búsqueda) |

**Entidad: Perfil**

| Campo | Tipo | Notas |
|-------|------|-------|
| id | PK number | |
| nombre | string | Único, ej: "Administrador" |
| fechaCreacion | date | |

**Relaciones M:N**
- `Perfil_Area`: perfil_id ↔ area_id
- `Perfil_Usuario`: perfil_id ↔ usuario_id
- `Perfil_Permiso`: perfil_id ↔ permiso_id

---

### `Permisos.jsx` — Admin CRUD (`/admin/permisos`)

| Ítem | Detalle |
|------|---------|
| **Estado** | `page`, `selected`, `perfiles[]`, `showForm`, `editing`, `draftPermisos[]`, `formProfileId`, `formPermisos[]` |
| **Mock** | `ALL_PERMISOS`: 10; `INITIAL_PERFILES`: 10 con permisos[] |
| **CRUD** | Paginado + detalle con checkboxes. Edición inline con draft/cancelar. Crear nuevo: select perfil + toggle permisos. Delete sin handler. |
| **Form** | selector de perfil + checkboxes de permisos |

**Entidad: Permiso**

| Campo | Tipo | Notas |
|-------|------|-------|
| id | PK number | 1–10 |
| nombre | string | "Gestión de Usuarios", "Exportar Datos", etc. |

**Permisos del sistema (10):**
1. Gestión de Usuarios
2. Gestión de Perfiles
3. Gestión de Áreas
4. Gestión de Noticias
5. Gestión de Reportes
6. Visualizar Dashboard
7. Exportar Datos
8. Configuración del Sistema
9. Auditoría
10. Administración General

---

### `Noticias.jsx` — Admin CRUD (`/admin/noticias`)

| Ítem | Detalle |
|------|---------|
| **Estado** | `page`, `selected`, `showForm`, `formData: { titulo, contenido, imagenes[], empresas[] }`, `fileInputRef` |
| **Mock** | `MOCK_NOTICIAS`: 25; `MOCK_EMPRESAS`: 4 |
| **CRUD** | Paginado + detalle. Form crear/editar con checkboxes de empresas y subida de imágenes (múltiple, vista previa). Save y Delete sin handler. |
| **Form** | titulo (text), contenido (textarea 6 rows), empresas (checkboxes), imágenes (file input, multiple) |

**Entidad: Noticia**

| Campo | Tipo | Notas |
|-------|------|-------|
| id | PK number | |
| titulo | string | |
| contenido | text | Texto largo |
| resumen | string | |
| fecha | datetime | Publicación |
| imagen_urls | text[] \| JSON | O tabla separada |

**Entidad: Empresa**

| Campo | Tipo | Notas |
|-------|------|-------|
| id | PK number | |
| nombre | string | Nombre completo |
| nombreCorto | string | Único: "ALL", "almasa", "colmena", "gyj" |

**Relación M:N:** `Noticia_Empresa` — noticia_id ↔ empresa_id

**Entidad: Imagen** (tabla separada recomendada)

| Campo | Tipo |
|-------|------|
| id | PK |
| noticia_id | FK |
| nombre | string |
| url | string |
| archivo | blob (opcional) |

---

### `ReportesPowerBi.jsx` — Admin solo lectura (`/admin/reportes`)

| Ítem | Detalle |
|------|---------|
| **Estado** | `selected` |
| **Mock** | `MOCK_REPORTES`: 9 |
| **CRUD** | Solo lectura: lista + panel detalle |
| **Datos extra** | `usuarios[]` — nombres de usuarios con acceso |

**Entidad: Reporte**

| Campo | Tipo | Notas |
|-------|------|-------|
| id | PK number | |
| nombre | string | |
| descripcion | string | |
| fecha | datetime | |

**Relación M:N:** `Reporte_Usuario` — reporte_id ↔ usuario_id

---

### `Areas.jsx` — Admin CRUD (`/admin/areas`)

| Ítem | Detalle |
|------|---------|
| **Estado** | `page`, `selected`, `showForm`, `editData: { nombre }` |
| **Mock** | `MOCK_AREAS`: 5 |
| **CRUD** | Paginado + panel lateral. Form crear/editar inline (nombre). Save y Delete sin handler. |
| **Form** | nombre (text) |

**Entidad: Area**

| Campo | Tipo | Notas |
|-------|------|-------|
| id | PK number | |
| nombre | string | Único: "Contabilidad", "Produccion", "Comercial", "Marketing", "Talento Humano" |
| fechaCreacion | date | |

---

### `Colmena.jsx` / `Almasa.jsx` / `Gyj.jsx` — Dashboard por empresa

| Ítem | Detalle |
|------|---------|
| **Estado** | `areaActiva` (null o área) |
| **Mock** | 3 noticias + 3 reportes por empresa (hardcoded con mismos campos) |
| **Navegación** | Home (default) + 5 áreas: Contabilidad, Produccion, Comercial, Marketing, Talento Humano |
| **Sección Home** | Lista de noticias (`MOCK_NOTICIAS`) + reportes (`MOCK_REPORTES`) + novedades hardcoded |
| **Sub-vistas** | 5 componentes por empresa (15 total), cada uno con 4 KPIs hardcoded |

**Entidad: Indicador (KPI)** — para reemplazar datos mock de sub-vistas

| Campo | Tipo | Notas |
|-------|------|-------|
| id | PK number | |
| area_id | FK → Area.id | |
| empresa_id | FK → Empresa.id | |
| nombre | string | Métrica |
| valor | string | Valor formateado |
| periodo | string/date | Período del indicador |

**KPIs mock por área:**
| Área | KPIs |
|------|------|
| Contabilidad | Ingresos del mes, Egresos del mes, Margen bruto, Cuentas por cobrar |
| Produccion | Unidades producidas, Eficiencia, Tiempo muerto, Órdenes completadas |
| Comercial | Ventas del mes, Prospectos nuevos, Tasa de conversión, Ticket promedio |
| Marketing | Alcance orgánico, Inversión en ads, ROI campañas, Leads generados |
| Talento Humano | Plantilla activa, Rotación mensual, Horas capacitación, Satisfacción |

---

### `Navbar.jsx` — Componente global

| Ítem | Detalle |
|------|---------|
| **Props** | `brandName` (default "Home") |
| **Auth** | `useAuth()` → `user`, `logout()` |
| **Perfil** | Swal muestra: nombre, username, cargo, empresa (con label de `EMPRESA_LABELS`) |
| **Logout** | Limpia localStorage, redirige a `/` |

**EMPRESA_LABELS:**
- `ALL` → "Todas las empresas"
- `almasa` → "ALMASA"
- `colmena` → "COLMENA"
- `gyj` → "GYJ"

---

### Resumen de entidades y relaciones para base de datos

```
Usuario ──M:N── Perfil ──M:N── Permiso
  │                     │
  │                     └──M:N── Area
  │
  ├──M:N── Reporte
  │
  └──N:1── Empresa ──M:N── Noticia
                              │
                              └──1:N── Imagen

Area ──1:N── Indicador ──N:1── Empresa
```

**Tablas requeridas:**
1. `usuarios`
2. `empresas`
3. `areas`
4. `perfiles`
5. `permisos`
6. `perfil_area` (M:N)
7. `perfil_usuario` (M:N)
8. `perfil_permiso` (M:N)
9. `noticias`
10. `noticia_empresa` (M:N)
11. `noticia_imagen` (1:N)
12. `reportes`
13. `reporte_usuario` (M:N)
14. `indicadores`

## Estilo

- **Tema**: Amarillo (`#FFCC00`) / Negro (`#2A2A2B`) / Gris suave
- **Variables CSS** en `:root` via `index.css`
- **Fuentes**: Sora (headings, `--font-heading`), Inter (body, `--font-body`)
- **Diseño**: Responsivo con Bootstrap, bordes redondeados (`--radius-sm: 8px`, `--radius-md: 14px`), sombras suaves
- **Transiciones**: `200ms ease` (`--transition`)
- `prefers-reduced-motion` respetado
