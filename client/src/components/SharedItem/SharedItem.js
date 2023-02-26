import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React , { useState, useContext } from 'react'
import NumberFormat from 'react-number-format'
import checkIcon from '../../../assets/icons/checkmark.png';
import { Context } from '../../globalContext/globalContext';
import * as Haptics from 'expo-haptics'

const SharedItem = ({ table_id, order, orderedBy, sharedBy, parentCallback}) => {
    const globalContext = useContext(Context)
    const { ws, userObj, cart } = globalContext

    const [checked, setChecked] = useState(sharedBy.indexOf(JSON.stringify({
        "username": userObj['username'],
        "first_name": userObj["first_name"],
        "last_name": userObj["last_name"]
    })) != -1)

    // .indexOf({
    //     "username": userObj['username'],
    //     "first_name": userObj["first_name"],
    //     "last_name": userObj["last_name"]
    // })
    

  return (
    <Pressable style = {[styles.container, {flex: 1, flexDirection: 'row'}]}
        onPress={() => {
            let index = cart.indexOf(order)
            // console.log("cart index")
            // console.log(index)
            // console.log(cart[index])
            let index_of_name = cart[index]['sharedBy'].indexOf(JSON.stringify({
                "username": userObj['username'],
                "first_name": userObj["first_name"],
                "last_name": userObj["last_name"],
                "id": userObj["id"]
            }))

            console.log("HERE")
            console.log(index_of_name)
            // If user wants to share item and they are not in shared list, add user
            if(!checked && index_of_name == -1) {
                console.log("SHARE")
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                ws.send(JSON.stringify({flag: false, table_id: table_id, action: 'share', id: order.id, 
                user: JSON.stringify({
                    "username": userObj["username"],
                    "first_name": userObj["first_name"],
                    "last_name": userObj["last_name"],
                    "id": userObj["id"]
                })
                }))

            } 
            // If user wants to remove from shared list and name is in list, remove user
            else if(checked && index_of_name != -1) {
                console.log("UNSHARE")
                // cart[index]['sharedBy'].splice(index_of_name, 1)
                ws.send(JSON.stringify({flag: false, table_id: table_id, action: 'unshare', id: order.id, 
                user: JSON.stringify({
                    "username": userObj["username"],
                    "first_name": userObj["first_name"],
                    "last_name": userObj["last_name"],
                    "id": userObj["id"]
                })
            }))
                // ws.send(JSON.stringify({table_id: table_id, cart: cart}))
            }
            

        
            setChecked(!checked)
            if(!checked) { 
                parentCallback(order.item.price/2) 
            } else { 
                parentCallback(-1 * order.item.price/2) 
            }
    }}>
            
            {checked ? 
            <View style={{flex: 1, marginHorizontal: 10}}>
                <Image source={checkIcon} resizeMode="contain" style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    // opacity: 0,
                    alignSelf:'center',
                    justifyContent: 'center',
                    
                    // tintColor: '#000000',
                }}/>
            </View>
             : 
            <View style={{flex: 1, marginHorizontal: 10}}>
                <View style={{
                    width: 30,
                    height: 30, 
                    // flex: 1,
                    // backgroundColor: 'blue',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: '#7C7878',
                    backgroundColor: "#FFFFFF"
                }}/>
            </View>
        }

        <View style={{flex: 9, alignSelf: 'flex-end'}}>
            <Text style={[checked ? styles.name: styles.faded, {fontSize: 17}]}>{order.item.name}</Text>
            
            {checked ? 
                <Text style = {[styles.description, styles.faded]}>
                    Sharing with: {sharedBy.map(obj => {
                        if(JSON.parse(obj).id == userObj['id']) {
                            return "Me"
                        }
                        return JSON.parse(obj).first_name
                    })}
                </Text> : 
                <>
                    {order.sharedBy.length != 0 ? 
                        <Text style = {[styles.description, styles.faded]}>
                            Sharing with: {sharedBy.map(obj => {
                                if(JSON.parse(obj).id == userObj['id']) {
                                    return "Me"
                                }
                                return JSON.parse(obj).first_name
                            })}
                        </Text> :
                        <Text style = {[styles.description, styles.faded, {opacity: 0}]}>
                            {"Sharing with: "}
                        </Text>
                        }
                </>
            }
        </View>

        {checked ? 
        <View style={styles.price}>
            <NumberFormat
                value = {order.item.price/ (order.sharedBy.length + 1)}
                displayType = "text"
                thousandSeparator={true}
                prefix = "$"
                decimalScale={2}
                fixedDecimalScale = {true}
                renderText={(value) =>
                    <Text style={{fontSize: 17, textAlign: 'right'}}>{value}</Text>          
                }>
            </NumberFormat>
            <NumberFormat
                value = {order.item.price}
                displayType = "text"
                thousandSeparator={true}
                prefix = "$"
                decimalScale={2}
                fixedDecimalScale = {true}
                renderText={(value) =>
                    <Text style={[{textDecorationLine: 'line-through', fontSize: 14, marginTop: 5, textAlign: 'right'}, styles.faded]}>{value}</Text>          
                }>
            </NumberFormat>
        </View> :

        <View style={styles.price}>
            <NumberFormat
                value = {order.item.price}
                displayType = "text"
                thousandSeparator={true}
                prefix = "$"
                decimalScale={2}
                fixedDecimalScale = {true}
                renderText={(value) =>
                    <Text style={[styles.faded, {fontSize: 17, textAlign: 'right'}]}>{value}</Text>          
                }>
            </NumberFormat>
            <NumberFormat
                value = {order.item.price}
                displayType = "text"
                thousandSeparator={true}
                prefix = "$"
                decimalScale={2}
                fixedDecimalScale = {true}
                renderText={(value) =>
                    <Text style={[{opacity: 0, fontSize: 14, marginTop: 5, textAlign: 'right'}, styles.faded]}>{value}</Text>          
                }>
            </NumberFormat>
        </View>
        }
        
    </Pressable>
  )
}

export default SharedItem

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: 47,
    },

    name: {

        fontSize: 17
    },

    price: {
        position: 'absolute',
        fontSize: 15,
        right: 20,
        alignSelf: 'flex-end',
        // flexDirection: 'row'
    },

    description: {
        marginTop: 5
    },

    faded: {
        color: '#7C7878'
    }
})