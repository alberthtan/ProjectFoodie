import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight} from 'react-native'
import React, {useState, useEffect, useContext}  from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { LogBox } from 'react-native';

import CustomButton from '../../components/CustomButton'
import CheckoutItem from '../../components/CheckoutItem'
import CheckoutSubtotal from '../../components/CheckoutSubtotal'
import CheckoutTaxes from '../../components/CheckoutTaxes'
import CheckoutTotal from '../../components/CheckoutTotal/CheckoutTotal'
import CheckoutHeader from '../../components/CheckoutHeader'
import HeaderBar from '../../components/HeaderBar'
import SharedItem from '../../components/SharedItem'
import SwipeBar from '../../components/SwipeBar';
import * as Haptics from 'expo-haptics'
import cardIcon from '../../../assets/icons/payment.png'

import { Context } from '../../globalContext/globalContext'
import { useIsFocused } from '@react-navigation/native'

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.'])

const CheckoutScreen = ({route, navigation}) => {
  const {subtotal, restaurant_id, active_menu, table_id, restaurant_name} = route.params

  const [subtotalValue, setSubtotalValue] = useState(0)
  const [defaultPaymentMethodID, setDefaultPaymentMethodID] = useState(null)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [users, setUsers] = useState([])

  const globalContext = useContext(Context)
  const { ws, userObj, cart, setCart, getToken, setWs } = globalContext

  const isFocused = useIsFocused();
  const token = getToken('access')
//   const authorization = "Bearer".concat(" ", token)

  const checkPaymentMethod = async () => {
    let token = await getToken('access')
    authorization = "Bearer".concat(" ", token)
    // console.log("FUCKER")
    
    let amount = calculateSubtotal(cart)
    console.log(amount)
    return fetch('https://dutch-pay-test.herokuapp.com/check_default_payment_method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
        body: JSON.stringify({
          amount: amount * 100,
        }),
      })
      .then(response => response.json())
      .then(json => {
            console.log("FUCKER")
            console.log(json)
            // console.log(response.status)
            if ('success' in json) {
                for(let i=0; i < cart.length; i++) {
                    if(JSON.parse(cart[i].orderedBy)['username'] == userObj['username'] && cart[i].status === 'pending') {
                        cart[i].status = 'ordered'
                    }    
                }
                ws.send(JSON.stringify({flag: false, table_id: table_id, action: 'order',
                    user: 
                    JSON.stringify({"username": userObj['username'],
                    "first_name": userObj['first_name'],
                    "last_name": userObj['last_name'],
                    "id": userObj["id"]
                    },),
                    payment_intent: json['success']
                }))
            }
            else {
                console.log('payment invalid')
            }
        console.log(json)
        // ws.send(JSON.stringify({payment_intent: []}))
        navigation.navigate('Receipt', {subtotal: subtotalValue})
      })
  }


  const getDefaultPaymentMethod = async () => {
    let token = await getToken('access')
    authorization = "Bearer".concat(" ", token)
    return fetch('https://dutch-pay-test.herokuapp.com/get_default_payment_method', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authorization,
        },
      })
      .then(response => response.json())
      .then(json => {
        console.log("DEFAULT")
        console.log(json)
        if('default' in json) {
          setDefaultPaymentMethodID(json['default'])
        } else {
          console.log("no default payment method")
        }
        
      })
      .catch(error => {
          console.error(error);
      });
  }

  const getPaymentMethods = async () => {
    let token = await getToken('access')
    authorization = "Bearer".concat(" ", token)
    return fetch('https://dutch-pay-test.herokuapp.com/get-cards', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authorization,
        },
      })
      .then(response => response.json())
      .then(json => {
        console.log("PAYMENT METHODS")
        // console.log(json)
        let paymentMethodsTemp = []
        // console.log(json)
        for(let i=0; i < json.length; i++) {
          let paymentMethod = {
            cardEndDigits: json[i]["last4"],
            cardCompany: json[i]["brand"],
            id: json[i]['id']
          }
          paymentMethodsTemp.push(paymentMethod)
          console.log(paymentMethod)
        }
        setPaymentMethods(paymentMethodsTemp)
      })
      .catch(error => {
          console.error(error);
      });
  }

  const calculateSubtotal = (cart) => {
    let subtotal = 0
    for(let i=0; i < cart.length; i++) {
        if(cart[i].status == 'pending') {
            if(JSON.parse(cart[i].orderedBy)['username'] == userObj['username'] || cart[i].sharedBy.indexOf(JSON.stringify({
                "username": userObj['username'],
                "first_name": userObj["first_name"],
                "last_name": userObj["last_name"],
                "id": userObj["id"]
            })) != -1) {
                
                subtotal += cart[i].item.price / (cart[i].sharedBy.length + 1)
            }
        }
    }
    setSubtotalValue(subtotal)
    return subtotal
  }

  const checkInShared = () => {
    for(let i=0; i < cart.length; i++) {
        if(cart[i].sharedBy.findIndex(obj => obj['username'] == userObj['username']) != -1) {
            return true
        }
    }
    return false
  }

  const checkInOrder = () => {
    for(let i=0; i < cart.length; i++) {
        if(cart[i].status == 'pending' && JSON.parse(cart[i].orderedBy)['username'] == userObj['username']) {
            return true
        }
    }
    return false
  }

  const checkInReceipt = () => {
    for(let i=0; i < cart.length; i++) {
        if(cart[i].status != 'pending' && JSON.parse(cart[i].orderedBy)['username'] == userObj['username']) {
            return true
        }
    }
    return false
  }

ws.onmessage = ({data}) => {
    console.log("RECEIVING MESSAGE")
    let message = JSON.parse(data)
    if('clear' in message) {
        navigation.navigate('HomeTabs')
        console.log("closing websocket from frontend")
        ws.close()
        setWs(null)
    } else {
        let temp = []
        
        for (let i = 0; i < message.length; i++) {
          temp.push(message[i])
        }
        calculateSubtotal(temp)
        setCart(temp)
    }
};


const handleOrder = async () => {
    checkPaymentMethod()
}


const handleShared = (childData) => {
    setSubtotalValue(subtotalValue + childData)
}

const handleDelete = (key) => {
    for(let i = 0; i < cart.length; i++) {
        if(cart[i].id == key) {
            cart.splice(i, 1)
            break
        }
    }
    ws.send(JSON.stringify({flag: false, table_id: table_id, action: 'delete', id: key}))
}

const getAllUsers = async () => {
    let temp = []
    for (let i = 0; i < cart.length; i++) {
        if (!temp.includes(cart[i].orderedBy) && userObj['username'] != JSON.parse(cart[i].orderedBy)['username'] && cart[i].status == 'pending') {
            temp.push(cart[i].orderedBy)
        }
    }
    setUsers(temp)
}

const handleTip = () => {
    navigation.navigate('TipScreen', {subtotal: subtotalValue})
}

    // useEffect(() => {
    //     calculateSubtotal(cart)
    //     getDefaultPaymentMethod()
    //     getPaymentMethods()
    //     }
    // , [])

    useEffect(() => {
        console.log("is focused?")
        if(isFocused) {
          getPaymentMethods();
          getDefaultPaymentMethod()
          calculateSubtotal(cart)
          setTimeout(() => {
            getDefaultPaymentMethod()
            getPaymentMethods()
          }, 1000);
        }
      }, [isFocused])

    useEffect(()=>{
        getAllUsers()
    }, [cart])

  return (
    <View style = {{flex: 1}}>
        {checkInReceipt() ? 
            <CheckoutHeader 
                name='Checkout' 
                navigation={navigation} 
                destination="Receipt" 
                subtotal={subtotalValue}
            /> :
            <HeaderBar 
                name='Checkout' 
                navigation={navigation} 
            />
        }
        
        <ScrollView showsVerticalScrollIndicator = {false}>

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                {checkInOrder() ? 
                    <Text style = {[styles.title, {fontSize: 20, width: Dimensions.get('window').width * 0.63}]}>
                        My Items
                    </Text> :
                    <Text style = {[styles.title, {fontSize: 20, width: Dimensions.get('window').width * 0.63}]}>
                        Cart is empty
                    </Text>
                }               
                
                <TouchableOpacity
                    onPress = {() => {navigation.navigate('Menu', {subtotal: subtotalValue, table_id: table_id, restaurant_id: restaurant_id, active_menu, name: restaurant_name}),
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}
                    style={styles.addItemsButton}>
                    <Text style={styles.addItemsText}>+ Add Items</Text>
                </TouchableOpacity>

            </View>

            
            

            {cart.map(order => (
                (order.status == 'pending' && userObj['username'] == JSON.parse(order.orderedBy)['username']) ?
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
                     {JSON.parse(user).first_name}'s Items
                    </Text>
                    {cart.map(order => (
                        (order.status == 'pending' && user == order.orderedBy) ?
                        <SharedItem
                            key = {order.id}
                            order = {order}
                            table_id = {table_id}
                            sharedBy = {order.sharedBy}
                            parentCallback = {calculateSubtotal}
                            subtotalValue = {subtotalValue}
                            setSubtotalValue = {setSubtotalValue}
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

                {checkInShared() ? 
                    <Text style={[{
                            marginHorizontal: 20,
                            marginVertical: 30,
                            fontSize: 13,
                            width: Dimensions.get('window').width, 
                            color: 'red',
                        }]}>
                        Checked items will process when ordered by owners.
                    </Text> :
                    <></>    
                }
                <View style={{backgroundColor: '#E8E8E8', height: 10, marginTop: 20}}/>

                {(defaultPaymentMethodID && paymentMethods.find(payment => payment.id===defaultPaymentMethodID)) ? 
                    <View style = {styles.container}>
                        
                        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{ borderRadius: 30,
                                marginLeft: Dimensions.get('window').width * 0.05,
                                }}>
                                <Image style= {{width: 25, height: 25}} source={cardIcon}/>
                            </View>
                            <View style = {{paddingLeft: 15,  
                                justifyContent: 'center',
                                marginRight: Dimensions.get('window').width * 0.05,}}>
                                <Text style = {{fontWeight: 'bold'}}>
                                    ••••{paymentMethods.find(payment => payment.id===defaultPaymentMethodID)["cardEndDigits"]} 
                                </Text>
                            </View>
                            </View>
                            <View style={{
                                position: 'absolute',
                                right: 0,
                                marginRight: Dimensions.get('window').width * 0.05,
                                }}>
                            <TouchableOpacity
                                onPress = {() => {
                                    navigation.navigate("Payments")
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                                }}
                                style={styles.editPaymentButton}>
                                <Text style={styles.addItemsText}>Edit</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    :
                    <View style = {styles.container}>
                        
                        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{ borderRadius: 30,
                                marginLeft: Dimensions.get('window').width * 0.05,
                                }}>
                               <Text>No saved payment methods</Text>
                            </View>
                            
                            </View>
                            <View style={{
                                position: 'absolute',
                                right: 0,
                                marginRight: Dimensions.get('window').width * 0.05,
                                }}>
                            <TouchableOpacity
                                onPress = {() => {
                                    console.log("HEREHR")
                                    console.log(paymentMethods)
                                    console.log(paymentMethods.length)
                                    if(paymentMethods.length == 0) {
                                        navigation.navigate("AddPayment")
                                    } else {
                                        navigation.navigate('Payments')
                                    }
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                                }}
                                style={styles.editPaymentButton}>
                                <Text style={styles.addItemsText}>Add</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
               
            </View>

            <View style={{backgroundColor: '#E8E8E8', height: 10, marginTop: 0}}/>

            <View style = {{marginTop: 30}}/>
        </ScrollView>

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

    container: {
        // marginVertical: 10,
        // backgroundColor: 'green',
        width: '100%',
        justifyContent: 'center',
        height: 60,
        flex: 1
    },

    addItemsButton: {
        padding: 12,
        borderRadius: 15,
        backgroundColor: '#3C6F37',
    },

    editPaymentButton: {
        padding: 10,
        borderRadius: 10,
        width: 60,
        justifyContent: 'center',
        backgroundColor: '#3C6F37',
    },

    addItemsText: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
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
        padding: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
    },
})