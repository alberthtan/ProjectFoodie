import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Image } from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'

const MenuItem = ({navigation, item, name, price, description, subtotal, restaurant_id, table_id, isOrdering, restaurant_name}) => {
  return (
    <TouchableHighlight
    style={{width: '100%', alignItems: 'center'}}
        underlayColor='#E5EFE3'
        onPress = {() => navigation.navigate('Item', {item: item,
                                                      subtotal: subtotal, restaurant_id : restaurant_id, restaurant_name: restaurant_name, table_id: table_id, isOrdering: isOrdering})}>
            
          <View style={styles.container}>
            <View style={{width: '75%'}}>
              <Text style = {styles.itemName}>{name}</Text>

              <NumberFormat
                    value = {price}
                    displayType = "text"
                    thousandSeparator={true}
                    prefix = "$"
                    decimalScale={2}
                    fixedDecimalScale = {true}
                    renderText={(value) => <Text style = {styles.itemPrice}>{value}</Text>}>
                </NumberFormat>

              <Text style = {styles.itemDescription}>
                {description}
              </Text>
            </View>
            <Image style={styles.image} source={{uri: 'https://www.elmundoeats.com/wp-content/uploads/2021/02/FP-Quick-30-minutes-chicken-ramen.jpg'}}/>

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