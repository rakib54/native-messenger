import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddChat from './components/AddChat';

const Stack = createStackNavigator()

const globalScreenOption = {
  headerStyle: {
    backgroundColor: '#2C6BED'
  
  },
  headerTitleStyle: {
    color: 'white',
  },
  headerTintColor: 'white'
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      // initialRouteName="Home" 
      screenOptions={globalScreenOption}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddChat" component={AddChat} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
