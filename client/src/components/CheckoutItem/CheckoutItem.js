import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'

const CheckoutItem = ({navigation, sharedBy, name, price}) => {
  return (
    <View>
    <View style = {styles.container}>
        <Text style = {styles.name}>{name}</Text>
        <NumberFormat
            value = {price / (sharedBy.length + 1)}
            displayType = "text"
            thousandSeparator={true}
            prefix = "$"
            decimalScale={2}
            fixedDecimalScale = {true}
            renderText={(value) => <Text style = {styles.price}>{value}</Text>}>
        </NumberFormat>
    </View>
    {sharedBy.length != 0 ? 
    <Text>{sharedBy}</Text> : <></>
    }
    </View>
  )
}

export default CheckoutItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginTop: 30,
    },

    name: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 15
    },

    price: {
        right: 0,
        position: 'absolute',
        marginRight: 20,
        fontSize: 15
    }
})