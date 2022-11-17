import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'

const PastOrderItem = ({navigation, restaurantName, transactionDate, status}) => {
  return (
    <TouchableOpacity
        style = {styles.container}
        // onPress = {() => navigation.navigate('RestaurantScreen')}>
        onPress = {() => console.log('area pressed')}>
        <View style={{flexDirection: 'row', width: '100%'}}>
            
            <View style={{width: '20%', height: 60, borderRadius: 30, marginRight: 15}}>
                <Image style= {{width: 78, height: 60, borderRadius: 10}} source={{uri: 'https://www.kikkoman.eu/fileadmin/_processed_/0/0/csm_WEB_Traditional_Fukuoka_Ramen_646cd39e6b.jpg'}}/>
            </View>
            <View style = {{width: '50%'}}>
                <Text style = {styles.restaurantName}>{restaurantName}</Text>
                <Text style = {styles.transactionDate}>
                    {transactionDate}
                </Text>
                <Text style = {styles.status}>
                    {status}
                </Text>
            </View>
            <TouchableOpacity style={styles.receipt} onPress={() => console.log("receipt pressed")}>
                <Text style={styles.text}>Receipt</Text>
            </TouchableOpacity>
        </View>
    
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginLeft: 10,
        width: '100%',
        justifyContent: 'center',
        height: 60,
        flex: 1
    },

    restaurantName: {
        fontWeight: 'bold',
        fontSize: 18,
        // width: '95%'
    },

    transactionDate: {
        // fontWeight: 'bold',
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 5,
    },

    status: {
        fontSize: 14,
        color: 'green',
    },

    receipt: {
        // width: '20%',
        borderRadius: 15,
        // marginRight: 10
        // alignSelf: "flex-end",
        justifyContent: 'center',
        backgroundColor: '#3C6F37',
        height: 30,
        marginTop: 15,
        // height: '60%'
        
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        justifyContent: 'center'
    }
})

export default PastOrderItem