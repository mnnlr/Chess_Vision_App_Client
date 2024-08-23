import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/Home';
import Register from './screens/Register';
import SettingsScreen from './screens/SettingsScreen';
import Inital from './screens/Inital';
import Login from './screens/Login';
import ProfileScreen from './screens/ProfileScreen';

import PersonAddScreen from './screens/PersonAddScreen';
import GameScreen from './chessBoard/GameScreen';
import Background from './chessBoard/Background';
import Board from './chessBoard/Board';
import Piece from './chessBoard/Piece';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Login"  options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Register"  options={{ headerShown: false }} component={Register} />
        <Stack.Screen name="Initial"  options={{ headerShown: false }} component={Inital} />
        <Stack.Screen name='Setting' component={SettingsScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Game' component={GameScreen} options={{headerShown:false}}/>
        <Stack.Screen name='PersonAddSection' component={PersonAddScreen} options={{headerShown:false}}/>
        {/* <Stack.Screen name='Background' component={Background}/>
        <Stack.Screen name='Board' component={Board}/>
        <Stack.Screen name='Piece' component={Piece}/> */}

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
