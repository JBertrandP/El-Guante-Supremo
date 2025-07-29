import React, { useState } from 'react';
import { ScrollView, View, Image, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

const API_URL = 'https://5e5380afe9d5.ngrok-free.app';  

const { width, height } = Dimensions.get('window');

const SignUp = ({ navigation }) => {
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Para manejar el estado de carga

  // Validación de correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Validación de contraseña
  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    return '';
  };

  // Manejo del formulario de registro
  const handleSignUp = async () => {
    if (!signUpUsername || !signUpEmail || !signUpPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!validateEmail(signUpEmail)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return;
    }

    const passwordError = validatePassword(signUpPassword);
    if (passwordError) {
      Alert.alert('Error', passwordError);
      return;
    }

    setIsLoading(true); // Cambia el estado de carga a true

    try {
      console.log("Haciendo solicitud a:", `${API_URL}/signup`);
      const response = await axios.post(`${API_URL}/signup`, {
        full_name: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
      });

      // Verificar la respuesta del servidor
      if (response.data.detail === "El correo ya está registrado.") {
        Alert.alert('Error', 'Este correo ya está registrado');
      } else if (response.data.message === 'Usuario registrado correctamente') {
        Alert.alert('Éxito', 'Registro exitoso');
        navigation.navigate('Login'); // Redirige al login
      } else {
        Alert.alert('Error', 'Hubo un problema al registrarse, por favor intenta nuevamente');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.response ? error.response : error.message);
      if (error.response) {
        Alert.alert('Error', `Error del servidor: ${error.response.data.message}`);
      } else if (error.request) {
        Alert.alert('Error', 'No se recibió respuesta del servidor');
      } else {
        Alert.alert('Error', 'Hubo un problema al registrarse, por favor intenta nuevamente');
      }
    } finally {
      setIsLoading(false); // Cambia el estado de carga a false
    }
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
          placeholder="Nombre Completo"
          placeholderTextColor="#33AAEE"
          value={signUpUsername}
          onChangeText={setSignUpUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          placeholderTextColor="#33AAEE"
          value={signUpEmail}
          onChangeText={setSignUpEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor="#33AAEE"
          value={signUpPassword}
          onChangeText={setSignUpPassword}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={isLoading ? 'Cargando...' : 'Registrarse'}
            color="white"
            onPress={handleSignUp}
            disabled={isLoading} // Desactiva el botón mientras se está cargando
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
