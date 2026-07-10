import { Container } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../css/Admin.css';

function ReportesPowerBi() {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <Navbar brandName="Administración" />
      <main className="admin-content">
        <Container>
          <div className="admin-header">
            <div className="admin-header__top">
              <span className="admin-header__eyebrow">Reportes PowerBi</span>
              <button
                type="button"
                className="admin-header__back"
                onClick={() => navigate('/admin')}
              >
                <FaArrowLeft />
                <span>Volver</span>
              </button>
            </div>
            <h1>Reportes PowerBi</h1>
            <p>Administra los Reportes de PowerBi.</p>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default ReportesPowerBi;
