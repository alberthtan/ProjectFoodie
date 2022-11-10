import { Dimensions, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const StatusBar = ({onPress}) => {
  return (
    <Pressable style={styles.rectangle} onPress={onPress}>
        <Text style={styles.message}>
            Order Received
        </Text>
    </Pressable>
  )
}

export default StatusBar

const styles = StyleSheet.create({
    rectangle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.12,
        backgroundColor: '#D9D9D9',
        position:'absolute'
      },

    message: {
        position: 'absolute',
        fontSize: 15,
        fontWeight:"bold",
        marginTop: Dimensions.get('window').height * 0.12 * 0.7,
        marginLeft: 10,
    }
})