import { Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useContext}  from 'react'
import { ScrollView } from 'react-native-gesture-handler'

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
import 'react-native-get-random-values'
import { v4 } from 'uuid'
import key from 'weak-key'

const CheckoutScreen = ({route, navigation}) => {
  const {cart, subtotal, restaurant_id} = route.params
  const [sharedCart, setSharedCart] = useState([])

  const [subtotalValue, setSubtotalValue] = useState(subtotal)
  const [Cart, setCart] = useState(cart)
  const [serverState, setServerState] = useState('Loading...');

  const globalContext = useContext(Context)
  const { userObj } = globalContext


let controller = new WebsocketController();
var ws = controller.ws;

// ws.onopen = () => {
//     console.log('ANDREW TATE')
//     setServerState('Connected to the server')
//     setDisableButton(false);
// };
ws.onclose = (e) => {
    setServerState('Disconnected. Check internet or server.')
    setDisableButton(true);
};
ws.onerror = (e) => {
    setServerState(e.message);
};
ws.onmessage = ({data}) => {
    let message = JSON.parse(data)
    let temp = []
    
    for (let i = 0; i < message.length; i++) {
      temp.push(message[i])
    }
    setCart(temp)
};

useEffect(() => {
    console.log("shared cart is updating...")
    let temp = []
    for(let i=0; i < Cart.length; i++) {
        if (Cart[i].orderedBy != userObj['first_name']) {
            temp.push(Cart[i])
            // temp[i].id = v4()
            console.log(Cart[i].id)
            // console.log(temp[i].id)
        }
    }
    // console.log("SHARED \n")
    // console.log(temp)
    // console.log("CART \n")
    // console.log(Cart)
    setSharedCart(temp)
}, [Cart])


  const submitMessage = async () => {
    ws.send('hello');
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

            {Cart.map(item => (
                (userObj['first_name'] == item.orderedBy) ?
                <CheckoutItem
                    key = {item.id}
                    navigation = {navigation}
                    name = {item.item.name}
                    price = {item.item.price}
                /> :
                <></>
            ))}

            <AddItemsButton
                onPress = {() => navigation.navigate('Menu', {cart: Cart, subtotal: subtotalValue, restaurant_id: restaurant_id})}
            />

            {Cart.map(item => (
                // console.log(item.id),
                (userObj['first_name'] != item.orderedBy) ?
                <SharedItem
                    key = {item.id}
                    name = {item.item.name}
                    price = {item.item.price}
                    orderedBy = {item.orderedBy}
                    sharedBy = {item.sharedBy}
                    parentCallback = {handleCallback}
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
                text = "Order"
                onPress = {() => submitMessage()}
                // onPress = {() => navigation.navigate('Home', {ordered: true})}
            />
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