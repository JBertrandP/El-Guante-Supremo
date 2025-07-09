import React, { useState } from 'react';
import { ScrollView, View, Image, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';  // Importamos axios para hacer solicitudes HTTP

const { width, height } = Dimensions.get('window');  // Obtener las dimensiones de la pantalla

const SignUp = () => {
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  // Función para validar el correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Función para manejar el registro de usuario
  const handleSignUp = async () => {
    // Validar si los campos están vacíos
    if (!signUpUsername || !signUpEmail || !signUpPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Validar si el correo tiene el formato correcto
    if (!validateEmail(signUpEmail)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return;
    }

    // Validar la longitud de la contraseña
    if (signUpPassword.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    // Hacer la solicitud a la API para registrar el usuario
    try {
      const response = await axios.post('http://10.100.1.68:8000/signup', {
        username: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
      });

      // Si la respuesta es exitosa, mostramos un mensaje de éxito
      if (response.data.success) {
        Alert.alert('Éxito', 'Registro exitoso...');
      } else {
        // Si la respuesta es negativa (por ejemplo, usuario ya existe)
        Alert.alert('Error', 'Este usuario ya está registrado');
      }
    } catch (error) {
      // En caso de error con la solicitud a la API
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al registrarse, por favor intenta nuevamente');
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />
        
        {/* Campo de nombre */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#33AAEE"
          value={signUpUsername}
          onChangeText={setSignUpUsername}
        />
        
        {/* Campo de correo electrónico */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          placeholderTextColor="#33AAEE"
          value={signUpEmail}
          onChangeText={setSignUpEmail}
        />
        
        {/* Campo de contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor="#33AAEE"
          value={signUpPassword}
          onChangeText={setSignUpPassword}
        />
        
        {/* Botón de registro */}
        <View style={styles.buttonContainer}>
          <Button
            title="Registrarse"
            color="white"
            onPress={handleSignUp}
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

export default SignUp;
