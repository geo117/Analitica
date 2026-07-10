import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FaUser, FaLock, FaChartLine } from 'react-icons/fa';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useAuth } from '../context/useAuth';
import usersData from '../database/employees.json';
import '../css/Login.css';

const MySwal = withReactContent(Swal);

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Ingresa tu usuario y contraseña para continuar.');
      return;
    }

    const foundUser = usersData.usuarios.find(
      (item) => item.username === username.trim() && item.password === password
    );

    if (!foundUser) {
      setError('Usuario o contraseña incorrectos.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    login(foundUser);

    await MySwal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: `Inicio de sesión exitoso, ${foundUser.nombre}.`,
      confirmButtonColor: 'rgb(255, 204, 0)',
      showConfirmButton: false,
      //confirmButtonText: 'Continuar',
      timer: 1500,
      timerProgressBar: true,
      color: 'rgb(42, 42, 43)',
    });

    setIsSubmitting(false);

    const destination = foundUser.rol === 'admin' ? '/home' : `/${foundUser.empresa}`;
    navigate(destination, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-page__diagonal">
        <div className="login-page__brand">
          <div className="login-page__brand-icon">
            <FaChartLine aria-hidden="true" size={28} />
          </div>
          <h1>Plataforma Analitica</h1>
          <p>
            Inteligencia de negocios para <br/> G y J Ramírez S.A., 
            ALMASA, COLMENA y GYJ.
          </p>
        </div>
      </div>

      <div className="login-page__panel">
        <Form className="login-card" onSubmit={handleSubmit} noValidate>
          <h2 className="login-card__title">Iniciar sesión</h2>
          <p className="login-card__subtitle">
            Ingresa tus credenciales para acceder al panel de indicadores.
          </p>

          <Form.Group className="login-card__field" controlId="username">
            <Form.Label>Usuario</Form.Label>
            <div className="login-card__input-wrapper">
              <FaUser aria-hidden="true" className="login-card__input-icon" />
              <Form.Control
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
              />
            </div>
          </Form.Group>

          <Form.Group className="login-card__field" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <div className="login-card__input-wrapper">
              <FaLock aria-hidden="true" className="login-card__input-icon" />
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </div>
          </Form.Group>

          {error && (
            <p className="login-card__error" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="login-card__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
