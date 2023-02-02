import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text } from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from './src/globalContext/globalContext.js'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen'
// import useFonts from './src/globalContext/useFonts';
import {useFonts, Jost_400Regular,  Jost_700Bold,} from '@expo-google-fonts/jost'
import {Roboto_700Bold,} from '@expo-google-fonts/roboto'

import Navigator from './src/navigation/navigator.js'
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function App () {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_700Bold,
    Roboto_700Bold,
  });
  // const [IsReady, SetIsReady] = useState(false);

  // const LoadFonts = async () => {
  //   await  Font.loadAsync({
  //   'Jost': require('./assets/fonts/Jost-Regular.ttf')})
  // };

  // if (!IsReady) {
  //   return (
  //     <AppLoading
  //       startAsync={LoadFonts}
  //       onFinish={() => {
  //         SetIsReady(true)
  //         console.log("done loading")
  //       }}
  //       onError={() => {}}
  //     />
  //   );
  // }
  if (!fontsLoaded) {
    return <AppLoading />; }

    return(
      <Provider>
        <NavigationContainer> 
            <Navigator/>
            <StatusBar/>
        </NavigationContainer>
      </Provider>
    );
}