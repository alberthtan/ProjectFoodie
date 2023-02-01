import { Alert, View, TextInput, StyleSheet, Dimensions} from 'react-native'
import React from 'react'


function Input ({value, setValue, placeholder, autoFocus, keyboardType, secureTextEntry, returnKeyType, onSubmitEditing, autoCapitalize, enablesReturnKeyAutomatically, autoCorrect}, ref) {
  return (
    <View style={styles.container}>
        <TextInput
            style={styles.custom}
            value={value}
            autoFocus={autoFocus}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            placeholder = {placeholder}
            onChangeText= {setValue}
            secureTextEntry = {secureTextEntry}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            autoCorrect={autoCorrect}
            ref={ref}
        />
   </View>
  )
}

const CustomInput = React.forwardRef(Input);

// WARNING: DON'T MODIFY MARGINS AND PADDING
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEEEE', 
        width: '95%',
        height: Dimensions.get('window').height * 0.055,

        borderRadius: 10,
        borderColor: 'e8e8e8',

        paddingHorizontal: 10,
        marginVertical: 12,
        justifyContent: 'center'
        
    },

    custom: {
        marginLeft: 5, 
        height: '100%'
    }
})

export default CustomInput