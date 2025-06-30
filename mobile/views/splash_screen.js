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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  icono: {
    width: width * 0.8, // 60% del ancho de la pantalla0
    height: height * 0.35, // 25% de la altura de la pantalla
    resizeMode: 'contain',
  },
  gif: {
    width: width * 0.6, // 80% del ancho de la pantalla
    height: height * 0.35, // 35% de la altura de la pantalla
    resizeMode: 'contain',
    marginTop: 20,
  },
});

export default PantallaPrincipal;
