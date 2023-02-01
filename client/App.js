import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, {Component, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from './src/globalContext/globalContext.js'
import { io } from "socket.io-client"

import Navigator from './src/navigation/navigator.js'

export default function App () {

    return(
      <Provider>
        <NavigationContainer> 
            <Navigator/>
            <StatusBar/>
        </NavigationContainer>
      </Provider>
    );
}