import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginWithGoogle() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Datos del usuario Google:', decoded);

    axios.post(`${API_URL}/auth/google`, {
      token: credentialResponse.credential
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      navigate('/');
    }).catch(err => {
      alert('Error de autenticación');
      console.error('Error de autenticación:', err);
    });
  };

  const handleError = () => {
    alert('Fallo el inicio de sesión con Google;')
    console.error('Fallo el inicio de sesión con Google');
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}

export default LoginWithGoogle;