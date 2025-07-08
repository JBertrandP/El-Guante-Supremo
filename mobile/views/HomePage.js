import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation para la navegación

const HomePage = () => {
  const navigation = useNavigation(); // Crear la referencia de navegación

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido</Text>
      <Image
        source={require('./assets/guante2.0.png')}  
        style={styles.image}
      />
      <View style={styles.footer}>
        
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome5 name="language" size={24} color="white" />
          <Text style={styles.footerButtonText}>Traductor</Text>
        </TouchableOpacity>

        {/* Botón que navega a la pantalla Alfabeto */}
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Alfabeto')} // Navegar a la pantalla Alfabeto
        >
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
    marginBottom: 40,  
  },
  image: {
    width: '100%',  
    height: undefined, 
    aspectRatio: 1,  
    resizeMode: 'contain',  
    marginBottom: 60, 
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
