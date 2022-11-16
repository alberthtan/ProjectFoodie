import { View, Text , StyleSheet, Pressable, TouchableOpacity} from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text, type = "PRIMARY"}) => {
  return (
    <TouchableOpacity
      onPress={onPress} 
      style={[styles.container, styles['container_' + type]]}>
      <Text style={[styles.text, styles['text_' + type]]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',

        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 10,

    },

    container_PRIMARY: {
      backgroundColor: '#3C6F37',
    },

    container_TERTIARY: {},

    text: {
        fontWeight: 'bold',
        color: 'white'
    },

    text_TERTIARY: {
      color: 'gray'
    }
})

export default CustomButton