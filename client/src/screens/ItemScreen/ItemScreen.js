import { Dimensions, ScrollView, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import CustomButton from '../../components/CustomButton';
import NumberFormat from 'react-number-format';
import BackButton from '../../components/BackButton';
import { Context } from '../../globalContext/globalContext'
import WebsocketController from '../../websocket/websocket'

const ItemScreen = ({route, navigation}) => {

  const { item, name, price, description, cart, subtotal, restaurant_id, isOrdering } = route.params;

  let controller = new WebsocketController();
  var ws = controller.ws;
  const [Cart, setCart] = useState(cart)

  const [serverState, setServerState] = useState('Loading...');

  ws.onopen = () => {
    console.log("opening ws in item screen")
    setServerState('Connected to the server')
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
    let message = JSON.parse(data)
    let temp = []
    
    for (let i = 0; i < message.length; i++) {
      temp.push(message[i])
    }
    setCart(temp)
  };

  const handleAddItem = async () => {
    let temp = []
    for (let i = 0; i < Cart.length; i++) {
      temp.push(Cart[i])
    }
    temp.push({item: item, orderedBy: userObj['first_name'], sharedBy: []})
    setCart(temp)
    ws.send(JSON.stringify(temp))
    navigation.navigate('Menu', {cart: Cart, subtotal: subtotal + price, restaurant_id: restaurant_id})
  }

  var imageUrl;
  
  const globalContext = useContext(Context)
  const { userObj } = globalContext

  if (name == 'Original Ramen') {
    imageUrl = 'https://www.elmundoeats.com/wp-content/uploads/2021/02/FP-Quick-30-minutes-chicken-ramen.jpg'
  } 
  else if (name == 'Sauteed Edamame'){
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
    <View style = {styles.firstView}>
      <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
                  <BackButton/>
        </TouchableOpacity>
      <ScrollView style = {{height: Dimensions.get('window').height * 0.7}}>
        {/* <View style = {styles.container}>
          <Text>Picture of Food</Text>
          <Image style= {styles.container} source={{uri: newUrl}}/>
        </View> */}
        <Image style= {styles.container} source={{uri: imageUrl}}/>
        
        <Text style = {styles.itemName}>
          {name}
        </Text>
        <NumberFormat
            value = {price}
            displayType = "text"
            thousandSeparator={true}
            prefix = "$"
            decimalScale={2}
            fixedDecimalScale = {true}
            renderText={(value) => <Text style = {styles.price}>{value}</Text>}>
        </NumberFormat>
        <Text style = {styles.description}>{description}</Text>
      </ScrollView>

      {addToOrderButton}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      height: Dimensions.get('window').height * 0.3,
      alignItems: 'center',
      justifyContent: 'center'
  },

  firstView: {
    flex: 1
  },

  itemName: {
    marginTop: 10,
    fontSize: 25,
    fontWeight:"bold",
    marginLeft: 10,
    marginRight: 10
  },

  price: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold'
  },

  description: {
    marginTop: 10,
    marginLeft: 10,
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
})

export default ItemScreen