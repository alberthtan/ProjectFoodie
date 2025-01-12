import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'

const RestaurantItem = ({navigation, id, name, description, restaurantImage}) => {
  return (
    <TouchableOpacity
        style = {styles.container}
        onPress = {() => navigation.navigate('RestaurantScreen', {id: id, name: name})}>
        <View style={{flexDirection: 'row'}}>
            <View style={{width: 70, height: 50, borderRadius: 30, marginRight: 15}}>
              <Image style= {{width: 70, height: 50, borderRadius: 10}} source={{uri: restaurantImage}}/>
            </View>
            <View>
                <Text style = {styles.itemName}>{name}</Text>
                <Text style = {styles.itemDescription}>
                {description}
                </Text>
            </View>
        </View>
    
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginLeft: 10
    },

    itemName: {
        fontWeight: 'bold',
        // fontSize: 18
    },

    itemPrice:{
      marginTop: 5
    },

    itemDescription: {
        color: '#7C7878',
        marginTop: 5
    }
})

export default RestaurantItem