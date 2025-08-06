import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaPrincipal from './views/splash_screen';
import Login from './views/log_in';  // Descomentado para activar Login
import SignUp from './views/sign_up'; // Descomentado para activar SignUp
import Home from './views/HomePage';  
import Alfabeto from './views/Alfabeto';
import Diccionario from './views/diccionario'; 
import Traductor from './views/traductor'; 
import LoginWithGoogle from './views/script/LoginWithGoogle'; // Descomentado para activar LoginWithGoogle

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

        {/* Pantalla de Login activada */}
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

        {/* Pantalla de SignUp activada */}
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

        {/* Pantalla de Home activada */}
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

        {/* Pantalla de Alfabeto activada */}
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

        {/* Pantalla de Diccionario activada */}
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

        {/* Pantalla de Traductor activada */}
        <Stack.Screen
          name="Traductor"
          component={Traductor}
          options={{ 
            title: 'Traductor',
            headerStyle: { backgroundColor: '#033552' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontFamily: 'Roboto', 
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        {/* Pantalla de LoginWithGoogle activada */}
        <Stack.Screen
          name="LoginWithGoogle"
          component={LoginWithGoogle} // Pantalla de Login con Google activada
        />
      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
