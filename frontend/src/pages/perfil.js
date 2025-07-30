import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar para redirección
import axios from 'axios';
import CustomNavbar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/perfil.css';

function User() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate(); // Hook para redirigir
  const [nName, setName] = useState('');
  const [nEmail, setEmail] = useState('');
  const [nPassword, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const allowedDomain = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'utch.edu.mx'];

  const validateEmail = (email) => {
    const emailRegex = /^[\w.-]+@([\w.-]+\.\w{2,6})$/;
    const match = email.match(emailRegex);
    if (!match) return false;
    const domain = match[1].toLowerCase();
    return allowedDomain.includes(domain);
  };

  const handleResponse = (res) => {
    setSuccess('Actualizado correctamente');
    setTimeout(() => navigate('/users/me'), 1500); // Redirigir después de 1.5s
  };

  const handleError = (err, msgDefault) => {
    const mensaje = err?.response?.data?.detail || msgDefault;
    setError(mensaje);
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nName) return setError('Ingrese un nombre válido');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_URL}/users/me/update`, {
        full_name: nName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      handleResponse(res);
    } catch (err) {
      handleError(err, 'Error al actualizar nombre');
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nEmail || !validateEmail(nEmail)) {
      return setError('Correo inválido o no permitido');
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_URL}/users/me/update`, {
        email: nEmail,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials:true
      });
      handleResponse(res);
    } catch (err) {
      handleError(err, 'Error al actualizar correo');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nPassword || nPassword.length < 8) {
      return setError('La contraseña debe tener al menos 8 caracteres');
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_URL}/users/me/update`, {
        password: nPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials:true
      });
      handleResponse(res);
    } catch (err) {
      handleError(err, 'Error al actualizar contraseña');
    }
  };

  return (
    <div className='layout-perfil'>
      <CustomNavbar />
      <main>
        <div className='perfil-body'>
          <div className='nombre-card'>
            <h2>Actualizar nombre de usuario</h2>
            <form onSubmit={handleUpdateName}>
              <p><input type="text" placeholder="Nombre completo" value={nName} onChange={(e) => setName(e.target.value)} /></p>
              {error && <p className="error-msg">{error}</p>}
              {success && <p className="success-msg">{success}</p>}
              <button type="submit">Actualizar</button>
            </form>
          </div>

          <div className='email-card'>
            <h2>Actualizar correo electrónico</h2>
            <form onSubmit={handleUpdateEmail}>
              <p><input type="email" placeholder="Correo electrónico" value={nEmail} onChange={(e) => setEmail(e.target.value)} /></p>
              {error && <p className="error-msg">{error}</p>}
              {success && <p className="success-msg">{success}</p>}
              <button type="submit">Actualizar</button>
            </form>
          </div>

          <div className='passw-card'>
            <h2>Actualizar contraseña</h2>
            <form onSubmit={handleUpdatePassword}>
              <p><input type="password" placeholder="Nueva contraseña" value={nPassword} onChange={(e) => setPassword(e.target.value)} /></p>
              {error && <p className="error-msg">{error}</p>}
              {success && <p className="success-msg">{success}</p>}
              <button type="submit">Actualizar</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default User;
