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
import ReceiptItem from '../../components/ReceiptItem';

import EmailIcon from '../../../assets/icons/email.png'
import DownloadIcon from '../../../assets/icons/downloadReceipt.png'
import HelpIcon from '../../../assets/icons/help.png'

import { Context } from '../../globalContext/globalContext'

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.'])

const ReceiptScreen2 = ({route, navigation}) => {
  const {subtotal, restaurant, cart_string, timestamp} = route.params

  const [subtotalValue, setSubtotalValue] = useState(subtotal)
  const [orderStatus, setOrderStatus] = useState('Order Complete')
  const itemList = JSON.parse(cart_string)
//   const [timestamp, setTimestamp] = useState('Nov 11, 2022 at 12:59 pm')

  const globalContext = useContext(Context)
  const { userObj, cart, } = globalContext

    const calculateSubtotal = (cart) => {
    let subtotal = 0
    console.log('here')
    console.log(cart[0])
    for(let i=0; i < cart.length; i++) {
        if(JSON.parse(cart[i].orderedBy)['username'] == userObj['username'] || cart[i].sharedBy.indexOf(JSON.stringify({
            "username": userObj['username'],
            "first_name": userObj["first_name"],
            "last_name": userObj["last_name"],
            "id": userObj["id"]
        })) != -1) {
            
            subtotal += cart[i].item.price / (cart[i].sharedBy.length + 1)
        }
    }
    console.log("SUBTOTAL")
    console.log(subtotal)
    setSubtotalValue(subtotal)
  }
    


    const getFormattedDate = (timestamp) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const daySuffix = ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
            "th", "th", "th", "th", "th", "th", "th", "th", "th", "th",
            "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
            "st"];
        const date = new Date(timestamp);
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const dayWithSuffix = day + daySuffix[day - 1];
        const formattedDate = `${month} ${dayWithSuffix}, ${year}`;
        return formattedDate
    }
    
    const getFormattedTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        // Convert the hours from a 24-hour format to a 12-hour format
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        
        // Determine whether it's AM or PM
        const amOrPm = hours < 12 ? "am" : "pm";
        
        const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
        return formattedTime
    }



//   const calculateSubtotal = () => {
//     let subtotal = 0
//     for(let i=0; i < cart.length; i++) {
//         if(cart[i].status != 'pending') {
//             if(JSON.parse(cart[i].orderedBy)['username'] == userObj['username'] || cart[i].sharedBy.findIndex(obj => obj['username'] == userObj['username']) != -1) {
//                 subtotal += cart[i].item.price / (cart[i].sharedBy.length + 1)
//             }
//         }
//     }
//     setSubtotalValue(subtotal)
//   }

console.log(itemList)

useEffect(() => {
    calculateSubtotal(itemList)
    }
, [])


  return (
    <View style = {{flex: 1}}>
      <HeaderBar name="Order #59SH2" navigation={navigation}/>
        
        <ScrollView showsVerticalScrollIndicator = {false}>

            <Image source={{uri: restaurant.restaurant_image}} style={styles.headerImage}/>
            
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style = {[styles.restaurantName, {fontWeight: 'bold', fontSize: Dimensions.get('window').height * 0.025}]}>
                    {restaurant.name}
                </Text>
                <Text style={styles.orderStatus}>
                    {orderStatus}
                </Text>
            </View>

            <Text style = {[styles.date, {fontSize: Dimensions.get('window').height * 0.017}]}>
                {getFormattedDate(timestamp)} at {getFormattedTime(timestamp)}
            </Text>

            {itemList.map(order => (
                console.log("fuc,"),
                console.log(order.sharedBy),
                console.log(order.sharedBy[0]),
                // console.log(JSON.parse(order.sharedBy)),
                ((userObj['username'] == JSON.parse(order.orderedBy)['username'])) || order.sharedBy.findIndex(obj => JSON.parse(obj)['username'] == userObj['username']) != -1  ?

                <ReceiptItem
                    key = {order.id}
                    id = {order.id}
                    name = {order.item.name}
                    price = {order.item.price}
                    sharedBy = {order.sharedBy}
                    order = {order}
                /> :
                <></>
            ))}

            {/* {cart.map(order => (
                (order.status != 'pending' && order.sharedBy.findIndex(obj => obj['username'] == userObj['username']) != -1) ?
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
            ))} */}

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
        // backgroundColor: 'blue'
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