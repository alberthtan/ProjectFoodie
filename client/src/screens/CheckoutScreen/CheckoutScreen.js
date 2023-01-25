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

const CheckoutScreen = ({route, navigation}) => {
  const {cart, count, subtotal, restaurant_id} = route.params
  const [subtotalValue, setSubtotalValue] = useState(subtotal)

  const globalContext = useContext(Context)

  const { userObj } = globalContext
//   console.log(cart)

const serverMessagesList = [];

const [serverState, setServerState] = useState('Loading...');
const [serverMessages, setServerMessages] = useState(serverMessagesList);

let controller = new WebsocketController();
var ws = controller.ws;

useEffect(() => {
    console.log(serverState)
    ws.onopen = () => {
      setServerState('Connected to the server')
      // console.log(serverState)
      setDisableButton(false);
    };
    ws.onclose = (e) => {
      console.log(e)
      setServerState('Disconnected. Check internet or server.')
      setDisableButton(true);
    };
    ws.onerror = (e) => {
      console.log('got here')
      setServerState(e.message);
    };
    ws.onmessage = ({data}) => {
        console.log(JSON.parse(data))
        // console.log({data})
        serverMessagesList.push(data);
        // console.log(serverMessagesList)
        setServerMessages(serverMessagesList)
        // console.log(serverMessages)
    };
  }, [])

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

            {/* <View style = {styles.rectangle}>
                <Text style = {{fontWeight: 'bold'}}>
                    Table Number: 123456
                </Text>
            </View> */}

            <Text style = {[styles.totals, {fontWeight: 'bold', fontSize: 18}]}>
                Your Items
            </Text>

            {cart.map(item => (
                (userObj['first_name'] == item.orderedBy) ?
                <CheckoutItem
                    key = {cart.indexOf(item)}
                    navigation = {navigation}
                    name = {item.item.name}
                    price = {item.item.price}
                /> :
                <></>
            ))}

            <AddItemsButton
                onPress = {() => navigation.navigate('Menu', {cart: cart, count: count, subtotal: subtotalValue, restaurant_id: restaurant_id})}
            />

            {cart.map(item => (
                (userObj['first_name'] != item.orderedBy) ?
                <SharedItem
                    key = {cart.indexOf(item)}
                    name = {item.item.name}
                    price = {item.item.price}
                    parentCallback = {handleCallback}
                /> :
                <></>
            ))}

            <SharedItem
                name="Shoyu Ramen"
                price={10}
                parentCallback = {handleCallback}
            />

            <SharedItem
                name="Wasabi Shock Salad"
                price={7}
                parentCallback = {handleCallback}
            />


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