import React, { useState } from 'react';
import { ScrollView, View, Image, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Obtener el tamaño de la pantalla

const SignUp = () => {
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleSignUp = () => {
    if (!signUpUsername || !signUpEmail || !signUpPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if (signUpPassword.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }
   
    Alert.alert('Éxito', 'Registro exitoso...');
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
          placeholder="Nombre"
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
        
        {/* Rectángulo para el botón de Registrarse */}
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
    color: '#33AAEE',
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#033552', 
    borderRadius: 8,
    marginTop: 30,
    overflow: 'hidden',
  },
});

export default SignUp;
