import React from 'react';
import { GoogleLogin } from '@react-oauth/google'; // Si utilizas React Native con una librería de OAuth
import { jwtDecode } from 'jwt-decode'; // Para decodificar el token de Google
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Para almacenar el token en React Native
import Config from 'react-native-config'; // Para acceder a las variables de entorno

function LoginWithGoogle() {
  const navigation = useNavigation(); 

  // Cuando el login con Google es exitoso
  const handleSuccess = async (credentialResponse) => {
    const API_URL = Config.API_URL;  // La URL de tu API desde las variables de entorno
    const token = credentialResponse.credential;  // El token JWT de Google
    const decoded = jwtDecode(token);  // Decodificamos el token para obtener información adicional (opcional)
    console.log('Datos del usuario Google:', decoded);

    // Enviar el token a tu backend para autenticar al usuario
    try {
      const res = await axios.post(`${API_URL}/auth/google`, {
        token: credentialResponse.credential  // Enviamos el token de Google al backend
      });

      // Guardamos el token del backend en AsyncStorage
      await AsyncStorage.setItem('token', res.data.token);  // Guardamos el token del backend en AsyncStorage
      navigation.navigate('Home');  // Redirigimos al usuario a la página principal después de iniciar sesión
    } catch (err) {
      alert('Error de autenticación');
      console.error('Error de autenticación:', err);
    }
  };

  // Cuando el login con Google falla
  const handleError = () => {
    alert('Fallo el inicio de sesión con Google');
    console.error('Fallo el inicio de sesión con Google');
  };

  return (
    <View>
      <GoogleLogin
        onSuccess={handleSuccess}  // Llamamos a `handleSuccess` cuando el login es exitoso
        onError={handleError}      // Llamamos a `handleError` si hay un error
        clientId={Config.GOOGLE_CLIENT_ID}  // Le pasamos el clientId de Google desde las variables de entorno
      />
    </View>
  );
}

export default LoginWithGoogle;
