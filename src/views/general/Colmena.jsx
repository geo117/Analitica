import { FaNewspaper, FaChartBar, FaBell } from 'react-icons/fa';

const MOCK_NOTICIAS = [
  { titulo: 'Ampliación de planta', fecha: '08 Jul 2026', resumen: 'COLMENA inaugura nueva línea de producción en su planta central.' },
  { titulo: 'Certificación de calidad', fecha: '02 Jul 2026', resumen: 'La empresa obtiene certificación ISO 9001 en todos sus procesos.' },
  { titulo: 'Nuevo contrato comercial', fecha: '25 Jun 2026', resumen: 'Importante acuerdo con distribuidor internacional para exportación.' },
];

const MOCK_REPORTES = [
  { nombre: 'Dashboard Producción', descripcion: 'Métricas de producción y eficiencia operativa.' },
  { nombre: 'Dashboard Logística', descripcion: 'Indicadores de distribución y cadena de suministro.' },
  { nombre: 'Dashboard Calidad', descripcion: 'Reporte de control de calidad y certificaciones.' },
];

function GeneralColmena() {
  return (
    <div className="general-dashboard">
      <div className="general-dashboard__header">
        <FaChartBar className="general-dashboard__header-icon" />
        <div>
          <h3 className="general-dashboard__header-title">Panel general COLMENA</h3>
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
              <span className="general-dashboard__card-title">Nueva línea de producción</span>
            </div>
            <p className="general-dashboard__card-text">Inversión de $2M en maquinaria para aumentar capacidad productiva.</p>
          </div>
          <div className="general-dashboard__card general-dashboard__card--highlight">
            <div className="general-dashboard__card-head">
              <span className="general-dashboard__card-title">Misión comercial</span>
            </div>
            <p className="general-dashboard__card-text">Delegación viajará a Europa para rueda de negocios internacional.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralColmena;
