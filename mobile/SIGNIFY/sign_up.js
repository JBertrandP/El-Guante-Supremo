import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image 
          source={require('./src/assets/logo.png')}  
          style={styles.logo}
        />
        <TextInput 
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#33AAEE"
        />
        <TextInput 
          style={styles.input}
          placeholder="Correo electrónico"
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
          title="Sign In"
          color="#33AAEE"
          onPress={() => {}}
          style={styles.button}
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
  button: {
    marginTop: 24,
    padding: 14,
    backgroundColor: '#054F7A',
    color: '#33AAEE',
  },
});

export default App;
