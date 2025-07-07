import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); 

const PantallaPrincipal = ({ navigation }) => {
  useEffect(() => {
    // Set a timer to navigate to the Login screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');  // Replace Splash with Login screen
    }, 3000);

    // Cleanup the timeout when the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33AAEE',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',      
    width: width * 0.8,       
  },
  icono: {
    width: '100%',             
    height: height * 0.3,    
    resizeMode: 'contain',
  },
  gif: {
    width: '100%',           
    height: height * 0.3,      
    resizeMode: 'contain',
    marginTop: 0,              
  },
});

export default PantallaPrincipal;
