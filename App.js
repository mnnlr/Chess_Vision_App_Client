import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/Home';
import Register from './screens/Register';
import SettingsScreen from './screens/SettingsScreen';
import Inital from './screens/Inital';
import Login from './screens/Login';
import Theame from './componenet/Theame';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/Store';

const Stack = createStackNavigator();

function AppNavigator() {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
          <Stack.Screen name="Initial" options={{ headerShown: false }} component={Inital} />
          <Stack.Screen name='Setting' component={SettingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Theame' component={Theame} options={{ headerShown: false }} />
        </Stack.Navigator>
        <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
