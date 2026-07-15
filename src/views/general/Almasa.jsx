import { FaNewspaper, FaChartBar, FaBell } from 'react-icons/fa';

const MOCK_NOTICIAS = [
  { titulo: 'Nueva actualización del sistema', fecha: '10 Jul 2026', resumen: 'Se han implementado mejoras en los reportes financieros.' },
  { titulo: 'Resultados del trimestre', fecha: '05 Jul 2026', resumen: 'ALMASA alcanzó un crecimiento del 12% en ingresos.' },
  { titulo: 'Nuevo dashboard operativo', fecha: '28 Jun 2026', resumen: 'Ya está disponible el tablero de producción en tiempo real.' },
];

const MOCK_REPORTES = [
  { nombre: 'Dashboard Ventas', descripcion: 'Reporte mensual de ventas por línea de producto.' },
  { nombre: 'Dashboard Producción', descripcion: 'Indicadores de eficiencia y productividad.' },
  { nombre: 'Dashboard Financiero', descripcion: 'Estado de resultados y flujo de caja.' },
];

function GeneralAlmasa() {
  return (
    <div className="general-dashboard">
      <div className="general-dashboard__header">
        <FaChartBar className="general-dashboard__header-icon" />
        <div>
          <h3 className="general-dashboard__header-title">Panel general ALMASA</h3>
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
              <span className="general-dashboard__card-title">Actualización de plataforma</span>
            </div>
            <p className="general-dashboard__card-text">Se ha actualizado la infraestructura de reportes para mejorar el tiempo de carga de los dashboards.</p>
          </div>
          <div className="general-dashboard__card general-dashboard__card--highlight">
            <div className="general-dashboard__card-head">
              <span className="general-dashboard__card-title">Nuevos indicadores disponibles</span>
            </div>
            <p className="general-dashboard__card-text">Se agregaron métricas de satisfacción al módulo de Talento Humano.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralAlmasa;
