import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef(null);
  

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

    const formData = new URLSearchParams();
    formData.append('full_name', name)
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post('http://10.100.1.68:8000/signup', {
        full_name: name,
        email: email,
        password: password,
      });

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
            placeholder='Nombre Completo'
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          /></p> 

          <p><input
            placeholder='Correo electrónico'
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /></p>

          <p><input
            placeholder='Contraseña'
            type="password"
            name="password"
            className={`form-control ${passwordError ? 'is-invalid' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && (
              <div className="invalid-feedback">{passwordError}</div>
            )}
          </p>

          <button type="submit">Registrarse</button>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && (
            <div className="alert alert-success mt-3">
              Registro exitoso 🎉
            </div>
          )}

          <p className="login-link">¿Ya tienes cuenta? <a href="/login" onClick={handleGoToLogin}>Iniciar sesión</a></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;