import { StyleSheet, Text, View, Pressable, Image, Dimensions, Vibration, Platform } from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'
import * as Haptics from 'expo-haptics'

import trashIcon from '../../../assets/icons/trash.png'

const CheckoutItem = ({navigation, sharedBy, id, name, price, handleDelete}) => {
    console.log(sharedBy)

    return (
        <View style = {[styles.container, {flexDirection: 'row'}]}>
            {handleDelete ? 

                <Pressable
                    style={[styles.trashButton, {flex: 1}]}
                    onPress={() => {handleDelete(id), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}>
                        <Image source={trashIcon} resizeMode="contain" style={[styles.trashIcon, {flex: 1}]}/>
                </Pressable> :

                <></>
            }

            <View style={{flex: 9, alignSelf: 'flex-end'}}>

                <Text style = {styles.itemName}>
                    {name}
                </Text>

                <Text style={[styles.sharedText, styles.faded, sharedBy.length == 0 ? styles.disappear: styles.appear]}>
                    Sharing with: {sharedBy.map(obj => JSON.parse(obj).first_name)}
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

export default CheckoutItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        height: 64,
        alignItems: 'center',
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
        fontSize: 17,
        marginRight: 70,
        // backgroundColor: 'green'
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