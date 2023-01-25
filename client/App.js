import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, {Component, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from './src/globalContext/globalContext.js'
import { io } from "socket.io-client"

import Navigator from './src/navigation/navigator.js'

export default function App () {
//   constructor() {
//     super();

//     this.state = {
//         echo: ''
//     };
// }

// componentDidMount() {
//     var socket = new WebSocket('ws://172.26.116.191:8000/');

//     socket.onopen = () => socket.send('hello');

//     socket.onmessage = ({data}) => {
//         console.log(data);

//         // this.setState({echo: data});

//         // setTimeout(() => {
//         //     socket.send(new Date().toGMTString());
//         // }, 3000);
//     }
// }
  // render (){
    return(
    <Provider>
    <NavigationContainer style={styles.container}>
      <Navigator/>
      <StatusBar/>
    </NavigationContainer>
      </Provider>
    );
    // )};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
});
