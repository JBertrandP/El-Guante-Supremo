import React from 'react';
import { View, StyleSheet } from 'react-native';
import PantallaPrincipal from './views/splash_screen';
import Login from './views/log_in';
import SignUp from './views/sign_up';
export default function App() {
  return (
    <View style={styles.container}>
      <PantallaPrincipal />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

