import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import almasaImg from '../assets/ALMASA.jpg';
import colmenaImg from '../assets/COLMENA.jpg';
import gyjImg from '../assets/GYJ.jpg';
import adminImg from '../assets/admin.png';
import '../css/Home.css';

const COMPANIES = [
  { name: '', path: '/almasa', image: almasaImg },
  { name: '', path: '/colmena', image: colmenaImg },
  { name: '', path: '/gyj', image: gyjImg },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Navbar />

      <main className="home-hero">
        <div className="home-hero__content">
          {/*<span className="home-hero__eyebrow">Panel de indicadores</span>*/}
          <h1>
            Bienvenido a la <span className="home-hero__highlight">Plataforma Analitica</span>
          </h1>
          <p>
            Consulta los indicadores de gestión de cada una de nuestras
            empresas. Selecciona una marca para ver su información.
          </p>
        </div>

        <div className="home-hero__companies">
          <button
            type="button"
            className="companies-admin"
            onClick={() => navigate('/admin')}
          >
            <img src={adminImg} alt="Administración" />
          </button>
          <div className="companies-row">
            {COMPANIES.map((company) => (
              <button
                key={company.path}
                type="button"
                className="company-link"
                onClick={() => navigate(company.path)}
              >
                <span className="company-link__circle">
                  <img src={company.image} alt={`Logo de ${company.name}`} />
                </span>
                <span className="company-link__label">{company.name}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
