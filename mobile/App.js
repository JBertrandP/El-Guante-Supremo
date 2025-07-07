import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaPrincipal from './views/splash_screen';  // Splash screen
import Login from './views/log_in';  // Login screen
import SignUp from './views/sign_up';  // SignUp screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash Screen */}
        <Stack.Screen
          name="Splash"
          component={PantallaPrincipal}
          options={{ headerShown: false }} // Hide header for splash
        />
        
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        
        {/* SignUp Screen */}
        <Stack.Screen
          name="SignUp"
          component={SignUp}
           options={{ headerShown: false }} 

        />
      </Stack.Navigator>

      {/* Show status bar */}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
