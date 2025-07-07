import React, { useState } from 'react';
import { ScrollView, View, Image, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if (loginPassword.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    Alert.alert('Éxito', 'Iniciando sesión...');
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
          placeholder="Correo electrónico"
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
        
        {/* Rectángulo para el botón de Iniciar sesión */}
        <View style={styles.buttonContainer}>
          <Button 
            title="Iniciar sesión"
            color="#33AAEE" // Cambié el color del texto del botón
            onPress={handleLogin}
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
    justifyContent: 'flex-start', // Coloca el contenido más abajo
    alignItems: 'center', // Centra horizontalmente
    paddingTop: height * 0.17, // Aumenté el padding para bajar el contenido un poco más
    padding: 24,
  },
  logo: {
    width: width * 0.6, // Reducido el tamaño de la imagen
    height: height * 0.2, // Reducido el tamaño de la imagen
    resizeMode: 'contain',
    marginBottom: 30, // Espacio abajo de la imagen
  },
  input: {
    width: '100%',
    padding: 12,
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#33AAEE',
    borderWidth: 1,
    color: '#33AAEE', // Color de los textos dentro de los inputs
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#033552', 
    borderRadius: 8,
    marginTop: 30,
    overflow: 'hidden', 
  },
});

export default Login;
