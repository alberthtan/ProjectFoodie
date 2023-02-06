import { Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useContext}  from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { LogBox } from 'react-native';

import CustomButton from '../../components/CustomButton'
import CheckoutItem from '../../components/CheckoutItem'
import CheckoutSubtotal from '../../components/CheckoutSubtotal'
import CheckoutTaxes from '../../components/CheckoutTaxes'
import CheckoutTotal from '../../components/CheckoutTotal/CheckoutTotal'
import HeaderBar from '../../components/HeaderBar'
import SharedItem from '../../components/SharedItem'
import SwipeBar from '../../components/SwipeBar';
import * as Haptics from 'expo-haptics'

import { Context } from '../../globalContext/globalContext'

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.'])

const CheckoutScreen = ({route, navigation}) => {
  const {subtotal, restaurant_id, table_id, restaurant_name} = route.params

  const [subtotalValue, setSubtotalValue] = useState(subtotal)
  const [users, setUsers] = useState([])

  const globalContext = useContext(Context)
  const { ws, userObj, cart, setCart } = globalContext

  const calculateSubtotal = () => {
    let subtotal = 0
    for(let i=0; i < cart.length; i++) {
        if(!cart[i].isOrdered) {
            if(cart[i].orderedBy == userObj['first_name'] || cart[i].sharedBy.indexOf(userObj['first_name']) != -1) {
                
                subtotal += cart[i].item.price / (cart[i].sharedBy.length + 1)
                console.log(subtotal)
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

ws.onmessage = ({data}) => {
    let message = JSON.parse(data)
    let temp = []
    console.log('got here')
    
    for (let i = 0; i < message.length; i++) {
      temp.push(message[i])
    }
    setCart(temp)
};

useEffect(() => {
    calculateSubtotal()
    }
, [cart])


const handleOrder = async () => {
    for(let i=0; i < cart.length; i++) {
        if(cart[i].orderedBy == userObj['first_name']) {
            // cart.splice(i, 1)
            cart[i].isOrdered = true
        }       
    }
    ws.send(JSON.stringify({table_id: table_id, action: 'order', user: userObj['first_name']}))
    // ws.close()
    navigation.navigate('Receipt', {subtotal: subtotalValue})
}


const handleShared = (childData) => {
    setSubtotalValue(subtotalValue + childData)
}

const handleDelete = (key) => {
    let i = 0
    console.log('first cart')
    console.log(cart)
    while(i < cart.length) {
        if(cart[i].id == key) {
            cart.splice(i, 1)
            break
        } else {
            i++
        }
    }
    console.log('second cart')
    console.log(cart)
    setCart(cart)
    ws.send(JSON.stringify({table_id: table_id, action: 'delete', id: order.id, item: item}))
}

useEffect(()=>{
    getAllUsers()
}, [cart])

const getAllUsers = async () => {
    console.log(cart)
    // console.log(userObj['name'])
    let temp = []
    for (let i = 0; i < cart.length; i++) {
        if (!temp.includes(cart[i].orderedBy) && userObj['first_name'] != cart[i].orderedBy && !cart[i].isOrdered) {
            temp.push(cart[i]. orderedBy)
        }
    }
    setUsers(temp)
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

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                <Text style = {[styles.title, {fontSize: 20, width: Dimensions.get('window').width * 0.63}]}>
                    My Items
                </Text>
                
                <TouchableOpacity
                    onPress = {() => {navigation.navigate('Menu', {subtotal: subtotalValue, table_id: table_id, restaurant_id: restaurant_id, name: restaurant_name}),
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}
                    style={styles.addItemsButton}>
                    <Text style={styles.addItemsText}>+ Add Items</Text>
                </TouchableOpacity>

                

            </View>
            

            {cart.map(order => (
                (!order.isOrdered && userObj['first_name'] == order.orderedBy) ?
                <CheckoutItem
                    key = {order.id}
                    id = {order.id}
                    navigation = {navigation}
                    name = {order.item.name}
                    price = {order.item.price}
                    sharedBy = {order.sharedBy}
                    handleDelete = {handleDelete}
                /> :
                <></>
            ))}

            <View style={{backgroundColor: '#E8E8E8', height: 10, marginTop: 20}}/>

            {/* <Text style={styles.instructions}>
                Check the dishes you wish to share with your friends!
            </Text> */}

            {users.map(user => (
                <View style={{marginTop: Dimensions.get('window').height * 0.02}}>
                    <Text style= {[styles.title, {fontSize: 20}]}>
                     {user}'s Items
                    </Text>
                    {cart.map(order => (
                        (!order.isOrdered && user == order.orderedBy) ?
                        <SharedItem
                            key = {order.id}
                            order = {order}
                            table_id = {table_id}
                            sharedBy = {order.sharedBy}
                            parentCallback = {handleShared}
                        /> :
                        <></>
                    ))

                    }

                <View style={{backgroundColor: '#E8E8E8', height: 10, marginTop: 20}}/>

                </View>
            ))}

            


            <View style = {{ borderTopWidth: 0.5, borderTopColor: '#E5E5E5'}}>
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

        {/* <View style = {[styles.orderButton]}>
            <CustomButton
                text = "Go to Tip Page"
                onPress = {() => handleTip()}
            /> 
        </View> */}

        <View style = {styles.orderButton}>
            {checkInOrder() ? 
                <CustomButton
                    text = "Order"
                    onPress = {() => handleOrder()}
                    style = {{bottom: 50, position: 'absolute'}}
                /> :
                <CustomButton
                    text = "Order"
                    type ='DISABLED'
                    style = {{bottom: 50, position: 'absolute'}}
                    disabled={true}
                    onPress = {() => alert("No items in cart!")}
                />
            }
        </View>
        {/* {statusbar} */}
    </View>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({

    addItemsButton: {
        padding: 12,
        borderRadius: 15,
        backgroundColor: '#3C6F37',
    },

    addItemsText: {
        fontWeight: 'bold',
        color: 'white',
    },

    title: {
        marginLeft: 20,
        fontSize: 15,
        fontWeight: 'bold'
    },

    instructions: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 13,
        color: 'red'
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

    orderButton:{
        height: Dimensions.get('window').height * 0.12,
        paddingTop: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
    },
})