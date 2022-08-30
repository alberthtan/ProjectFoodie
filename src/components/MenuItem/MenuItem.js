import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'

const MenuItem = ({navigation, name, price, description, count, cart, subtotal}) => {
  return (
    <TouchableOpacity
        style = {styles.container}
        onPress = {() => navigation.navigate('Item', {name: name, description: description, price: price, count: count, cart: cart, subtotal: subtotal})}>
            
      <Text style = {styles.itemName}>{name}</Text>

      <Text style = {styles.itemPrice}>${price}</Text>

      <Text style = {styles.itemDescription}>
        {description}
      </Text>
      {/* Infused with fresh rosemary and sage. Served with smooth mashed potatoes and char-grilled, crispy asparagus, topped with a tangy golden-brown glaze */}
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginLeft: 15,
    },

    itemName: {
        fontWeight: 'bold',
        fontSize: 18
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