import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React, {useState, useEffect, useContext}  from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { LogBox } from 'react-native';

import CustomButton from '../../components/CustomButton'
import CheckoutItem from '../../components/CheckoutItem'
import CheckoutSubtotal from '../../components/CheckoutSubtotal'
import CheckoutTaxes from '../../components/CheckoutTaxes'
import CheckoutTotal from '../../components/CheckoutTotal/CheckoutTotal'
import ReceiptHeader from '../../components/ReceiptHeader'
import HeaderBar from '../../components/HeaderBar'

import EmailIcon from '../../../assets/icons/email.png'
import DownloadIcon from '../../../assets/icons/downloadReceipt.png'
import HelpIcon from '../../../assets/icons/help.png'

import { Context } from '../../globalContext/globalContext'

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.'])

const ReceiptScreen2 = ({route, navigation}) => {
  const {subtotal} = route.params

  const [subtotalValue, setSubtotalValue] = useState(subtotal)
  const [orderStatus, setOrderStatus] = useState('Order Complete')
  const [timestamp, setTimestamp] = useState('Nov 11, 2022 at 12:59 pm')

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
    
    for (let i = 0; i < message.cart.length; i++) {
      temp.push(message.cart[i])
    }
    setCart(temp)
};

useEffect(() => {
    calculateSubtotal()
    }
, [])

  return (
    <View style = {{flex: 1}}>
      <HeaderBar name="Order #59SH2" navigation={navigation}/>
        
        <ScrollView showsVerticalScrollIndicator = {false}>

            <Image source={{uri: 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg'}} style={styles.headerImage}/>
            
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style = {[styles.restaurantName, {fontWeight: 'bold', fontSize: Dimensions.get('window').height * 0.025}]}>
                    Jack's Wife Freda
                </Text>
                <Text style={styles.orderStatus}>
                    {orderStatus}
                </Text>
            </View>

            <Text style = {[styles.date, {fontSize: Dimensions.get('window').height * 0.017}]}>
                {timestamp}
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
            
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    onPress={() => console.log("email pressed")}>
                    <Image style={styles.icon} source={EmailIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log("download pressed")}>
                    <Image style={styles.icon} source={DownloadIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log("help pressed")}>
                    <Image style={styles.icon} source={HelpIcon}/>
                </TouchableOpacity>
            </View>
           

            {/* <View style = {{marginTop: 30}}/> */}
        </ScrollView>
    </View>
  )
}

export default ReceiptScreen2

const styles = StyleSheet.create({
    headerImage: {
        width: '100%',
        height: Dimensions.get('window').height * 0.25,
        backgroundColor: 'blue'
    },

    orderButton:{
        height: Dimensions.get('window').height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
    },
    
    orderStatus: {
        position: 'absolute', 
        right: Dimensions.get('window').width * 0.05, 
        top: Dimensions.get('window').height * 0.03,

        color: 'green',
    }, 

    restaurantName: {
        marginLeft: Dimensions.get('window').width * 0.05,
        marginTop: Dimensions.get('window').height * 0.023,
    },

    date: {
        marginLeft: 20,
        marginTop: 10,
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

    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    icon: {
        marginTop: 200,
        marginHorizontal: 15,
        width: 50,
        height: 50,
    },
})