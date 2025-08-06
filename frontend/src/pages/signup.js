import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';
import LoginWithGoogle from '../components/btnGoogle';

function Signup() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const allowedDomain = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'utch.edu.mx'];

  const validateEmail = (email) => {
    const emailRegex = /^[\w.-]+@([\w.-]+\.\w{2,6})$/;
    const match = email.match(emailRegex);
    if (!match) return false;
    const domain = match[1].toLowerCase();
    return allowedDomain.includes(domain);
  };
  
  //validar contraseña
  const validarPassword = (pwd) => {
    const minLength = 8;

    if (pwd.length < minLength) return 'Debe tener al menos 8 caracteres';
    return '';
  };

  //enviar formulario
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');
    setSuccess(false);

    //validar si tiene 8 caracteres la contraseña
    const pwdValidation = validarPassword(password);
    if (pwdValidation) {
      setPasswordError(pwdValidation);
      return;
    }

    if (!email || !validateEmail(email)) {
      return setError('Correo inválido o no permitido');
    }

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        full_name: name,
        email: email,
        password: password,
      });
      console.log(`${API_URL}/signup`);

      navigate('/');

    } catch (err) {
      console.error('Error en signup:', err);
      const mensaje = err?.response?.data?.detail || 'Error inesperado en el registro';
      setError(mensaje);
    } 
  };

  // Manejar clic en "Inicia sesión"
  const handleGoToLogin = (e) => {
  e.preventDefault();
  const card = cardRef.current;
  if (card) {
    card.classList.add('signup-exit');

    card.addEventListener(
      'animationend',
      () => {
        navigate('/login');
      },
      { once: true }
    );
  }
};


  return (
    <div className="signup-body">
      <div className="signup-card signup-enter" ref={cardRef}>
        <h2>Crear cuenta</h2>
        <form onSubmit={handleSignUp}>

          <p><input
            placeholder='Nombre Completo' type="text"  name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
          </p> 

          <p><input placeholder='Correo electrónico' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </p>

          <p><input  placeholder='Contraseña'  type="password" name="password" className={`form-control ${passwordError ? 'is-invalid' : ''}`} value={password}
            onChange={(e) => setPassword(e.target.value)} required/>
          {passwordError && (
              <div className="invalid-feedback">{passwordError}</div>
            )}
          </p>
            <LoginWithGoogle/>
          <button type="submit">Registrarse</button>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <p className="login-link">¿Ya tienes cuenta? <a href="/login" onClick={handleGoToLogin}>Iniciar sesión</a></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;