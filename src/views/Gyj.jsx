import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaCalculator, FaIndustry, FaShoppingCart, FaBullhorn, FaUsers, FaNewspaper, FaChartBar, FaRocket, FaBell } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/useAuth';
import Contabilidad from './views gyj/Contabilidad';
import Produccion from './views gyj/Produccion';
import Comercial from './views gyj/Comercial';
import Marketing from './views gyj/Marketing';
import TalentoHumano from './views gyj/TalentoHumano';
import '../css/Company.css';

const MOCK_NOTICIAS = [
  { titulo: 'Expansión GYJ', fecha: '10 Jul 2026', resumen: 'Nueva planta de producción en el norte del país con capacidad del 30%.' },
  { titulo: 'Resultados del trimestre', fecha: '05 Jul 2026', resumen: 'GYJ alcanzó ingresos récord superando los $3.2M en el segundo trimestre.' },
  { titulo: 'Innovación tecnológica', fecha: '28 Jun 2026', resumen: 'Se implementó un nuevo sistema ERP para la gestión integral de la empresa.' },
];

const MOCK_REPORTES = [
  { nombre: 'Dashboard Ventas GYJ', descripcion: 'Reporte ejecutivo de ventas por unidad de negocio.' },
  { nombre: 'Dashboard Financiero', descripcion: 'Indicadores financieros y de rentabilidad.' },
  { nombre: 'Dashboard Proyectos', descripcion: 'Seguimiento de proyectos y avances por área.' },
];

const AREAS = [
  { label: 'Contabilidad', icon: FaCalculator, component: Contabilidad },
  { label: 'Producción', icon: FaIndustry, component: Produccion },
  { label: 'Comercial', icon: FaShoppingCart, component: Comercial },
  { label: 'Marketing', icon: FaBullhorn, component: Marketing },
  { label: 'Talento Humano', icon: FaUsers, component: TalentoHumano },
];

function Gyj() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [areaActiva, setAreaActiva] = useState(null);

  const AreaComponent = areaActiva?.component;

  return (
    <div className="company-page">
      <Navbar brandName="GYJ" />

      <section className="company-content company-content--no-hero">
        <div className="company-content__top">
          <h2>Indicadores GYJ</h2>
          {user?.rol === 'admin' && (
            <button
              type="button"
              className="company-back-btn"
              onClick={() => navigate('/home')}
            >
              <FaArrowLeft />
              <span>Volver</span>
            </button>
          )}
        </div>
        <p>
          Visualiza el desempeño y los indicadores clave de gestión de GYJ.
          Próximamente encontrarás aquí tableros y reportes de inteligencia
          de negocios para esta marca.
        </p>
      </section>

      <section className="company-areas">
        <div className="company-areas__inner">
          <div className="company-areas__grid">
            <button
              type="button"
              className={`area-badge${!areaActiva ? ' area-badge--active' : ''}`}
              onClick={() => setAreaActiva(null)}
            >
              <span className="area-badge__icon">
                <FaHome />
              </span>
              <span className="area-badge__label">Home</span>
            </button>
            {AREAS.map((area) => {
              const Icon = area.icon;
              const isActive = areaActiva?.label === area.label;
              return (
                <button
                  key={area.label}
                  type="button"
                  className={`area-badge${isActive ? ' area-badge--active' : ''}`}
                  onClick={() => setAreaActiva(area)}
                >
                  <span className="area-badge__icon">
                    <Icon />
                  </span>
                  <span className="area-badge__label">{area.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="company-dashboard">
        <div className="company-dashboard__inner">
          {AreaComponent ? (
            <AreaComponent />
          ) : (
            <>
              <div className="company-dashboard__header">
                <FaRocket className="company-dashboard__header-icon" />
                <div>
                  <h3 className="company-dashboard__header-title">Panel general GYJ</h3>
                  <p className="company-dashboard__header-desc">
                    Resumen ejecutivo con las últimas novedades y reportes disponibles.
                  </p>
                </div>
              </div>

              <div className="company-dashboard__section">
                <div className="company-dashboard__section-title">
                  <FaNewspaper />
                  <span>Últimas noticias</span>
                </div>
                <div className="company-dashboard__cards">
                  {MOCK_NOTICIAS.map((n, i) => (
                    <div key={i} className="company-dashboard__card">
                      <div className="company-dashboard__card-head">
                        <span className="company-dashboard__card-title">{n.titulo}</span>
                        <span className="company-dashboard__card-date">{n.fecha}</span>
                      </div>
                      <p className="company-dashboard__card-text">{n.resumen}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="company-dashboard__section">
                <div className="company-dashboard__section-title">
                  <FaChartBar />
                  <span>Reportes Power BI</span>
                </div>
                <div className="company-dashboard__cards">
                  {MOCK_REPORTES.map((r, i) => (
                    <div key={i} className="company-dashboard__card">
                      <div className="company-dashboard__card-head">
                        <span className="company-dashboard__card-title">{r.nombre}</span>
                      </div>
                      <p className="company-dashboard__card-text">{r.descripcion}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="company-dashboard__section">
                <div className="company-dashboard__section-title">
                  <FaBell />
                  <span>Novedades</span>
                </div>
                <div className="company-dashboard__cards">
                  <div className="company-dashboard__card company-dashboard__card--highlight">
                    <div className="company-dashboard__card-head">
                      <span className="company-dashboard__card-title">Nueva sede corporativa</span>
                    </div>
                    <p className="company-dashboard__card-text">
                      GYJ inauguró nuevas oficinas corporativas con capacidad para 150 colaboradores.
                    </p>
                  </div>
                  <div className="company-dashboard__card company-dashboard__card--highlight">
                    <div className="company-dashboard__card-head">
                      <span className="company-dashboard__card-title">Alianza estratégica</span>
                    </div>
                    <p className="company-dashboard__card-text">
                      Se firmó una alianza con un socio tecnológico para digitalizar procesos administrativos.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Gyj;
