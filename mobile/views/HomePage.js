import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Asegúrate de tener expo-vector-icons instalado

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido</Text>
      <Image
        source={require('./assets/guante.png')}  
        style={styles.image}
      />
      <Text style={styles.subHeader}>Descubre cómo funciona</Text>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.footerButtonText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome5 name="language" size={24} color="white" />
          <Text style={styles.footerButtonText}>Traductor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="text-outline" size={24} color="white" /> 
          <Text style={styles.footerButtonText}>Alfabeto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome5 name="book" size={24} color="white" />
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: 'rgba(7, 106, 163, 0.8)', 
  },
  footerButton: {
    alignItems: 'center',
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
