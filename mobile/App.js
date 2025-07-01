import React, { useState, useEffect } from 'react'; 
import { View, StyleSheet } from 'react-native';
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
      {!showLogin ? <PantallaPrincipal /> : <Login />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
