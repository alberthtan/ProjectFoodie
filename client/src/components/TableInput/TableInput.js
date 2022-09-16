import { View, Text, TextInput, StyleSheet, Button} from 'react-native'
import React from 'react'

const TableInput = ({value, setValue, placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        // onfocus="if(this.value=='table id')this.value='table id'"
        placeholder = {placeholder}
        onChangeText={setValue}
        keyboardType='number-pad'
        returnKeyType='done'
        maxLength={7}>
        {/* <Button>Hi</Button> */}
      </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        width: 100,

        borderColor: 'e8e8e8',
        borderWidth: 0,
        borderRadius: 10,
        marginVertical: 30,
    },

    input: {
      alignSelf: 'center',
      margin: 5
    },
})

export default TableInput