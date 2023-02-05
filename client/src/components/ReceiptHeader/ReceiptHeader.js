import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'


const ReceiptHeader = ({name, navigation, destination}) => {
  return (
    <View style={styles.container}>

        <View style={{flex: 1}}/>
    
            
        <Text style = {[styles.title, {flex: 2}]}>
            {name}
        </Text>
        
        <View style={{flex: 1, justifyContent: 'center',}}>
            <TouchableOpacity
                // underlayColor='#E5EFE3'
                style={{justifyContent: 'center', borderRadius: 10, width: '100%', height: '100%',}}
                onPress={() => destination ? navigation.navigate(destination) : navigation.goBack()}>
                    <Text style={styles.closeText}>
                        Close
                    </Text>
            </TouchableOpacity>
        </View>
    </View>

  )
}

export default ReceiptHeader

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
    
  
    // backButton: {
    //     marginTop: Dimensions.get('window').height * 0.07,
    //     marginLeft: 10,
    //     position: 'absolute',
    //     zIndex: 999,
    //     width: 50,
    //     height: 50,
    // },

    closeText: {
        fontWeight: 'bold',
        color: '#3C6F37',
        fontSize: 16,
        textAlign: 'center',
    }

})