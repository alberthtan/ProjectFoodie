import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CustomButton from '../../components/CustomButton'
import CheckoutItem from '../../components/CheckoutItem'
import AddItemsButton from '../../components/AddItemsButton'

const CheckoutScreen = ({route, navigation}) => {
  const {cart, count} = route.params
  console.log(cart)

  return (
    <View style = {{flex: 1}}>
        <View style = {styles.container}>
            <Text style = {styles.checkout}>
                Checkout
            </Text>
        </View>
        
        <ScrollView showsVerticalScrollIndicator = {false}>

            <View style = {styles.rectangle}>
                <Text style = {{fontWeight: 'bold'}}>
                    Table Number: 123456
                </Text>
            </View>

            <Text style = {[styles.totals, {fontWeight: 'bold', fontSize: 18}]}>
                Your Items
            </Text>

            {cart.map(item => (
                <CheckoutItem
                    key = {cart.indexOf(item)}
                    navigation = {navigation}
                    name = {item.name}
                    price = {item.price}
                />
            ))}

            <AddItemsButton
                onPress = {() => navigation.navigate('Menu', {cart: cart, count: count})}
            />

            <View style = {{borderTopWidth: 1, marginTop: 20, borderTopColor: "#D9D9D9"}}>
                <Text style = {styles.totals}>
                    Subtotal
                </Text>
                <Text style = {styles.totals}>
                    Taxes
                </Text>
                <Text style = {[styles.totals, {fontWeight: 'bold'}]}>
                    Total
                </Text>
            </View>

            <View style = {{marginTop: 30}}/>
        </ScrollView>

        <View style = {[styles.orderButton]}>
            <CustomButton
                text = "ORDER"
            />
        </View>
    </View>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
    },

    checkout: {
        bottom: 0, 
        position: 'absolute', 
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 18,
    },

    orderButton:{
        height: Dimensions.get('window').height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
    },

    totals: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 15
    },

    rectangle: {
        width: 200,
        height: 30,
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
      },
})