import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido</Text>
      <Image
    source={require('./assets/guante.png')}
        style={styles.image}
      />
    
     

      <View style={styles.footer}>
               <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Traductor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Alfabeto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Diccionario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33AAEE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4996C3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: '#076AA3', 
  },
  footerButton: {
    backgroundColor: '#054F7A',
    padding: 10,
    borderRadius: 5,
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default HomePage;
