import { StatusBar } from 'expo-status-bar';
 import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaPrincipal from './views/splash_screen'; 
// import Login from './views/log_in';  
// import SignUp from './views/sign_up'; // Desactivado temporalmente
import Home from './views/HomePage';  
import Alfabeto from './views/Alfabeto';
import Diccionario from './views/diccionario'; // Importar el componente Diccionario

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

        {/* 
        <Stack.Screen
          name="Login"
          component={Login}
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
        */}

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
        <Stack.Screen
          name="Diccionario"
          component={Diccionario}  
          options={{ 
            title: 'Diccionario',
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
