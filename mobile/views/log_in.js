import React, { useState } from 'react';
import { ScrollView, View, Image, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios'; 

const { width, height } = Dimensions.get('window');  

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

    
    if (validateEmail(loginEmail) && !loginEmail.includes('@')) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return;
    }

    // Validar la longitud de la contraseña
    if (loginPassword.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      // Enviar datos al servidor de acuerdo con lo que introdujo el usuario
      const response = await axios.post('http://10.100.1.92:8000/login', {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.data.success) {
        Alert.alert('Éxito', 'Iniciando sesión...');
        navigation.navigate('Home'); // Redirigir a la pantalla Home
      } else {
        Alert.alert('Error', 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      // En caso de error con la API, muestra un mensaje
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al iniciar sesión, por favor intenta nuevamente');
    }
  };

  const handleSignUpRedirect = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />
        
        {/* Campo de correo electrónico o nombre de usuario */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico o nombre de usuario"
          keyboardType="email-address"
          placeholderTextColor="#33AAEE"
          value={loginEmail}
          onChangeText={setLoginEmail}
        />
        
        {/* Campo de contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor="#33AAEE"
          value={loginPassword}
          onChangeText={setLoginPassword}
        />
        
        {/* Botón de inicio de sesión */}
        <View style={styles.buttonContainer}>
          <Button
            title="Iniciar sesión"
            color="#33AAEE"
            onPress={handleLogin}
          />
        </View>

        {/* Botón de redirección a SignUp */}
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
    paddingTop: height * 0.1,  // Ajusta el margen superior de acuerdo con la altura de la pantalla
    paddingHorizontal: width * 0.05,  // Añade márgenes horizontales para los dispositivos más pequeños
  },
  logo: {
    width: width * 0.6,
    height: height * 0.2,
    resizeMode: 'contain',
    marginBottom: height * 0.05,  // Espaciado dinámico con respecto a la altura de la pantalla
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
