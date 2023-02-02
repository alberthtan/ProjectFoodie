import { View, Text , StyleSheet, Pressable, TouchableOpacity, TouchableHighlight, Image} from 'react-native'
import React from 'react'
import { assets } from '../../../react-native.config'
import locationButton from '../../../assets/icons/location.png'
// import { CARD_COLORS } from '../RestaurantCard/RestaurantCard'

const LocationButton = ({onPress}) => {
  return (
    <TouchableHighlight
      onPress={onPress} 
      underlayColor="#A8BDA6"
      style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{height: 20, width: 20, marginRight: 5}} source={locationButton}/>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Location</Text>
            
        </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 15,
      marginVertical: 10,
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#3C6F37',
    },
})

export default LocationButton