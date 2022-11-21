import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'

import BackButton from '../BackButton'

const HeaderBar = ({name, navigation, destination}) => {
  return (
    <>
         <TouchableOpacity
            style={styles.backButton}
            onPress={() => destination ? navigation.navigate(destination) : navigation.goBack()}>
                <BackButton/>
        </TouchableOpacity>
            
        <View style = {styles.container}>
            <Text style = {styles.checkout}>
                {name}
            </Text>
        </View>
    </>
  )
}

export default HeaderBar

const styles = StyleSheet.create({
    container: {
        marginTop: Dimensions.get('window').height * 0.07,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
        alignSelf: 'center',
        width: '100%'
    },

    backButton: {
        marginTop: Dimensions.get('window').height * 0.07,
        marginLeft: 10,
        position: 'absolute',
        zIndex: 999,
    },

    checkout: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
    },

})