import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {lazy, Suspense} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import MenuScreen from './src/screens/MenuScreen';
import ItemScreen from './src/screens/ItemScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App Executed")
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName='SignIn'>
          <Stack.Screen
            options={{headerShown: false}}
            name="SignIn"
            component={SignInScreen} />
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreen}/>
          <Stack.Screen
            options={{headerShown: false}}
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
        </Stack.Navigator>
        <StatusBar style="auto" />  
      </NavigationContainer>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    // justifyContent: 'center',
  },
});
