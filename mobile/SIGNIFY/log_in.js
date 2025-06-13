import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text, StyleSheet } from 'react-native';

const login = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image 
          source={require('./src/assets/logo.png')} 
          style={styles.logo}
        />
        <TextInput 
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#33AAEE"
        />
        <TextInput 
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor="#33AAEE"
        />
        <Button 
          title="Iniciar sesión"
          color="#33AAEE"
          onPress={() => {}}
        />
        <Text style={styles.signUpText}>¿No tienes cuenta? Regístrate aquí</Text>
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
    width: 600,
    height: 400,
    resizeMode: 'contain',
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
  signUpText: {
    marginTop: 16,
    color: '#033552',
    fontSize: 14,
  },
});

export default login;
