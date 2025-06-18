import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

const PantallaPrincipal = () => {
  useEffect(() => {
   
    const timer = setTimeout(async () => {
      
      await SplashScreen.hideAsync();
    }, 5000);

    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/assets/logo.png')} 
        style={styles.icono}
        accessibilityLabel="Logo"
      />
      <Image
        source={require('./src/assets/loading.gif')}
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
