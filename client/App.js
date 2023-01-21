import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from './src/globalContext/globalContext.js'

import Navigator from './src/navigation/navigator.js'

export default function App() {
  console.log("App Executed")

  return (
    <Provider>
    <NavigationContainer style={styles.container}>
      <Navigator/>
      <StatusBar/>
    </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
});
