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
import WebsocketController from '../../websocket/websocket'
import { Context } from '../../globalContext/globalContext'

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.'])

const CheckoutScreen = ({route, navigation}) => {
  const {subtotal, restaurant_id, table_id, restaurant_name} = route.params

  const [subtotalValue, setSubtotalValue] = useState(subtotal)
  const [serverState, setServerState] = useState('Loading...');

  const globalContext = useContext(Context)
  const { userObj, cart, setCart } = globalContext

  const calculateSubtotal = () => {
    let subtotal = 0
    for(let i=0; i < cart.length; i++) {
        if(cart[i].orderedBy == userObj['first_name'] || cart[i].sharedBy.indexOf(userObj['first_name']) != -1) {
            subtotal += cart[i].item.price / (cart[i].sharedBy.length + 1)
        }
    }
    setSubtotalValue(subtotal)
  }

  const checkInOrder = () => {
    for(let i=0; i < cart.length; i++) {
        if(cart[i].orderedBy == userObj['first_name']) {
            return true
        }
    }
    return false
  }


let controller = new WebsocketController();
var ws = controller.ws;

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


const submitMessage = async () => {
    let i = 0
    while(i < cart.length) {
        if(cart[i].orderedBy == userObj['first_name']) {
            cart.splice(i, 1)
        } else {
            i++
        }
        
    }
    ws.send(JSON.stringify({table_id: table_id, cart: cart}))
    // ws.close()
    navigation.navigate('Home', {ordered: true})
}


const handleCallback = (childData) => {
    setSubtotalValue(subtotalValue + childData)
}

  return (
    <View style = {{flex: 1}}>
      <HeaderBar name='Checkout' navigation= {navigation}/>
        
        <ScrollView showsVerticalScrollIndicator = {false}>

            <Text style = {[styles.totals, {fontWeight: 'bold', fontSize: 18}]}>
                Your Items
            </Text>

            {cart.map(order => (
                (userObj['first_name'] == order.orderedBy) ?
                <CheckoutItem
                    key = {order.id}
                    navigation = {navigation}
                    name = {order.item.name}
                    price = {order.item.price}
                    sharedBy = {order.sharedBy}
                /> :
                <></>
            ))}

            <AddItemsButton
                onPress = {() => navigation.navigate('Menu', {subtotal: subtotalValue, table_id: table_id, restaurant_id: restaurant_id, name: restaurant_name})}
            />

            {/* {sharedCart.map(item => (
                (userObj['first_name'] != item.orderedBy) ?
                <CheckoutItem
                    key = {item.id}
                    navigation = {navigation}
                    name = {item.item.name}
                    price = {item.item.price}
                /> 
                :
                <></>
            ))} */}

            {cart.map(order => 
            (
                (userObj['first_name'] != order.orderedBy) ?
                <SharedItem
                    key = {order.id}
                    order = {order}
                    table_id = {table_id}
                    orderedBy = {order.orderedBy}
                    sharedBy = {order.sharedBy}
                    parentCallback = {handleCallback}
                /> :
                <></>
            ))}

            {/* <SharedItemsList
            sharedCart={sharedCart}
            handleCallback={handleCallback}/> */}


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
            {checkInOrder() ? 
                <CustomButton
                    text = "Order"
                    onPress = {() => submitMessage()}
                    // onPress = {() => navigation.navigate('Home', {ordered: true})}
                /> :
                <></>
            }
        </View>
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