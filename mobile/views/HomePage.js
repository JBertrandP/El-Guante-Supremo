import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido</Text>
      <Image
        source={require('./assets/guante2.0.png')}  
        style={styles.image}
      />

    
      <TouchableOpacity style={styles.addDeviceButton}>
        <View style={styles.buttonContent}>
          <Text style={styles.addDeviceButtonText}>+ Agregar Dispositivo</Text>
        </View>
      </TouchableOpacity>

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
    marginBottom: 30,
  },
  addDeviceButton: {
    width: '80%',
    backgroundColor: '#033552', 
    paddingVertical: 15,
    borderRadius: 30, 
    marginBottom: 30,  
    borderWidth: 3,
    borderColor: '#FFCC00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addDeviceButtonText: {
    color: '#FFFFFF',  
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase', 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 30, 
    padding: 10,  
    backgroundColor: 'rgba(7, 106, 163, 0.8)', 
  },
  footerButton: {
    alignItems: 'center',
    backgroundColor: '#054F7A',
    padding: 12,
    borderRadius: 8,
    flex: 1,  
    marginHorizontal: 8,
    justifyContent: 'center', 
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default HomePage;
