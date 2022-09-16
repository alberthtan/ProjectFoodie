import { Alert, View, TextInput, StyleSheet} from 'react-native'
import React from 'react'


const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
        <TextInput
            style={styles.custom}
            value={value}
            // onfocus="if(this.value=='table id')this.value='table id'"
            placeholder = {placeholder}
            onChangeText= {setValue}
            secureTextEntry = {secureTextEntry} />
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEDED', 
        width: '90%',
        height: 40,

        borderRadius: 10,
        borderColor: 'e8e8e8',

        paddingHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'center'
    },

    custom: {
        margin: 5,
    }
})

export default CustomInput