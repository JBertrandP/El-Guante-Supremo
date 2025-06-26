import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import PantallaPrincipal from './views/splash_screen';
import Login from './views/Login';

export default function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarSplash(false);
    }, 3000); // 3 segundos de splash

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {mostrarSplash ? <PantallaPrincipal /> : <Login />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
