import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {lazy, Suspense} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './src/navigation/tabs'

//screens
// import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import MenuScreen from './src/screens/MenuScreen';
import ItemScreen from './src/screens/ItemScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import LoginHomeScreen from './src/screens/LoginScreens/LoginHomeScreen';
import LoginScreen1 from './src/screens/LoginScreens/LoginScreen1';
import LoginScreen2 from './src/screens/LoginScreens/LoginScreen2';
import RegisterScreen1 from './src/screens/LoginScreens/RegisterScreen1';
import RegisterScreen2 from './src/screens/LoginScreens/RegisterScreen2';
import RegisterScreen3 from './src/screens/LoginScreens/RegisterScreen3';

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App Executed")
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName='LoginHome'>
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="SignIn"
          component={SignInScreen} /> */}
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeTabs"
          component={Tabs}/>
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}/> */}
        <Stack.Screen
          options={{headerShown: false, gestureDirection: 'vertical'}}
          name="Camera"
          component={CameraScreen}/>
        <Stack.Screen
          options={{headerShown: false, gestureEnabled: false}}
          name="Menu"
          component={MenuScreen}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="Item"
          component={ItemScreen}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="Checkout"
          component={CheckoutScreen}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="RestaurantScreen"
          component={RestaurantScreen}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="LoginHome"
          component={LoginHomeScreen}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="Login1"
          component={LoginScreen1}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="Login2"
          component={LoginScreen2}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="Register1"
          component={RegisterScreen1}/>
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="Register2"
          component={RegisterScreen2}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="Register3"
          component={RegisterScreen3}/> */}
      </Stack.Navigator>
      <StatusBar/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    // justifyContent: 'center',
  },
});
