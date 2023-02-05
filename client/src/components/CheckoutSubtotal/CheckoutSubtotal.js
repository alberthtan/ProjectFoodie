import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'

const CheckoutSubtotal = ({subtotal}) => {
  return (
    <View style={[styles.container, {flex: 1, flexDirection: 'row'}]}>
      <Text style={styles.name}>Subtotal</Text>
      <NumberFormat
        value = {subtotal}
        displayType = "text"
        thousandSeparator={true}
        prefix = "$"
        decimalScale={2}
        fixedDecimalScale = {true}
        renderText={(value) => <Text style={styles.subtotal}>{value}</Text>}>
        </NumberFormat>
    </View>
  )
}

export default CheckoutSubtotal

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },

    name: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 17,
    },

    subtotal: {
        right: 0,
        position: 'absolute',
        marginRight: 20,
        fontSize: 17,
        textAlign: 'right',
    }
})