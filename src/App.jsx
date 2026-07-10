import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './views/Login';
import Home from './views/Home';
import Colmena from './views/Colmena';
import Almasa from './views/Almasa';
import Gyj from './views/Gyj';
import Admin from './views/Admin';
import Usuarios from './views/views admin/Usuarios';
import ReportesPowerBi from './views/views admin/ReportesPowerBi';
import Perfiles from './views/views admin/Perfiles';
import Permisos from './views/views admin/Permisos';
import Noticias from './views/views admin/Noticias';
import Areas from './views/views admin/Areas';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute adminOnly>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/colmena"
          element={
            <ProtectedRoute company="colmena">
              <Colmena />
            </ProtectedRoute>
          }
        />
        <Route
          path="/almasa"
          element={
            <ProtectedRoute company="almasa">
              <Almasa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gyj"
          element={
            <ProtectedRoute company="gyj">
              <Gyj />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute adminOnly>
              <Usuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reportes"
          element={
            <ProtectedRoute adminOnly>
              <ReportesPowerBi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/perfiles"
          element={
            <ProtectedRoute adminOnly>
              <Perfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/permisos"
          element={
            <ProtectedRoute adminOnly>
              <Permisos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/noticias"
          element={
            <ProtectedRoute adminOnly>
              <Noticias />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/areas"
          element={
            <ProtectedRoute adminOnly>
              <Areas />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
