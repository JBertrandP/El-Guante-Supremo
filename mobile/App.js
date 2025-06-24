import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {PantallaPrincipal} from "./splash_screen.js";
export default function App() { 
  return (
    <PantallaPrincipal />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#033552',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
