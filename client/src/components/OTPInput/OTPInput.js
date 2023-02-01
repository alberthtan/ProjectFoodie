import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

function OTPInputHelper ({value, onChangeText, autoFocus, editable, onKeyPress}, ref) {
  return (
    <TextInput
        style={styles.container}
        // value={value}
        maxLength={1}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        keyboardType="number-pad"
        ref={ref}
        editable={editable}
        onKeyPress={onKeyPress}
    />   
  )
}

const OTPInput = React.forwardRef(OTPInputHelper);

const styles = StyleSheet.create({
    container: {
        height: 54, 
        width: 46,
        margin: 6,
        backgroundColor: '#EEEEEE', 
        borderColor: '#D9D0E3',
        borderWidth: 1,
        borderRadius: 15,
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 20
    }
})

export default OTPInput