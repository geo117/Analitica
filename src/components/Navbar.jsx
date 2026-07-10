import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaIdBadge, FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useAuth } from '../context/useAuth';
import '../css/Navbar.css';

const EMPRESA_LABELS = {
  ALL: 'Todas las empresas',
  almasa: 'ALMASA',
  colmena: 'COLMENA',
  gyj: 'GYJ',
};

function Navbar({ brandName = 'Home' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const handleProfile = () => {
    Swal.fire({
      icon: 'info',
      title: user?.nombre ?? 'Usuario',
      html: `
        <p><strong>Usuario:</strong> ${user?.username ?? '-'}</p>
        <p><strong>Cargo:</strong> ${user?.cargo ?? '-'}</p>
        <p><strong>Empresa:</strong> ${EMPRESA_LABELS[user?.empresa] ?? user?.empresa ?? '-'}</p>
      `,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: 'rgb(255, 204, 0)',
      color: 'rgb(42, 42, 43)',
    });
  };

  return (
    <header className="app-navbar">
      <div className="app-navbar__brand">
        <span className="app-navbar__brand-mark" aria-hidden="true" />
        <span>{brandName}</span>
      </div>

      <Dropdown align="end">
        <Dropdown.Toggle as="button" className="app-navbar__user-toggle" id="user-menu">
          <FaUserCircle aria-hidden="true" size={20} />
          <span>{user?.username ?? 'Usuario'}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className="app-navbar__menu">
          <Dropdown.Item
            as="button"
            onClick={handleProfile}
            className="app-navbar__menu-item"
          >
            <FaIdBadge aria-hidden="true" />
            <span>Perfil</span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            as="button"
            onClick={handleLogout}
            className="app-navbar__menu-item app-navbar__menu-item--danger"
          >
            <FaSignOutAlt aria-hidden="true" />
            <span>Cerrar sesión</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
}

export default Navbar;
