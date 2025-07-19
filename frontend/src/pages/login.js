import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

function Login() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const cardRef = useRef();

  //validar email
  const validateEmail = (email) => {
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,6}$/;
    return emailRegex.test(email);
  };

  //enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!validateEmail(email)) {
      setError('Correo electrónico inválido');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(`${API_URL}/login`)

      const { access_token } = response.data;

      if (access_token) {
        alert('¡Inicio de sesión exitoso!');
        //guardar el token
        localStorage.setItem('token', access_token);
        navigate('/'); 
      } else {
        setError('Usuario o contraseña incorrectos');
      }

    } catch (err) {
      console.error('Error en login:', err);
      const mensaje = err?.response?.data?.message || 'Error al iniciar sesión. Intenta de nuevo.';
      setError(mensaje);
    }
  };

  //manejar anjimciones
  const handleGoToSignup = (e) => {
    e.preventDefault();
    const card = cardRef.current;
    if(card){
      card.classList.add('login-exit');

      card.addEventListener(
        'animationend',
        () => {
          navigate('/signup');
        },
        {once: true}
      );
    }
  };

  return (
    <div className='login-body'>
      <div className='card login-enter' ref={cardRef}>
        <h2>Iniciar Sesión</h2>
        <br></br>
        <form className='login-form' onSubmit={handleSubmit}>
          <p>
            <input
            placeholder='Ingrese correo electónico'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </p>
          <p>
            <input
            placeholder='Ingrese contraseña'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <br />
          <button type='submit'>Entrar</button>
          <p className='signup-link'>¿Aún no tienes una cuenta? <a href='/signup' onClick={handleGoToSignup}>Crear cuenta</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;