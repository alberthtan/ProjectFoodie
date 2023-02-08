import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'

const CheckoutTotal = ({subtotal, taxRate}) => {
  return (
    <View style={[styles.container, {flex: 1, flexDirection: 'row'}]}>
      <Text style={styles.name}>Total</Text>
      <NumberFormat
        value = {subtotal + subtotal * taxRate}
        displayType = "text"
        thousandSeparator={true}
        prefix = "$"
        decimalScale={2}
        fixedDecimalScale = {true}
        renderText={(value) => <Text style={styles.total}>{value}</Text>}>
        </NumberFormat>
    </View>
  )
}

export default CheckoutTotal

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },

    name: {
        marginLeft: Dimensions.get('window').width * 0.05,
        marginRight: Dimensions.get('window').width * 0.05,
        fontSize: 17,
        fontWeight: "bold"
    },

    total: {
        right: 0,
        position: 'absolute',
        marginRight: Dimensions.get('window').width * 0.05,
        fontSize: 17,
        fontWeight: "bold",
        textAlign: 'right'
    }
})