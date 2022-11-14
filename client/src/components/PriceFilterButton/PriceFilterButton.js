import { StyleSheet, Text, Pressable} from 'react-native'
import React , { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PriceFilterButton = ({name}) => {
  const [isPressed, setPressed] = useState(false)
  
  return (
    <Pressable
        style={[styles.dollarButton, isPressed ? styles.green : styles.gray]}
        onPress={() => {setPressed(!isPressed)}} >
        <Text style={styles.text}>{name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    dollarButton: {
        height: 50,
        width: 65,
        alignSelf: "flex-start",
        padding: 15,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 50,
        flex: 1
    },

    text: {
        fontWeight: 'bold',
        fontSize: 13,
        color: 'black',
        textAlign: 'center'
    },

    gray: {
        backgroundColor: '#D9D9D9'
      },
    
    green: {
        backgroundColor: '#3C6F37'
    }
})

export default PriceFilterButton

