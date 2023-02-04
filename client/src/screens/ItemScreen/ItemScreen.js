import { Dimensions, ScrollView, View, Text, StyleSheet, TouchableOpacity, Pressable, Image} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import CustomButton from '../../components/CustomButton';
import NumberFormat from 'react-number-format';
import BackButton from '../../components/BackButton';
import { Context } from '../../globalContext/globalContext'
import 'react-native-get-random-values'
import { v4 } from 'uuid'
import key from 'weak-key'

const ItemScreen = ({route, navigation}) => {

  const { item, subtotal, restaurant_id, table_id, isOrdering, restaurant_name } = route.params;

  const globalContext = useContext(Context)
  const { ws, userObj, cart, setCart } = globalContext

  const [quantity, setQuantity] = useState(0)

  const foodItem = {
    name: item.name,
    price: item.price,
    calorieCount: '550',
    description: item.description,
    dietary: 'vegetarian',
    imageUrl: 'https://www.elmundoeats.com/wp-content/uploads/2021/02/FP-Quick-30-minutes-chicken-ramen.jpg'
  }


  const [serverState, setServerState] = useState('Loading...');

  ws.onopen = () => {
    console.log("opening ws in item screen")
    setServerState('Connected to the server')
  };
  ws.onclose = (e) => {
    console.log(e)
    setServerState('Disconnected. Check internet or server.')
  };
  ws.onerror = (e) => {
    console.log('got here')
    setServerState(e.message);
  };
  ws.onmessage = ({data}) => {
    console.log(JSON.parse(data))
    let message = JSON.parse(data)
    let temp = []
    
    for (let i = 0; i < message.cart.length; i++) {
      temp.push(message.cart[i])
    }
    setCart(temp)
  };

  const handleAddItem = async () => {
    let temp = []
    for (let i = 0; i < cart.length; i++) {
      temp.push(cart[i])
    }
    temp.push({id: v4(), item: item, orderedBy: userObj['first_name'], sharedBy: [], isOrdered: false})
    setCart(temp)
    console.log(JSON.stringify({table_id: table_id, cart: temp}))
    ws.send(JSON.stringify({table_id: table_id, cart: temp}))
    navigation.navigate('Menu', {cart: cart, subtotal: subtotal + price, restaurant_id: restaurant_id, table_id: table_id, name: restaurant_name})
  }

  var imageUrl;


  if (item.name == 'Original Ramen') {
    imageUrl = 'https://www.elmundoeats.com/wp-content/uploads/2021/02/FP-Quick-30-minutes-chicken-ramen.jpg'
  } 
  else if (item.name == 'Sauteed Edamame'){
    imageUrl = 'https://media.istockphoto.com/id/945129060/photo/edamame.jpg?s=612x612&w=0&k=20&c=vGZXT_2KQnICyS8T883Pe-wRKDq1I9d3_Gb0CgUm6-s='
  }

  let addToOrderButton
  if (isOrdering === true) {
    addToOrderButton = <View style = {styles.addToCart}>
        <CustomButton
          text = "Add to Order"
          onPress = {handleAddItem}
        /> 
    </View>
  }

  return (
    <View style = {{flex: 1}}>

        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
                <BackButton/>
        </TouchableOpacity>

        <ScrollView style = {{height: Dimensions.get('window').height * 0.7}}>

            <Image style= {styles.foodImage} source={{uri: foodItem.imageUrl}}/>
            

            <View style = {styles.infoContainer}>

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

                <Text style={styles.calorieCount}>
                  {foodItem.calorieCount + ' cal.'}
                </Text>

                <Text style = {styles.description}>{foodItem.description}</Text>

            </View>

            <View style={{flexDirection: 'row', height: 100, width: '100%'}}>

            <Pressable
                style={styles.quantityButton}
                onPress={() => {
                  if(quantity > 0) {
                    setQuantity(quantity - 1)
                  }
                    console.log('subtract')
                }} >
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </View>
            </Pressable>

                <Text>{quantity}</Text>


                <Pressable
                style={styles.quantityButton}
                onPress={() => {
                    if(quantity < 10) {
                      setQuantity(quantity + 1)
                    }
                    console.log('add')
                }} >
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </View>
            </Pressable>

            </View>
            

        </ScrollView>

        {addToOrderButton}
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
    marginTop: Dimensions.get("window").height * 0.02
  },

  itemName: {
    marginVertical: 5,
    fontSize: 28,
    fontWeight:"bold",
    marginRight: 10
  },

  price: {
    marginVertical: 3,
    fontSize: 25,
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

  addToCart :{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#D9D9D9'
  },

  backButton: {
    height: 30,
    marginTop: Dimensions.get('window').height * 0.07,
    marginLeft: 10,
    alignSelf: 'flex-start',
    position: 'absolute',
    zIndex: 999,
  },





  quantityButton: {
    height: 70,
    width: 100,
    alignSelf: "flex-start",
    padding: 15,
    margin: 10,
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'gray'
},

quantityButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    textAlign: 'center'
},
})

export default ItemScreen