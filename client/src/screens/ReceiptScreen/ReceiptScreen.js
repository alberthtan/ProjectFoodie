import { Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useContext}  from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { LogBox } from 'react-native';

import CustomButton from '../../components/CustomButton'
import CheckoutItem from '../../components/CheckoutItem'
import CheckoutSubtotal from '../../components/CheckoutSubtotal'
import CheckoutTaxes from '../../components/CheckoutTaxes'
import CheckoutTotal from '../../components/CheckoutTotal/CheckoutTotal'
import ReceiptHeader from '../../components/ReceiptHeader'

import { Context } from '../../globalContext/globalContext'

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.'])

const ReceiptScreen = ({route, navigation}) => {
  const {subtotal} = route.params

  const [subtotalValue, setSubtotalValue] = useState(subtotal)

  const globalContext = useContext(Context)
  const { ws, userObj, cart, setCart } = globalContext

  const calculateSubtotal = () => {
    let subtotal = 0
    for(let i=0; i < cart.length; i++) {
        if(cart[i].isOrdered) {
            if(cart[i].orderedBy == userObj['first_name'] || cart[i].sharedBy.indexOf(userObj['first_name']) != -1) {
                subtotal += cart[i].item.price / (cart[i].sharedBy.length + 1)
            }
        }
    }
    setSubtotalValue(subtotal)
  }

ws.onmessage = ({data}) => {
    let message = JSON.parse(data)
    let temp = []
    
    for (let i = 0; i < message.length; i++) {
      temp.push(message[i])
    }
    setCart(temp)
};

useEffect(() => {
    calculateSubtotal()
    }
, [])

  return (
    <View style = {{flex: 1}}>
      <ReceiptHeader name='Receipt' navigation={navigation}/>
        
        <ScrollView showsVerticalScrollIndicator = {false}>

            <Text style = {[styles.totals, {fontWeight: 'bold', fontSize: 18}]}>
                Your Items
            </Text>

            {cart.map(order => (
                (order.isOrdered && (userObj['first_name'] == order.orderedBy)) ?
                <CheckoutItem
                    key = {order.id}
                    id = {order.id}
                    navigation = {navigation}
                    name = {order.item.name}
                    price = {order.item.price}
                    sharedBy = {order.sharedBy}
                    parentCallback = {null}
                /> :
                <></>
            ))}

            {cart.map(order => (
                (order.isOrdered && order.sharedBy.indexOf(userObj['first_name']) != -1) ?
                <CheckoutItem
                    key = {order.id}
                    id = {order.id}
                    navigation = {navigation}
                    name = {order.item.name}
                    price = {order.item.price}
                    sharedBy = {order.sharedBy}
                    parentCallback = {null}
                /> :
                <></>
            ))}

            <View style = {{marginTop: 20}}>
                <CheckoutSubtotal
                    subtotal = {subtotalValue}/>

                <CheckoutTaxes
                    subtotal = {subtotalValue}
                    taxRate = {0.08}/>
                
                <CheckoutTotal
                    subtotal={subtotalValue}
                    taxRate={0.08}/>
            </View>

            <View style = {{marginTop: 30}}/>
        </ScrollView>
    </View>
  )
}

export default ReceiptScreen

const styles = StyleSheet.create({
    orderButton:{
        height: Dimensions.get('window').height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
    },

    totals: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 15
    },

    rectangle: {
        width: 200,
        height: 30,
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
      },
})