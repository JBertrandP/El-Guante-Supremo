import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); 

const PantallaPrincipal = ({ navigation }) => {
  useEffect(() => {
  
    const timer = setTimeout(() => {
      navigation.replace('Home'); 
    }, 5000);


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
