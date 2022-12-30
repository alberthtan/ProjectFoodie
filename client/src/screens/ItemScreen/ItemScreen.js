import { Dimensions, ScrollView, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { Overlay } from 'react-native-elements'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import NumberFormat from 'react-number-format';
import backIcon from '../../../assets/icons/backicon.png';
import BackButton from '../../components/BackButton';

const ItemScreen = ({route, navigation}) => {

  const { name, price, description, count, cart, subtotal, restaurant_id, isOrdering } = route.params;

  var imageUrl;

  if (name == 'Original Ramen') {
    imageUrl = 'https://www.elmundoeats.com/wp-content/uploads/2021/02/FP-Quick-30-minutes-chicken-ramen.jpg'
  } 
  else if (name == 'Sauteed Edamame'){
    imageUrl = 'https://media.istockphoto.com/id/945129060/photo/edamame.jpg?s=612x612&w=0&k=20&c=vGZXT_2KQnICyS8T883Pe-wRKDq1I9d3_Gb0CgUm6-s='
  }

  console.log(cart)

  let addToOrderButton
  if (isOrdering === true) {
    addToOrderButton = <View style = {styles.addToCart}>
        <CustomButton
          text = "Add to Order"
          onPress = {() => {cart.push({name: name, price: price}), navigation.navigate('Menu', {cart: cart, count: count + 1, subtotal: subtotal + price, restaurant_id: restaurant_id})}}
        />
    </View>
  }

  return (
    <View style = {styles.firstView}>

      {/* <Overlay isVisible={true}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
                <Image source={backIcon} resizeMode="contain" style={{
                    width: 30,
                    height: 30,
                    alignSelf:'center',
                    justifyContent: 'center',
                    flex: 1,
                    // marginBottom: 8,
                    tintColor: '#000000',
                }}/>
        </TouchableOpacity>
      </Overlay> */}
      
      {/* <Text style = {styles.itemName}>
        {name}
      </Text> */}
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