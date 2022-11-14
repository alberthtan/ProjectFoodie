import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'

const MenuItem = ({navigation, name, price, description, count, cart, subtotal, restaurant_id}) => {
  return (
    <TouchableOpacity
        style = {styles.container}
        onPress = {() => navigation.navigate('Item', {name: name, description: description, 
                                                      price: price, count: count, cart: cart, 
                                                      subtotal: subtotal, restaurant_id : restaurant_id})}>
            
      <Text style = {styles.itemName}>{name}</Text>

      <NumberFormat
            value = {price}
            displayType = "text"
            thousandSeparator={true}
            prefix = "$"
            decimalScale={2}
            fixedDecimalScale = {true}
            renderText={(value) => <Text style = {styles.itemPrice}>{value}</Text>}>
        </NumberFormat>

      <Text style = {styles.itemDescription}>
        {description}
      </Text>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginLeft: 10
    },

    itemName: {
        fontWeight: 'bold',
    },

    itemPrice:{
      marginTop: 5
    },

    itemDescription: {
        color: '#7C7878',
        marginTop: 5
    }
})

export default MenuItem