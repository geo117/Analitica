import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalculator, FaIndustry, FaShoppingCart, FaBullhorn, FaUsers } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/useAuth';
import '../css/Company.css';

const AREAS = [
  { label: 'Contabilidad', icon: FaCalculator },
  { label: 'Producción', icon: FaIndustry },
  { label: 'Comercial', icon: FaShoppingCart },
  { label: 'Marketing', icon: FaBullhorn },
  { label: 'Talento Humano', icon: FaUsers },
];

function Colmena() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="company-page">
      <Navbar brandName="COLMENA" />

      <section className="company-content company-content--no-hero">
        <div className="company-content__top">
          <h2>Indicadores COLMENA</h2>
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
          Visualiza el desempeño y los indicadores clave de gestión de
          COLMENA. Próximamente encontrarás aquí tableros y reportes de
          inteligencia de negocios para esta marca.
        </p>
      </section>

      <section className="company-areas">
        <div className="company-areas__inner">
          {/*<h3 className="company-areas__title">Áreas</h3>*/}
          <div className="company-areas__grid">
            {AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <button key={area.label} type="button" className="area-badge">
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
    </div>
  );
}

export default Colmena;
