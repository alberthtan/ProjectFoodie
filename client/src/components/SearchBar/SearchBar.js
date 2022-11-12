import { Alert, View, TextInput, StyleSheet, Image} from 'react-native'
import React from 'react'

import searchIcon from '../../../assets/icons/search.png'


const SearchBar = ({value, setValue, placeholder}) => {
  return (
    // <View style={styles.container}>
    <View style={styles.container}>
        <Image source={searchIcon} style={styles.searchIcon}/>
        <TextInput
            style={styles.input}
            placeholder= {placeholder}
            onChangeText={setValue}
            value={value}
            // underlineColorAndroid="transparent"
        >
        </TextInput>


    </View>
    )


    //     {/* <TextInput
    //         style={styles.search}
    //         value={value}
    //         // onfocus="if(this.value=='table id')this.value='table id'"
    //         placeholder = {placeholder}
    //         onChangeText= {setValue}>
    //             <Image></Image>
    //     </TextInput> */}
    //   {/* </View> */}
//   )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEDED', 
        width: '80%',
        height: 50,

        borderRadius: 30,
        borderColor: 'e8e8e8',
        backgroundColor: '#fff',

        paddingHorizontal: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',

        flexDirection: 'row',
    },

    searchIcon: {
        height: 10,
        width: 10,
        padding: 10,
        justifyContent: 'center',
        marginLeft: 10
    },

    input: {
        margin: 15,
        flex: 1,
    },
})

export default SearchBar