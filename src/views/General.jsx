import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaIndustry, FaHardHat, FaTractor } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import GeneralAlmasa from './general/Almasa';
import GeneralColmena from './general/Colmena';
import GeneralGyj from './general/Gyj';
import '../css/General.css';

const COMPANIES = [
  { label: 'ALMASA', icon: FaIndustry, component: GeneralAlmasa },
  { label: 'COLMENA', icon: FaTractor, component: GeneralColmena },
  { label: 'GYJ', icon: FaHardHat, component: GeneralGyj },
];

function General() {
  const navigate = useNavigate();
  const [empresaActiva, setEmpresaActiva] = useState(null);

  const CompanyComponent = empresaActiva?.component;

  return (
    <div className="general-page">
      <Navbar brandName="General" />

      <section className="general-content">
        <div className="general-content__box">
          <div className="general-content__top">
            <h3>Vista General de Empresas</h3>
            <button type="button" className="general-back-btn" onClick={() => navigate('/home')}>
              <FaArrowLeft /><span>Volver</span>
            </button>
          </div>
          <p>Selecciona una empresa para ver su información general y reportes disponibles.</p>
        </div>
      </section>

      <section className="general-companies">
        <div className="general-companies__inner">
          <div className="general-companies__grid">
            <button
              type="button"
              className={`general-badge${!empresaActiva ? ' general-badge--active' : ''}`}
              onClick={() => setEmpresaActiva(null)}
            >
              <span className="general-badge__icon"><FaHome /></span>
              <span className="general-badge__label">Home</span>
            </button>
            {COMPANIES.map((emp) => {
              const Icon = emp.icon;
              const isActive = empresaActiva?.label === emp.label;
              return (
                <button
                  key={emp.label}
                  type="button"
                  className={`general-badge${isActive ? ' general-badge--active' : ''}`}
                  onClick={() => setEmpresaActiva(emp)}
                >
                  <span className="general-badge__icon"><Icon /></span>
                  <span className="general-badge__label">{emp.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="general-dashboard-section">
        <div className="general-dashboard-section__inner">
          {CompanyComponent ? (
            <CompanyComponent />
          ) : (
            <div className="general-dashboard__empty">
              <FaIndustry size={48} />
              <p>Selecciona una empresa para visualizar su información</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default General;
