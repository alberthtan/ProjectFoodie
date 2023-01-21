import { StyleSheet } from 'react-native';
import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from '../navigation/tabs'

//screens
import CameraScreen from '../screens/CameraScreen';
import MenuScreen from '../screens/MenuScreen';
import ItemScreen from '../screens/ItemScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import LoginHomeScreen from '../screens/LoginScreens/LoginHomeScreen';
import LoginScreen1 from '../screens/LoginScreens/LoginScreen1';
import LoginScreen2 from '../screens/LoginScreens/LoginScreen2';
import RegisterScreen1 from '../screens/LoginScreens/RegisterScreen1';
import RegisterScreen2 from '../screens/LoginScreens/RegisterScreen2';
import RegisterScreen3 from '../screens/LoginScreens/RegisterScreen3';
import RegisterScreen4 from '../screens/LoginScreens/RegisterScreen4';
import EditProfileScreen from '../screens/ProfileScreens/EditProfileScreen';
import PastOrdersScreen from '../screens/ProfileScreens/PastOrdersScreen';
import PaymentScreen from '../screens/ProfileScreens/PaymentScreen';
import AddPaymentScreen from '../screens/ProfileScreens/AddPaymentScreen';

import {Context} from "../globalContext/globalContext.js";

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const globalContext = useContext(Context)
    const { isLoggedIn, setIsLoggedIn, userObj, setUserObj, setToken } = globalContext

  return (
    <Stack.Navigator initialRouteName='LoginHome'>
      {(!isLoggedIn)?
      <>
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
        <Stack.Screen
          options={{headerShown: false}}
          name="Register2"
          component={RegisterScreen2}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="Register3"
          component={RegisterScreen3}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="Register4"
          component={RegisterScreen4}/>
        </>
        :

        <>
        <Stack.Screen
          options={{headerShown: false, gestureEnabled: false}}
          name="HomeTabs"
          component={Tabs}/>
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
          name="EditProfile"
          component={EditProfileScreen}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="PastOrders"
          component={PastOrdersScreen}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="Payments"
          component={PaymentScreen}/>
        <Stack.Screen
          options={{headerShown: false, gestureDirection: 'vertical'}}
          name="AddPayment"
          component={AddPaymentScreen}/>

         </>
         }
      </Stack.Navigator>
  )
}

export default Navigator