import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import PantallaPrincipal from './views/splash_screen';
import Login from './views/log_in';
import SignUp from './views/sign_up';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Esperar 5 segundos antes de mostrar el login
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 5000); // 5000ms = 5 segundos

    return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
  }, []);

  return (
    <View style={styles.container}>
      {!showLogin ? <PantallaPrincipal /> : <Login />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
