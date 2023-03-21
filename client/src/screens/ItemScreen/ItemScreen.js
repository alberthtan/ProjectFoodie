import { Dimensions, ScrollView, View, Text, StyleSheet, TouchableOpacity, Pressable, Image} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import CustomButton from '../../components/CustomButton';
import NumberFormat from 'react-number-format';
import BackButton from '../../components/BackButton';
import { Context } from '../../globalContext/globalContext'
import 'react-native-get-random-values'
import { v4 } from 'uuid'
import * as Haptics from 'expo-haptics'

const ItemScreen = ({route, navigation}) => {

  const { item, subtotal, restaurant_id, table_id, active_menu, isOrdering, restaurant_name } = route.params;

  const globalContext = useContext(Context)
  const { ws, userObj, setCart, setWs } = globalContext
  console.log("ITEM URL")
  console.log(item.itemImage)

  const [quantity, setQuantity] = useState(1)

  const foodItem = {
    name: item.name,
    price: item.price,
    calorieCount: '550',
    description: item.description,
    dietary: 'vegetarian',
    imageUrl: item.itemImage,
  }

  ws.onmessage = ({data}) => {
    // console.log(JSON.parse(data))
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
      setCart(temp)
    }
  };

  const handleAddItem = async () => {
    // let temp = []
    // for (let i = 0; i < cart.length; i++) {
    //   temp.push(cart[i])
    // }
    for (let i = 0; i < quantity; i++) {
      console.log("here")
      ws.send(JSON.stringify({flag: false, table_id: table_id, action: 'add', id: v4(), item: item, 
        user: JSON.stringify({
          "username": userObj['username'],
          "first_name": userObj["first_name"],
          "last_name": userObj["last_name"],
          "id": userObj["id"]
        })}))
    }
    // setCart(temp)
    // console.log(JSON.stringify({table_id: table_id, cart: temp}))
    // ws.send(JSON.stringify({table_id: table_id, action: 'add', id: v4(), item: item}))
    navigation.navigate('Menu', {subtotal: subtotal + foodItem.price, restaurant_id: restaurant_id, active_menu, table_id: table_id, name: restaurant_name})
  }

  return (
    <View style = {{flex: 1}}>

        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
                <BackButton/>
        </TouchableOpacity>

        <View style = {{flex: 8}}>
            <ScrollView style = {{}}>

                <Image style= {[styles.foodImage,{flex: 2}]} source={{uri: foodItem.imageUrl}}/>


                <View style = {[styles.infoContainer, {flex: 1}]}>

                    <Text style = {styles.itemName}>
                        {foodItem.name}
                    </Text>

                    <NumberFormat
                        value = {foodItem.price}
                        displayType = "text"
                        thousandSeparator={true}
                        prefix = "$"
                        decimalScale={2}
                        fixedDecimalScale = {true}
                        renderText={(value) => <Text style = {styles.price}>{value}</Text>}>
                    </NumberFormat>

                    {/* <Text style={styles.calorieCount}>
                      {foodItem.calorieCount + ' cal.'}
                    </Text> */}

                    <Text style = {styles.description}>{foodItem.description} </Text>

                </View>

                <View style={{marginVertical: Dimensions.get('window').height * 0.15}}>
                  <View style={[styles.quantityButtonContainer, {flex: 1, flexDirection: 'row'}]}>
                    <Pressable
                        style={[styles.quantityButton, {flex: 1}]}
                        disabled={quantity <= 1}
                        onPress={() => {
                          if(quantity > 1) {
                            setQuantity(quantity - 1)
                          }
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        }} >
                        <View style={{justifyContent: 'center'}}>
                            <Text style={[styles.quantityButtonText, (quantity==1) ? styles.faded : styles.none]}>-</Text>
                        </View>
                    </Pressable>

                        <Text style={[styles.quantityText, {flex: 1}]}>{quantity}</Text>


                    <Pressable
                        style={[styles.quantityButton, {flex: 1}]}
                        disabled={quantity >= 10}
                        onPress={() => {
                            if(quantity < 10) {
                              setQuantity(quantity + 1)
                            }
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        }} >
                        <View style={{justifyContent: 'center'}}>
                            <Text style={[styles.quantityButtonText, {fontSize: 24}, (quantity==10) ? styles.faded : styles.none]}>+</Text>
                        </View>
                    </Pressable>
                  </View>      
                </View>        


            </ScrollView>
        </View>
        


        <View style = {styles.addToCart}>
          <CustomButton
            text = "Add to Order"
            style = {{bottom: 50, position: 'absolute'}}
            onPress = {handleAddItem}
          /> 
        </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  foodImage: {
      height: Dimensions.get('window').height * 0.3,
      alignItems: 'center',
      justifyContent: 'center'
  },

  infoContainer: {
    marginLeft: Dimensions.get("window").width * 0.05,
    marginTop: Dimensions.get("window").height * 0.02,
  },

  itemName: {
    marginVertical: 5,
    fontSize: 28,
    fontWeight:"bold",
    marginRight: 10
  },

  price: {
    marginVertical: 3,
    fontSize: 20,
    fontWeight: 'bold'
  },

  calorieCount: {
    marginVertical: 3,
    fontSize: 16,
    color: 'green',
    fontFamily: 'Roboto_700Bold',
    fontWeight: 'bold'
  },

  description: {
    marginTop: 10,
    marginRight: 10,
    color: '#7C7878'
  },

  backButton: {
    height: 40,
    width: 40,
    marginTop: Dimensions.get('window').height * 0.07,
    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: '#D0D0D0',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 999,
  },

  quantityButtonContainer: {
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.05, 
    width: '35%', 
    borderRadius: 40, 
    backgroundColor: '#DFDFDF', 
    alignSelf: 'center',
    shadowColor: '#171717',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {width: 0, height:10},
  },

  quantityButton: {
    height: '100%',
    alignSelf: "center",
    justifyContent: 'center',
},

  quantityButtonText: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center'
  },

  quantityText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  faded: {
    color: 'gray',
  },

  addToCart :{
      height: Dimensions.get('window').height * 0.12,
      padding: 15,
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#D9D9D9',
  },
})

export default ItemScreen