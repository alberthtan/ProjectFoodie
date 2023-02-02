import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'

import BackButton from '../BackButton'

const HeaderBar = ({name, navigation, destination}) => {
  return (
    <View style={styles.container}>
        <View style={{flex: 1, alignSelf: 'center'}}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => destination ? navigation.navigate(destination) : navigation.goBack()}>
                <BackButton/>
            </TouchableOpacity>
        </View>
         
        <Text style = {styles.title}>
            {name}
        </Text>

        <View style={{flex: 1}}></View>
    </View>
  )
}

export default HeaderBar

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row', 

        width: '100%',
        height: Dimensions.get('window').height * 0.12,

        paddingTop: Dimensions.get('window').height * 0.06,
        paddingBottom: 5,

        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',

        shadowColor: '#171717',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: {width: 0, height:10},

        backgroundColor: '#f6f5f5',

        
    },

    backButton: {
        marginLeft: 20,
        width: 50,
        height: 50,

        justifyContent: 'center',
        // alignContent: 'center',
        // alignSelf: 'center',
        // backgroundColor: 'blue'
    },

    title: {
        fontFamily: 'Roboto_700Bold',
        flex: 6,
        fontSize: Dimensions.get('window').width * 0.055,
        alignSelf: 'center',
        textAlign: 'center',
        // backgroundColor: 'red'
    },

})