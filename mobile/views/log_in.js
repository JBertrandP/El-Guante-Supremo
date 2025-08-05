import React, { useState } from 'react';
import { ScrollView, View, Image, TextInput, Button, Alert, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Para el ícono de Google
import { useNavigation } from '@react-navigation/native'; // Para la navegación

const API_URL = 'https://5e5380afe9d5.ngrok-free.app';  

const { width, height } = Dimensions.get('window');

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigation = useNavigation(); // Inicializamos la navegación

  const validateEmail = (email) => {  
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Validar si los campos están vacíos
    if (!loginEmail || !loginPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Validar si el correo tiene el formato correcto
    if (!validateEmail(loginEmail)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return;
    }

    // Validar la longitud de la contraseña
    if (loginPassword.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      // Crear un objeto FormData y agregar los datos
      const formData = new FormData();
      formData.append('username', loginEmail);  // Enviar el correo como "username"
      formData.append('password', loginPassword);  // Enviar la contraseña

      // Enviar los datos al backend usando 'application/x-www-form-urlencoded'
      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',  // Usamos este formato
        },
        timeout: 10000,  // Configuración de timeout de 10 segundos
      });

      console.log('Respuesta del servidor:', response.data);

      const { access_token } = response.data;

      if (access_token) {
        Alert.alert('Éxito', 'Iniciando sesión...');
        navigation.navigate('Home');  // Redirigir a la pantalla Home
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);

      if (error.response) {
        console.error('Respuesta del servidor:', error.response);
        Alert.alert('Error', error.response.data.detail || 'Hubo un problema al iniciar sesión, por favor intenta nuevamente');
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

        {/* Botón de Iniciar sesión con Google */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => navigation.navigate('LoginWithGoogle')} // Navegar a la pantalla de Google login
        >
          <Icon name="google" size={20} color="#ffffff" style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>
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
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DB4437', // Color rojo de Google
    borderRadius: 8,
    marginTop: height * 0.05,
    padding: 12,
    width: '100%',
    justifyContent: 'center',
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});

export default Login;
