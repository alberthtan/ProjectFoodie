import { View, Text , StyleSheet, Pressable, TouchableOpacity, TouchableHighlight} from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text, type = "PRIMARY", disabled}) => {
  return (
    <TouchableHighlight
      onPress={onPress} 
      underlayColor="#A8BDA6"
      disabled={disabled}
      style={[styles.container, !disabled ? styles['container_' + type]: styles['container_DISABLED']]}>
      <Text style={[styles.text, !disabled ? styles['text_' + type]: styles['text_DISABLED']]}>{text}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '95%',
      padding: 12,
      marginVertical: 10,
      alignItems: 'center',
      borderRadius: 10,
    },

    container_PRIMARY: {
      backgroundColor: '#3C6F37',
    },

    container_MAP: {
      backgroundColor: '#3C6F37',
    },

    container_LOGIN: {
      backgroundColor: '#DDF5DB'
    },

    container_DISABLED: {
      backgroundColor: '#D2E2D0'
    },

    text: {
      fontWeight: 'bold',
      fontSize: 18
    },

    text_PRIMARY: {
      color: 'white',
    },

    text_MAP: {
      color: 'white',
      fontSize: 12
    },

    text_TERTIARY: {
      color: '#3C6F37'
    },

    text_LOGIN: {
      color: '#3C6F37'
    },

    text_DISABLED: {
      color: '#3C6F37'
    }
})

export default CustomButton