import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'

import BackButton from '../BackButton'

const CheckoutHeader = ({name, navigation, destination, subtotal}) => {

    // const {subtotal} = route.params()
    console.log(subtotal)

  return (
    <View style={styles.container}>

        <View style={{flex: 1}}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <BackButton/>
            </TouchableOpacity>
        </View>
    
            
        <Text style = {[styles.title, {flex: 2}]}>
            {name}
        </Text>
        
        <View style={{flex: 1, justifyContent: 'center',}}>
            <TouchableOpacity
                // underlayColor='#E5EFE3'
                style={{justifyContent: 'center', borderRadius: 10, width: '100%', height: '100%',}}
                onPress={() => destination ? navigation.navigate(destination, {subtotal: subtotal}) : navigation.goBack()}>
                    <Text style={styles.closeText}>
                        Receipt
                    </Text>
            </TouchableOpacity>
        </View>
    </View>

  )
}

export default CheckoutHeader

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


    title: {
        fontFamily: 'Roboto_700Bold',
        fontSize: Dimensions.get('window').width * 0.05,
        alignSelf: 'center',
        textAlign: 'center',
        // backgroundColor: 'red'
    },
    
  
    backButton: {
        marginLeft: 20,
        width: 50,
        height: 50,

        justifyContent: 'center',
    },

    closeText: {
        fontWeight: 'bold',
        color: '#3C6F37',
        fontSize: 16,
        textAlign: 'center',
    }

})