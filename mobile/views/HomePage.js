import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const HomePage = () => {
  const navigation = useNavigation();

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

        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Alfabeto')} 
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
    padding: 10,  // Mantén el padding moderado
    backgroundColor: 'rgba(7, 106, 163, 0.8)', 
  },
  footerButton: {
    alignItems: 'center',
    backgroundColor: '#054F7A',
    padding: 12,  // Tamaño de padding moderado
    borderRadius: 8,  // Bordes redondeados
    flex: 1,  
    marginHorizontal: 8,  // Espaciado entre botones
    justifyContent: 'center', 
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,  // Tamaño de texto moderado
  },
});

export default HomePage;
