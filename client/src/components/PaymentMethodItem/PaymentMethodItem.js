import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image} from 'react-native'
import React, {useContext} from 'react'
import NumberFormat from 'react-number-format'
import trashIcon from '../../../assets/icons/trash.png'

import { Context } from '../../globalContext/globalContext'

const PaymentMethodItem = ({navigation, id, cardEndDigits, cardType, cardCompany, bankCompany, handleDelete}) => {

    const globalContext = useContext(Context)
    const { userObj, getToken } = globalContext

    const deletePayment = async () => {
        let token = await getToken('access')
        authorization = "Bearer".concat(" ", token)
        return fetch('https://dutch-pay-test.herokuapp.com/delete-card/' + id + '/', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: authorization,
            },
          })
          .then(response => response.json())
          .then(
            handleDelete(id)
          )
          .catch(error => {
              console.error(error);
          });
    }


    return (
        <View style = {styles.container}>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                <View style={{width: '20%', borderRadius: 30,}}>
                    <Image style= {{width: 65, height: 50, borderRadius: 10}} source={{uri: 'https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo-1992.png'}}/>
                </View>
                <View style = {{width: '63%'}}>
                    {/* <Text style = {{fontWeight: 'bold'}}>{bankCompany}</Text> */}
                    <Text style = {styles.cardType}>
                         ....{cardEndDigits}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={deletePayment}>
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