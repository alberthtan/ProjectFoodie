import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image} from 'react-native'
import React, {useContext} from 'react'
import NumberFormat from 'react-number-format'
import trashIcon from '../../../assets/icons/trash.png'

import { Context } from '../../globalContext/globalContext'
import * as Haptics from 'expo-haptics'
import cardIcon from '../../../assets/icons/payment.png'

const PaymentMethodItem = ({id, cardEndDigits, defaultPaymentMethodID, setDefaultPaymentMethodID, cardCompany, handleDelete}) => {

    const globalContext = useContext(Context)
    const { getToken } = globalContext

    const setDefaultPayment = async() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        let token = await getToken('access')
        authorization = "Bearer".concat(" ", token)
        console.log("SET DEFAULT")
        return fetch('https://dutch-pay-test.herokuapp.com/update_default_payment_method/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: authorization,
            },
            body: JSON.stringify({
                pk: id
            })
          })
          .then(response => response.json())
          .then(
            setDefaultPaymentMethodID(id)
          )
          .catch(error => {
              console.error(error);
          });
    }

    const deletePayment = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
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
                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{ borderRadius: 30, marginLeft: 10}}>
                    <Image style= {{width: 25, height: 25}} source={cardIcon}/>
                </View>
                <View style = {{paddingLeft: 15,  justifyContent: 'center'}}>
                    {/* <Text style = {{fontWeight: 'bold'}}>{bankCompany}</Text> */}
                    <Text style = {styles.cardType}>
                         ••••{cardEndDigits} 
                    </Text>
                </View>
                </View>
                {(id !== defaultPaymentMethodID) ? 
                    <TouchableOpacity style={{flex: 3}}
                        onPress={setDefaultPayment}>
                        <Text style = {[styles.nondefault]}>
                            SET 
                        </Text>
                    </TouchableOpacity> : 
                    <View style={{flex: 3}}>
                        <Text style = {[styles.default]}>
                            DEFAULT 
                        </Text>
                    </View>
                }
                <TouchableOpacity style={{flex: 1}}
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
        justifyContent: 'center',
        tintColor: '#000000',
    },
    
    text: {
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        alignSelf: 'center'
    },

    default: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginLeft: '50%'
    },

    nondefault: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginLeft: '50%'
    },
    cardType: {
        fontWeight: 'bold'
    }
})

export default PaymentMethodItem