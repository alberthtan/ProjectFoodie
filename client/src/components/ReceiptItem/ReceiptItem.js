import { StyleSheet, Text, View, Pressable, Image, Dimensions, Vibration, Platform } from 'react-native'
import React, {useContext} from 'react'
import NumberFormat from 'react-number-format'

import { Context } from '../../globalContext/globalContext'

const ReceiptItem = ({navigation, sharedBy, id, name, price, order}) => {
    console.log(sharedBy)
    const globalContext = useContext(Context)
    const { userObj } = globalContext

    return (
        <View style = {[styles.container, {flexDirection: 'row'}]}>

            <View style={{ alignSelf: 'flex-end', marginLeft: '5%'}}>

                <Text style = {styles.itemName}>
                    {name}
                </Text>

                <Text style={[styles.sharedText, styles.faded, sharedBy.length == 0 ? styles.disappear: styles.appear]}>
                    Shared with:

                    {JSON.parse(order.orderedBy).id != userObj['id'] ? 
                        ' ' + JSON.parse(order.orderedBy).first_name :
                            <></>
                    }
                    
                    {sharedBy.map(obj => {

                        if (JSON.parse(obj).id == userObj['id']) {
                            return
                        }

                        return ' ' + JSON.parse(obj).first_name
                    }
                        )}
                </Text> 

            </View>
            

            {sharedBy.length != 0 ? 
            <View style={styles.priceContainer}>
                <NumberFormat
                    value = {price / (sharedBy.length + 1)}
                    displayType = "text"
                    thousandSeparator = {true}
                    prefix = "$"
                    decimalScale = {2}
                    fixedDecimalScale = {true}
                    renderText={(value) =>
                        <Text style={styles.bigPriceText}>{value}</Text>          
                    }>
                </NumberFormat>
                <NumberFormat
                    value = {price}
                    displayType = "text"
                    thousandSeparator={true}
                    prefix = "$"
                    decimalScale={2}
                    fixedDecimalScale = {true}
                    renderText={(value) =>
                        <Text style={[styles.smallPriceText, styles.strikethrough, styles.faded]}>{value}</Text>          
                    }>
                </NumberFormat>
            </View>
            :
            <View style={styles.priceContainer}>
                <NumberFormat
                    value = {price}
                    displayType = "text"
                    thousandSeparator={true}
                    prefix = "$"
                    decimalScale={2}
                    fixedDecimalScale = {true}
                    renderText={(value) =>
                        <Text style={styles.bigPriceText}>{value}</Text>          
                    }>
                </NumberFormat>
                <NumberFormat
                    value = {price}
                    displayType = "text"
                    thousandSeparator={true}
                    prefix = "$"
                    decimalScale={2}
                    fixedDecimalScale = {true}
                    renderText={(value) =>
                        <Text style={[styles.smallPriceText, styles.disappear, styles.faded]}>{value}</Text>          
                    }>
                </NumberFormat>
            </View>
            
            }
        </View>
    )
}

export default ReceiptItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        height: 64,
        alignItems: 'center'
    },

    trashButton: {
        height: 50, 
        marginHorizontal: 10,
        justifyContent: 'flex-start',
    },

    trashIcon: {
        width: 20,
        height: 20,
        alignSelf:'center',
        tintColor: '#000000',
    },

    itemName: {
        fontSize: 17
    },

    sharedText: {
        height: 18, 
        fontSize: 14, 
        marginTop: 5,
    },

    priceContainer: {
        position: 'absolute',
        right: 20,
        alignSelf: 'flex-end',
    },

    bigPriceText: {
        fontSize: 17, 
        textAlign: 'right'
    },

    smallPriceText: {
        fontSize: 14, 
        marginTop: 5, 
        textAlign: 'right'
    },

    faded: {
        color: '#7C7878'
    },

    disappear: {
        opacity: 0
    },

    appear: {
        opacity: 1
    },

    strikethrough: {
        textDecorationLine: 'line-through', 
    }
})