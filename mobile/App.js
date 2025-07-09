import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaPrincipal from './views/splash_screen'; 
import SignUp from './views/sign_up'; 
import Home from './views/HomePage';  
import Alfabeto from './views/Alfabeto'; 
import { useNavigation } from '@react-navigation/native'; 

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Pantalla de Splash */}
        <Stack.Screen
          name="Splash"
          component={PantallaPrincipal}
          options={{ headerShown: false }}  
        />

        {/* Redirige automáticamente a Home después de 3 segundos */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ 
            headerStyle: { backgroundColor: '#033552' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontFamily: 'Roboto', 
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ 
            headerStyle: { backgroundColor: '#033552' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontFamily: 'Roboto', 
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Stack.Screen
          name="Alfabeto"
          component={Alfabeto}
          options={{ 
            title: 'Alfabeto',
            headerStyle: { backgroundColor: '#033552' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontFamily: 'Roboto', 
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
