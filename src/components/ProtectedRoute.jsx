import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function ProtectedRoute({ children, company, adminOnly = false }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const isAdmin = user?.rol === 'admin';

  if (adminOnly && !isAdmin) {
    return <Navigate to={`/${user.empresa}`} replace />;
  }

  if (company && !isAdmin && user?.empresa !== company) {
    return <Navigate to={`/${user.empresa}`} replace />;
  }

  return children;
}

export default ProtectedRoute;
