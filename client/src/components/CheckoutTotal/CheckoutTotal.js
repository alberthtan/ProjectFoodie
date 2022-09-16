import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'

const CheckoutTotal = ({subtotal, taxRate}) => {
  return (
    <View style = {styles.container}>
      <Text style = {styles.name}>Total</Text>
      <NumberFormat
        value = {subtotal + subtotal * taxRate}
        displayType = "text"
        thousandSeparator={true}
        prefix = "$"
        decimalScale={2}
        fixedDecimalScale = {true}
        renderText={(value) => <Text style = {styles.total}>{value}</Text>}>
        </NumberFormat>
    </View>
  )
}

export default CheckoutTotal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginTop: 20,
    },

    name: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 15,
        fontWeight: "bold"
    },

    total: {
        right: 0,
        position: 'absolute',
        marginRight: 20,
        fontSize: 15,
        fontWeight: "bold"
    }
})