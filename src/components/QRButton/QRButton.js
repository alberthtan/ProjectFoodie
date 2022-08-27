import { StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'


const QRButton = ({navigation}) => {
  console.log("Pressed")
  return (
    <TouchableOpacity
      style={styles.container}
      onPress = {() => navigation.navigate('Camera')}>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        borderRadius: 30,
        backgroundColor: '#24891A',
        shadowOpacity: 0.25,
        shadowOffset: {
          width: 0,
          height: 2,
        },
    },
})

export default QRButton