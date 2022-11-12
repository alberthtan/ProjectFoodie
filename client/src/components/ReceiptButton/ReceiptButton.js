import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ReceiptButton = ({onPress, name}) => {
  return (
    <TouchableOpacity
      onPress={onPress} 
      style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  )
}

export default ReceiptButton

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        padding: 15,
        marginTop: 30,
        marginLeft: 20,
        borderRadius: 30,
        backgroundColor: '#D9D9D9',
    },

    text: {
        fontWeight: 'bold',
        color: 'black',
    },
})