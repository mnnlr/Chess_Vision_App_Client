import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/Home';
import Register from './screens/Register';
import Inital from './screens/Inital';
import Login from './screens/Login';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Login"  options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Register"  options={{ headerShown: false }} component={Register} />
        <Stack.Screen name="Initial"  options={{ headerShown: false }} component={Inital} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
