import { FaNewspaper, FaChartBar, FaBell } from 'react-icons/fa';

const MOCK_NOTICIAS = [
  { titulo: 'Nuevo proyecto inmobiliario', fecha: '12 Jul 2026', resumen: 'GyJ inicia desarrollo de nuevo complejo habitacional en la zona norte.' },
  { titulo: 'Resultados semestrales', fecha: '06 Jul 2026', resumen: 'Crecimiento del 15% en ingresos comparado con el mismo período del año anterior.' },
  { titulo: 'Reconocimiento sectorial', fecha: '30 Jun 2026', resumen: 'GyJ recibe premio a la innovación en construcción sostenible.' },
];

const MOCK_REPORTES = [
  { nombre: 'Dashboard Proyectos', descripcion: 'Avance de obras y cumplimiento de hitos.' },
  { nombre: 'Dashboard Financiero', descripcion: 'Estado de resultados y rentabilidad por proyecto.' },
  { nombre: 'Dashboard Comercial', descripcion: 'Ventas y seguimiento de clientes potenciales.' },
];

function GeneralGyj() {
  return (
    <div className="general-dashboard">
      <div className="general-dashboard__header">
        <FaChartBar className="general-dashboard__header-icon" />
        <div>
          <h3 className="general-dashboard__header-title">Panel general GYJ</h3>
          <p className="general-dashboard__header-desc">Resumen ejecutivo con las últimas novedades y reportes disponibles.</p>
        </div>
      </div>

      <div className="general-dashboard__section">
        <div className="general-dashboard__section-title">
          <FaNewspaper /><span>Últimas noticias</span>
        </div>
        <div className="general-dashboard__cards">
          {MOCK_NOTICIAS.map((n, i) => (
            <div key={i} className="general-dashboard__card">
              <div className="general-dashboard__card-head">
                <span className="general-dashboard__card-title">{n.titulo}</span>
                <span className="general-dashboard__card-date">{n.fecha}</span>
              </div>
              <p className="general-dashboard__card-text">{n.resumen}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="general-dashboard__section">
        <div className="general-dashboard__section-title">
          <FaChartBar /><span>Reportes Power BI</span>
        </div>
        <div className="general-dashboard__cards">
          {MOCK_REPORTES.map((r, i) => (
            <div key={i} className="general-dashboard__card">
              <div className="general-dashboard__card-head">
                <span className="general-dashboard__card-title">{r.nombre}</span>
              </div>
              <p className="general-dashboard__card-text">{r.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="general-dashboard__section">
        <div className="general-dashboard__section-title">
          <FaBell /><span>Novedades</span>
        </div>
        <div className="general-dashboard__cards">
          <div className="general-dashboard__card general-dashboard__card--highlight">
            <div className="general-dashboard__card-head">
              <span className="general-dashboard__card-title">Nuevo proyecto habitacional</span>
            </div>
            <p className="general-dashboard__card-text">Inversión de $5M en desarrollo de 120 viviendas en sector premium.</p>
          </div>
          <div className="general-dashboard__card general-dashboard__card--highlight">
            <div className="general-dashboard__card-head">
              <span className="general-dashboard__card-title">Certificación sustentable</span>
            </div>
            <p className="general-dashboard__card-text">Proyectos obtienen certificación EDGE por eficiencia energética.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralGyj;
