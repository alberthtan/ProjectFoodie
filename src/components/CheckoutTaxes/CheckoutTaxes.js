import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

const CheckoutTaxes = ({subtotal, taxRate}) => {
  return (
    <View style = {styles.container}>
      <Text style = {styles.name}>Taxes</Text>
      <NumberFormat
        value = {subtotal * taxRate}
        displayType = "text"
        thousandSeparator={true}
        prefix = "$"
        decimalScale={2}
        fixedDecimalScale = {true}
        renderText={(value) => <Text style = {styles.subtotal}>{value}</Text>}>
        </NumberFormat>
    </View>
  )
}

export default CheckoutTaxes

const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
},

name: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15
},

subtotal: {
    right: 0,
    position: 'absolute',
    marginRight: 20,
    fontSize: 15
}})