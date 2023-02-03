import { Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useContext}  from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { LogBox } from 'react-native';

import CustomButton from '../../components/CustomButton'
import CheckoutItem from '../../components/CheckoutItem'
import AddItemsButton from '../../components/AddItemsButton'
import CheckoutSubtotal from '../../components/CheckoutSubtotal'
import CheckoutTaxes from '../../components/CheckoutTaxes'
import CheckoutTotal from '../../components/CheckoutTotal/CheckoutTotal'
import HeaderBar from '../../components/HeaderBar'
import SharedItem from '../../components/SharedItem'
import SwipeBar from '../../components/SwipeBar';

import { Context } from '../../globalContext/globalContext'

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.'])

const CheckoutScreen = ({route, navigation}) => {
  const {subtotal, restaurant_id, table_id, restaurant_name} = route.params

  const [subtotalValue, setSubtotalValue] = useState(subtotal)
  const [serverState, setServerState] = useState('Loading...');

  const globalContext = useContext(Context)
  const { ws, userObj, cart, setCart } = globalContext

  const calculateSubtotal = () => {
    let subtotal = 0
    for(let i=0; i < cart.length; i++) {
        if(!cart[i].isOrdered) {
            if(cart[i].orderedBy == userObj['first_name'] || cart[i].sharedBy.indexOf(userObj['first_name']) != -1) {
                subtotal += cart[i].item.price / (cart[i].sharedBy.length + 1)
            }
        }
    }
    setSubtotalValue(subtotal)
  }

  const checkInOrder = () => {
    for(let i=0; i < cart.length; i++) {
        if(!cart[i].isOrdered && cart[i].orderedBy == userObj['first_name']) {
            return true
        }
    }
    return false
  }

ws.onopen = () => {
    console.log('opening ws in checkout screen')
    setServerState('Connected to the server')
};
ws.onclose = (e) => {
    setServerState('Disconnected. Check internet or server.')
};
ws.onerror = (e) => {
    setServerState(e.message);
};
ws.onmessage = ({data}) => {
    let message = JSON.parse(data)
    let temp = []
    
    for (let i = 0; i < message.cart.length; i++) {
      temp.push(message.cart[i])
    }
    setCart(temp)
};

useEffect(() => {
    calculateSubtotal()
    }
, [])


const handleOrder = async () => {
    for(let i=0; i < cart.length; i++) {
        if(cart[i].orderedBy == userObj['first_name']) {
            // cart.splice(i, 1)
            cart[i].isOrdered = true
        }       
    }
    ws.send(JSON.stringify({table_id: table_id, cart: cart}))
    // ws.close()
    navigation.navigate('Receipt', {subtotal: subtotalValue})
}


const handleShared = (childData) => {
    setSubtotalValue(subtotalValue + childData)
}

const handleDelete = (key) => {
    let i = 0
    while(i < cart.length) {
        if(cart[i].id == key) {
            cart.splice(i, 1)
            break
        } else {
            i++
        }
    }
    setCart(cart)
    ws.send(JSON.stringify({table_id: table_id, cart: cart}))
}

const handleTip = () => {
    navigation.navigate('TipScreen', {subtotal: subtotalValue})
}

let statusbar // based on updating database, true for now
if (true) {
  statusbar = 
  <View>
    <SwipeBar
        onPress={() => navigation.navigate('Receipt', {subtotal: subtotalValue})}/>
  </View>
}

  return (
    <View style = {{flex: 1}}>
      <HeaderBar name='Checkout' navigation= {navigation}>
        </HeaderBar>
        
        <ScrollView showsVerticalScrollIndicator = {false}>

            <Text style = {[styles.totals, {fontWeight: 'bold', fontSize: 18}]}>
                Your Items
            </Text>

            {cart.map(order => (
                (!order.isOrdered && userObj['first_name'] == order.orderedBy) ?
                <CheckoutItem
                    key = {order.id}
                    id = {order.id}
                    navigation = {navigation}
                    name = {order.item.name}
                    price = {order.item.price}
                    sharedBy = {order.sharedBy}
                    parentCallback = {handleDelete}
                /> :
                <></>
            ))}

            <AddItemsButton
                onPress = {() => navigation.navigate('Menu', {subtotal: subtotalValue, table_id: table_id, restaurant_id: restaurant_id, name: restaurant_name})}
            />

            {cart.map(order => 
            (
                (!order.isOrdered && userObj['first_name'] != order.orderedBy) ?
                <SharedItem
                    key = {order.id}
                    order = {order}
                    table_id = {table_id}
                    orderedBy = {order.orderedBy}
                    sharedBy = {order.sharedBy}
                    parentCallback = {handleShared}
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

        <View style = {[styles.orderButton]}>
            <CustomButton
                text = "Go to Tip Page"
                onPress = {() => handleTip()}
            /> 
        </View>

        <View style = {[styles.orderButton]}>
            {checkInOrder() ? 
                <CustomButton
                    text = "Order"
                    onPress = {() => handleOrder()}
                /> :
                <CustomButton
                    text = "Order"
                    type ='DISABLED'
                    disabled={true}
                    onPress = {() => alert("No items in cart!")}
                />
            }
        </View>
        {statusbar}
    </View>
  )
}

export default CheckoutScreen

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