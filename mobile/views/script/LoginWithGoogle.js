import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Si quieres decodificar el token de Google
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';  

function LoginWithGoogle() {
  const navigation = useNavigation(); 

  // Cuando el login con Google es exitoso
  const handleSuccess = (credentialResponse) => {
    const API_URL = process.env.REACT_APP_API_URL;  // La URL de tu API
    const token = credentialResponse.credential;  // El token JWT de Google
    const decoded = jwtDecode(token);  // Decodificamos el token para obtener información adicional (opcional)
    console.log('Datos del usuario Google:', decoded);

    // Enviar el token a tu backend para autenticar al usuario
    axios.post(`${API_URL}/auth/google`, {
      token: credentialResponse.credential  // Enviamos el token de Google al backend
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);  // Guardamos el token del backend en el localStorage
      navigate('');  // Redirigimos al usuario a la página principal después de iniciar sesión
    })
    .catch(err => {
      alert('Error de autenticación');
      console.error('Error de autenticación:', err);
    });
  };

  // Cuando el login con Google falla
  const handleError = () => {
    alert('Fallo el inicio de sesión con Google');
    console.error('Fallo el inicio de sesión con Google');
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}  // Llamamos a `handleSuccess` cuando el login es exitoso
        onError={handleError}      // Llamamos a `handleError` si hay un error
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}  // Le pasamos el clientId de Google desde el archivo .env
      />
    </div>
  );
}

export default LoginWithGoogle;
