import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function LoginWithGoogle() {
  const handleSuccess = (credentialResponse) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Datos del usuario Google:', decoded);

    axios.post(`${API_URL}/auth/Google`, {
      token: credentialResponse.credential
    }).then(res => {
      localStorage.setItem('token', res.data.token);
 
    }).catch(err => {
      console.error('Error de autenticación:', err);
    });
  };

  const handleError = () => {
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