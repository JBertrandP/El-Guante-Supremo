import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PantallaPrincipal from './views/splash_screen'; 
import Login from './views/log_in'; 

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true); 
    }, 5000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.container}>
      
      {showLogin ? <Login /> : <PantallaPrincipal />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
