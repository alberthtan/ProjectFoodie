import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Image } from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'
import * as Haptics from 'expo-haptics'

const MenuItem = ({navigation, item, subtotal, restaurant_id, active_menu, table_id, isOrdering, restaurant_name}) => {
  return (
    <TouchableHighlight
    style={{width: '100%', alignItems: 'center'}}
        underlayColor='#E4E4E4'
        onPress = {() => {navigation.navigate('Item', {item: item,
                                                      subtotal: subtotal, restaurant_id : restaurant_id, active_menu: active_menu, restaurant_name: restaurant_name, table_id: table_id, isOrdering: isOrdering}),
                                                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}>
            
          <View style={styles.container}>
            <View style={{width: '75%'}}>
              <Text style = {styles.itemName}>{item.name}</Text>

              <NumberFormat
                    value = {item.price}
                    displayType = "text"
                    thousandSeparator={true}
                    prefix = "$"
                    decimalScale={2}
                    fixedDecimalScale = {true}
                    renderText={(value) => <Text style = {styles.itemPrice}>{value}</Text>}>
                </NumberFormat>

              <Text style = {styles.itemDescription} numberOfLines={3}>
                {item.description}
              </Text>
            </View>
            <Image style={styles.image} source={{uri: item.itemImage}}/>

          </View>
      
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    container: {
        // height: Dimensions.get('window').height * 0.11,
        width: '90%',
        paddingVertical: Dimensions.get('window').height * 0.021,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#E5E5E5'
    },

    itemName: {
        fontWeight: 'bold',
    },

    itemPrice:{
      marginTop: 5
    },

    itemDescription: {
        color: '#7C7878',
        marginTop: 5,
        width: '95%',
    },
    image: {
      height: 90,
      width: '25%',
      borderRadius: 10,
    }
})

export default MenuItem