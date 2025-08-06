import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google'; // Import Google Login
import { useNavigation } from '@react-navigation/native'; // For navigation
import { View, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginWithGoogle = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  // Handle successful login
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      // Fetch the token from the response
      const token = credentialResponse.credential;
      console.log('Received token:', token); // You can check the token in the console

      // Send the token to the backend to authenticate the user
      const res = await axios.post('https://507fe4cf6477.ngrok-free.app/auth/google', { token });
      
      // Save the user token to AsyncStorage
      await AsyncStorage.setItem('userToken', res.data.token);

      // Store the user data
      setUser(res.data.user);

      // Navigate to Home page after successful login
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login Error: ', error);
    }
  };

  // Handle login failure
  const handleLoginFailure = (error) => {
    console.error('Login Failed: ', error);
  };

  return (
    <View>
      <Text>Login with Google</Text>
      <GoogleLogin
        onSuccess={handleLoginSuccess}  // Success callback
        onError={handleLoginFailure}    // Error callback
        clientId="845168585937-nmcgnisso84eancpnkj9fs4vp4ba8mqp.apps.googleusercontent.com" // Replace with actual client ID
      />
      
      {/* Display user info after login */}
      {user && (
        <View>
          <Text>Welcome, {user.name}!</Text>
          <Text>{user.email}</Text>
        </View>
      )}
    </View>
  );
};

export default LoginWithGoogle;
