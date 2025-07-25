import { useState } from 'react';
import axios from 'axios';
import CustomNavbar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/perfil.css';

function User() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [nName, setName] = useState('');
  const [nEmail, setEmail] = useState('');
  const [nPassword, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const allowedDomain = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'utch.edu.mx'];

  const validateEmail = (email) => {
    const emailRegex = /^[\w.-]+@([\w.-]+\.\w{2,6})$/;
    const match = email.match(emailRegex);

    if (!match) return false;

    const domain = match[1].toLowerCase();
    return allowedDomain.includes(domain);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!nEmail && !nPassword && !nName) {
      setError('Debe actualizar al menos un campo');
      return;
    }

    if (nEmail && !validateEmail(nEmail)) {
      setError('Correo electrónico inválido');
      return;
    }

    if (nPassword && nPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
        const token = localStorage.getItem('token');

        const update = {};

        if (nName) update.full_name = nName;
        if (nEmail) update.email = nEmail;
        if (nPassword) update.password = nPassword;

      const response = await axios.put(`${API_URL}/users/me/update`, {
        full_name: nName,
        email: nEmail,
        password: nPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess('Actualizado con éxito',true);
      console.log('Usuario actualizado:', response.data);
      

    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      const mensaje = err?.response?.data?.detail || 'Error inesperado al actualizar';
      setError(mensaje);
    }
  };

  return (
    <div className='layout-perfil'>
        <CustomNavbar/>

        <main>
            <div className='perfil-body'>
                <div className='nombre-card'>
                    <h2>Actualizar nombre de usuario</h2>
                    <form onSubmit={handleUpdate}>
                        <p><input type="text" placeholder="Nombre completo" value={nName} onChange={(e) => setName(e.target.value)}/></p>
                        {error && <p className="error-msg">{error}</p>}
                        {success && <p className="success-msg">Datos actualizados correctamente</p>}
                        <button type="submit">Actualizar</button>
                    </form>
                </div>

                <div className='email-card'>
                <h2>Actualizar correo electrónico</h2>
                    <form onSubmit={handleUpdate}>
                        <p><input type="email" placeholder="Correo electrónico" value={nEmail} onChange={(e) => setEmail(e.target.value)}/></p>
                        {error && <p className="error-msg">{error}</p>}
                        {success && <p className="success-msg">Datos actualizados correctamente</p>}
                        <button type="submit">Actualizar</button>
                    </form>
                </div>

                <div className='passw-card'>
                    <h2>Actualizar contraseña</h2>
                    <form onSubmit={handleUpdate}>
                        <p><input type="password" placeholder="Nueva contraseña" value={nPassword} onChange={(e) => setPassword(e.target.value)}/></p>
                        {error && <p className="error-msg">{error}</p>}
                        {success && <p className="success-msg">Datos actualizados correctamente</p>}
                        <button type="submit">Actualizar</button>
                    </form>
                </div>
            </div>
        </main>

        <Footer/>
    </div>
  );
}

export default User;
