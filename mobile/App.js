import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaPrincipal from './views/splash_screen'; 
import Login from './views/log_in';  
import SignUp from './views/sign_up'; 
import Home from './views/HomePage';  

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={PantallaPrincipal}
          options={{ headerShown: false }} 
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }} 
        />

        {/* Pantalla de Home */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }} 
        />

      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

