import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'
import trashIcon from '../../../assets/icons/trash.png'

const PaymentMethodItem = ({navigation, cardEndDigits, cardType, cardCompany, bankCompany}) => {
  return (
    <View style = {styles.container}>
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <View style={{width: '20%', borderRadius: 30,}}>
                <Image style= {{width: 65, height: 50, borderRadius: 10}} source={{uri: 'https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo-1992.png'}}/>
            </View>
            <View style = {{width: '63%'}}>
                <Text style = {{fontWeight: 'bold'}}>{bankCompany}</Text>
                <Text style = {styles.cardType}>
                    {cardType} ....{cardEndDigits}
                </Text>
            </View>
            <TouchableOpacity>
                <Image source={trashIcon} resizeMode="contain" style={styles.trash}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginLeft: 20,
        width: '100%',
        justifyContent: 'center',
        height: 60,
        flex: 1
    },

    restaurantName: {
        fontWeight: 'bold',
        fontSize: 18,
    },

    transactionDate: {
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 5,
    },

    trash: {
        width: 20,
        height: 20,
        alignSelf:'center',
        justifyContent: 'flex-end',
        tintColor: '#000000',
    },
    
    text: {
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        alignSelf: 'center'
    }
})

export default PaymentMethodItem