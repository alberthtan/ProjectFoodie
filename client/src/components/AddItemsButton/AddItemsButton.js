import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const AddItemsButton = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress} 
      style={styles.container}>
      <Text style={styles.text}> + Add Items</Text>
    </TouchableOpacity>
  )
}

export default AddItemsButton

const styles = StyleSheet.create({
    container: {
        width: '30%',
        padding: 15,
        marginTop: 30,
        marginLeft: 20,
        borderRadius: 5,
        backgroundColor: '#3C6F37',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'center',
        flex: 1,
    },
})