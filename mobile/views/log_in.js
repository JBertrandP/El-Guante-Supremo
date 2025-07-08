import React, { useState } from 'react';
import { ScrollView, View, Image, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
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

    // Redirigir a la página de inicio después del login exitoso
    Alert.alert('Éxito', 'Iniciando sesión...');
    navigation.navigate('Home'); // Redirige a la pantalla Home
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
    paddingTop: height * 0.17,
    padding: 24,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.2,
    resizeMode: 'contain',
    marginBottom: 30,
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

export default Login;
