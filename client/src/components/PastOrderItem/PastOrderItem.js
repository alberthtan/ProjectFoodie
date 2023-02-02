import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image, TouchableHighlight, Dimensions} from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'

const PastOrderItem = ({navigation, restaurantName, transactionDate, sharedBy, restaurantImage}) => {
  return (
    <TouchableHighlight
        style = {styles.container}
        // onPress = {() => navigation.navigate('RestaurantScreen')}>
        underlayColor='#E5EFE3'
        onPress = {() => navigation.navigate('Receipt2', {subtotal: 0})}>
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            
            <View style={{width: '20%', borderRadius: 30, left: 10}}>
                <Image style= {{width: 78, height: 60, borderRadius: 10}} source={{uri: restaurantImage}}/>
            </View>
            <View style = {{width: '65%', marginLeft: '5%'}}>
                <Text style = {styles.restaurantName}>{restaurantName}</Text>
                <Text style = {styles.transactionDate}>
                    {transactionDate}
                </Text>
                <Text style = {styles.sharedBy}>
                    <Text style={{fontWeight: 'normal'}}>Shared with </Text>{sharedBy}
                </Text>
            </View>
            {/* <TouchableOpacity style={styles.receipt} onPress={() => console.log("receipt pressed")}>
                <Text style={styles.text}>Receipt</Text>
            </TouchableOpacity> */}
        </View>
    
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        height: Dimensions.get('window').height * 0.113,
        flex: 1,
    },

    restaurantName: {
        fontWeight: 'bold',
        fontSize: 15,
        // width: '95%'
    },

    transactionDate: {
        // fontWeight: 'bold',
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 5,
    },

    sharedBy: {
        fontSize: 12,
        fontWeight: 'bold'
    },

    receipt: {
        // width: '20%',
        borderRadius: 15,
        // marginRight: 10
        // alignSelf: "flex-end",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3C6F37',
        // height: 30,
        // marginTop: 15,
        height: '60%'
        
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        alignSelf: 'center'
    }
})

export default PastOrderItem