import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Obtén el tamaño de la pantalla

const PantallaPrincipal = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.png')}
        style={styles.icono}
        accessibilityLabel="Logo"
      />
      <Image
        source={require('./assets/loading.gif')}
        style={styles.gif}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33AAEE',
    justifyContent: 'center', // Centra en el eje vertical
    alignItems: 'center', // Centra en el eje horizontal
  },
  icono: {
    width: width * 0.8, // 80% del ancho de la pantalla
    height: height * 0.35, // 35% de la altura de la pantalla
    resizeMode: 'contain',
  },
  gif: {
    width: width * 0.6, // 60% del ancho de la pantalla
    height: height * 0.35, // 35% de la altura de la pantalla
    resizeMode: 'contain',
    marginTop: 20, // Espacio entre el logo y el gif
  },
});

export default PantallaPrincipal;

