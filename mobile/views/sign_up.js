import React, { useState } from 'react';
import { ScrollView, View, Image, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_URL } from 'react-native-dotenv';  

const { width, height } = Dimensions.get('window');

const API_URL = REACT_APP_API_URL; 

const Login = ({ navigation }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const validateEmail = (email) => {  
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!validateEmail(loginEmail)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return;
    }

    if (loginPassword.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('username', loginEmail); 
      formData.append('password', loginPassword); 

      const response = await axios.post(`${API_URL}/signup`, formData, { 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000,  
      });

      console.log('Respuesta del servidor:', response.data);

      const { access_token } = response.data;

      if (access_token) {
        Alert.alert('Éxito', 'Iniciando sesión...');
        navigation.navigate('Home'); 
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error); 

      if (error.response) {
        console.error('Respuesta del servidor:', error.response);
        Alert.alert('Error', error.response.data.message || 'Hubo un problema al iniciar sesión, por favor intenta nuevamente');
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
        Alert.alert('Error', 'No se recibió respuesta del servidor');
      } else {
        console.error('Error desconocido:', error.message);
        Alert.alert('Error', 'Hubo un problema al iniciar sesión, por favor intenta nuevamente');
      }
    }
  };

  const handleSignUpRedirect = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico o nombre de usuario"
          keyboardType="email-address"
          placeholderTextColor="#33AAEE"
          value={loginEmail}
          onChangeText={setLoginEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor="#33AAEE"
          value={loginPassword}
          onChangeText={setLoginPassword}
        />
        
        <View style={styles.buttonContainer}>
          <Button
            title="Iniciar sesión"
            color="#33AAEE"
            onPress={handleLogin}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="No tienes cuenta, crea una"
            color="#33AAEE"
            onPress={handleSignUpRedirect} 
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#33AAEE',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: height * 0.1, 
    paddingHorizontal: width * 0.05, 
  },
  logo: {
    width: width * 0.6,
    height: height * 0.2,
    resizeMode: 'contain',
    marginBottom: height * 0.05,  
  },
  input: {
    width: '100%',
    padding: 12,
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#33AAEE',
    borderWidth: 1,
    color: '#33AAEE',
    fontSize: width * 0.04,  
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#033552', 
    borderRadius: 8,
    marginTop: height * 0.05, 
    overflow: 'hidden',
  },
});

export default Login;
