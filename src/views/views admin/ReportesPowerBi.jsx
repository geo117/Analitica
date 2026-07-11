import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaChartBar, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../css/Admin.css';
import '../../css/css admin/ReportesPowerBi.css';

const MOCK_REPORTES = [
  { id: 1, nombre: 'Dashboard Ventas', fecha: '2025-06-15', usuarios: ['Carlos López', 'María García', 'José Martínez'] },
  { id: 2, nombre: 'Reporte Financiero', fecha: '2025-06-10', usuarios: ['Laura Sánchez', 'Pedro Ramírez'] },
  { id: 3, nombre: 'Análisis de Producción', fecha: '2025-05-28', usuarios: ['Ana Torres', 'Diego Fernández', 'Sofía Ruiz', 'Roberto Díaz'] },
  { id: 4, nombre: 'Métrica Comercial', fecha: '2025-06-01', usuarios: ['Elena Gómez', 'Fernando Castro'] },
  { id: 5, nombre: 'Indicadores RH', fecha: '2025-06-12', usuarios: ['Lucía Morales', 'Gabriela Ortiz', 'Héctor Vargas'] },
  { id: 6, nombre: 'Panel Marketing', fecha: '2025-05-20', usuarios: ['Patricia Mendoza', 'Mario Jiménez', 'Daniela Ríos'] },
  { id: 7, nombre: 'Logística y Distribución', fecha: '2025-06-08', usuarios: ['Andrea Campos', 'Ricardo Peña'] },
  { id: 8, nombre: 'Calidad de Producto', fecha: '2025-06-05', usuarios: ['Valentina Flores', 'Sebastián Vega', 'Fernanda Soto'] },
  { id: 9, nombre: 'Presupuesto Anual', fecha: '2025-05-15', usuarios: ['Emilio Rivas', 'Camila Navarro', 'Guillermo Herrera'] },
];

function ReportesPowerBi() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <div className="admin-page">
      <Navbar brandName="Administración" />
      <main className="admin-content">
        <Container>
          <div className="admin-header">
            <div className="admin-header__top">
              <h3>Reportes PowerBi</h3>
              <button
                type="button"
                className="admin-header__back"
                onClick={() => navigate('/admin')}
              >
                <FaArrowLeft />
                <span>Volver</span>
              </button>
            </div>
            <p>Selecciona un reporte para ver su información.</p>
          </div>

          <Row className="reportes-layout">
            <Col xs={12} lg={7} className="reportes-col-left">
              <div className="reportes-grid">
                {MOCK_REPORTES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`reportes-card ${selected?.id === r.id ? 'reportes-card--active' : ''}`}
                    onClick={() => setSelected(r)}
                  >
                    <FaChartBar className="reportes-card__icon" />
                    <span className="reportes-card__name">{r.nombre}</span>
                  </button>
                ))}
              </div>
            </Col>

            <Col xs={12} lg={5} className="reportes-col-right">
              <div className="reportes-detail">
                {selected ? (
                  <>
                    <h4 className="reportes-detail__title">{selected.nombre}</h4>

                    <div className="reportes-detail__row">
                      <FaCalendarAlt className="reportes-detail__row-icon" />
                      <div className="reportes-detail__row-content">
                        <span className="reportes-detail__label">Fecha de publicación</span>
                        <span className="reportes-detail__value">{selected.fecha}</span>
                      </div>
                    </div>

                    <div className="reportes-detail__row">
                      <FaUser className="reportes-detail__row-icon" />
                      <div className="reportes-detail__row-content">
                        <span className="reportes-detail__label">Usuarios con acceso ({selected.usuarios.length})</span>
                      </div>
                    </div>

                    <div className="reportes-detail__users">
                      {selected.usuarios.map((u) => (
                        <div key={u} className="reportes-detail__user">
                          <FaUser className="reportes-detail__user-icon" />
                          <span>{u}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="reportes-detail__empty">
                    <FaChartBar size={40} />
                    <p>Selecciona un reporte para ver su información</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default ReportesPowerBi;
