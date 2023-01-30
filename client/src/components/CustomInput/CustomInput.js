import { Alert, View, TextInput, StyleSheet} from 'react-native'
import React from 'react'


const CustomInput = ({value, setValue, placeholder, autoFocus, keyboardType, secureTextEntry, returnKeyType}) => {
  return (
    <View style={styles.container}>
        <TextInput
            style={styles.custom}
            value={value}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            placeholder = {placeholder}
            onChangeText= {setValue}
            secureTextEntry = {secureTextEntry}
            returnKeyType={returnKeyType}/>
   </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e3e3e3', 
        width: '95%',
        height: 40,

        borderRadius: 10,
        borderColor: 'e8e8e8',
        // borderWidth: 0.4,

        paddingHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'center'
    },

    custom: {
        margin: 5,
    }
})

export default CustomInput