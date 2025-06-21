import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

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
    width: 250,
    height: 500,
    resizeMode: 'contain',
  },
  gif: {
    width: 300,
    height: 600,
    resizeMode: 'contain',
    marginTop: 20,
  },
});

export default PantallaPrincipal;
