import React from 'react';
import { GoogleLogin } from '@react-oauth/google'; 
import { jwtDecode } from 'jwt-decode'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native'; 
import { View } from 'react-native';

function LoginWithGoogle() {
  const navigation = useNavigation();

  const handleSuccess = async (credentialResponse) => {
    const API_URL = 'https://5e5380afe9d5.ngrok-free.app';  
    const token = credentialResponse.credential;  
    const decoded = jwtDecode(token); 
    console.log('Datos del usuario Google:', decoded);

    try {
      const res = await axios.post(`${API_URL}/auth/google`, {
        token: credentialResponse.credential  
      });

      await AsyncStorage.setItem('token', res.data.token); 
      navigation.navigate('Home');  // Redirigir a Home tras éxito
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
        onSuccess={handleSuccess} 
        onError={handleError}     
        clientId="845168585937-nmcgnisso84eancpnkj9fs4vp4ba8mqp.apps.googleusercontent.com"  
      />
    </View>
  );
}

export default LoginWithGoogle;
