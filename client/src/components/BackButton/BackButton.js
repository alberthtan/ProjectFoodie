import { StyleSheet, Image} from 'react-native'
import React from 'react'
import backIcon from '../../../assets/icons/backicon.png'

const BackButton = () => {
  return (
    <Image source={backIcon} resizeMode="contain" style={styles.button}/>
  )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        width: 18,
        height: 18,
        // alignSelf:'center',
        justifyContent: 'center',
        // flex: 1,
        // tintColor: '#000000',
    }
})