import { Dimensions, ScrollView, View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const ItemScreen = ({route, navigation}) => {

  const { name, price, description, count, cart } = route.params;
  console.log(cart)

  return (
    <View style = {styles.firstView}>
      <ScrollView style = {{height: Dimensions.get('window').height * 0.7}}>
        <View style = {styles.container}>
          <Text>Picture of Food</Text>
        </View>
        <Text style = {styles.itemName}>{name}</Text>
        <Text style = {styles.price}>${price}</Text>
        <Text style = {styles.description}>{description}</Text>
      </ScrollView>

      <View style = {styles.addToCart}>
        <CustomButton
          text = "ADD TO ORDER"
          onPress = {() => {cart.push({name: name, price: price}), navigation.navigate('Menu', {cart: cart, count: count + 1})}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      height: Dimensions.get('window').height * 0.3,
      backgroundColor: '#3C6F37',
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
})

export default ItemScreen