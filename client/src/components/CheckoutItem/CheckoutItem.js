import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'

import trashIcon from '../../../assets/icons/trash.png'

const CheckoutItem = ({navigation, sharedBy, id, name, price, parentCallback}) => {
  return (
    <View>
    <View style = {styles.container}>

        <Pressable
            style={{height: 30, marginRight: 5, paddingBottom: 10, marginLeft: 20}}
            onPress={() => {parentCallback(id)}}>
                <Image source={trashIcon} resizeMode="contain" style={{
                    width: 20,
                    height: 20,
                    alignSelf:'center',
                    justifyContent: 'center',
                    flex: 1,
                    tintColor: '#000000',
                }}/>
        </Pressable>

        <Text style = {styles.name}>{name}</Text>

        {sharedBy.length != 0 ? 
        <View style={styles.price}>
            <NumberFormat
                value = {price}
                displayType = "text"
                thousandSeparator={true}
                prefix = "$"
                decimalScale={2}
                fixedDecimalScale = {true}
                renderText={(value) =>
                    <Text style={[{textDecorationLine: 'line-through', fontSize: 15}, styles.faded]}>{value} </Text>          
                }>
            </NumberFormat>
            <NumberFormat
                value = {price/ (sharedBy.length + 1)}
                displayType = "text"
                thousandSeparator={true}
                prefix = "$"
                decimalScale={2}
                fixedDecimalScale = {true}
                renderText={(value) =>
                    <Text style={{fontSize: 15}}>{value}</Text>          
                }>
            </NumberFormat>
        </View>
        :
        <NumberFormat
            value = {price}
            displayType = "text"
            thousandSeparator={true}
            prefix = "$"
            decimalScale={2}
            fixedDecimalScale = {true}
            renderText={(value) =>
                <Text style={[styles.price]}>{value}</Text>          
            }>
        </NumberFormat>
        }
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
        fontSize: 15,
        flexDirection: 'row'
    },

    faded: {
        color: '#7C7878'
    }
})