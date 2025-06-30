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
          placeholder="Usuario"
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
        <Button 
          title="Registrarse"
          color="#33AAEE"
          onPress={handleSignUp}
        />
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
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: width * 0.8, // 80% del ancho de la pantalla
    height: height * 0.25, // 25% de la altura de la pantalla
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
});

export default SignUp;
