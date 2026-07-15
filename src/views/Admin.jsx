import { Container, Row, Col } from 'react-bootstrap';
import { FaUsers, FaChartBar, FaIdBadge, FaLock, FaNewspaper, FaTags, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/Admin.css';

const ADMIN_ACTIONS = [
  { label: 'Usuarios', icon: FaUsers, desc: 'Gestiona los usuarios del sistema', path: '/admin/usuarios' },
  { label: 'Perfiles', icon: FaIdBadge, desc: 'Configura los perfiles de acceso', path: '/admin/perfiles' },
  { label: 'Permisos', icon: FaLock, desc: 'Asigna permisos a los perfiles', path: '/admin/permisos' },
  { label: 'Reportes PowerBi', icon: FaChartBar, desc: 'Administra los Reportes de PowerBi', path: '/admin/reportes' },
  { label: 'Noticias', icon: FaNewspaper, desc: 'Publica y edita noticias', path: '/admin/noticias' },
  { label: 'Areas', icon: FaTags, desc: 'Administra las areas', path: '/admin/areas' },
];

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <Navbar brandName="Administración" />
      <main className="admin-content">
        <Container>
          <div className="admin-header">
            <div className="admin-header__box">
              <div className="admin-header__top">
                <h2>Administración</h2>
                <button
                  type="button"
                  className="admin-header__back"
                  onClick={() => navigate('/home')}
                >
                  <FaArrowLeft />
                  <span>Volver</span>
                </button>
              </div>
              <p>Selecciona un módulo para gestionar la plataforma.</p>
            </div>
          </div>
          <Row className="admin-grid">
            {ADMIN_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Col key={action.label} xs={12} sm={6} md={4} className="admin-grid__col">
                  <button type="button" className="admin-badge" onClick={() => navigate(action.path)}>
                    <span className="admin-badge__icon">
                      <Icon />
                    </span>
                    <span className="admin-badge__info">
                      <span className="admin-badge__label">{action.label}</span>
                      <span className="admin-badge__desc">{action.desc}</span>
                    </span>
                  </button>
                </Col>
              );
            })}
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Admin;
