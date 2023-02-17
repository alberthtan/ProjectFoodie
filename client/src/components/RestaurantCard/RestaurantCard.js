import { StyleSheet, Text, View, Image, Dimensions, Linking, Platform } from 'react-native'
import React from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'
import CustomButton from '../CustomButton'
import LocationButton from '../LocationButton'

// const restaurantImage = 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg'

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = 250
export const CARD_COLORS = ['#ccd5ae', '#e9edc9', '#fefae0', '#faedcd', '#d4a373', '#fec89a', '#ffd7ba', '#d8e2dc', '#fec5bb']


const RestaurantCard = ({item, index}) => {
  let restaurant = item

  const openMap = () => {
    let mapUrl = (Platform.OS === 'ios') ? ('maps://?q=' + restaurant.address) : ('http://maps.google.com/maps?q=' + restaurant.address)
    Linking.openURL(mapUrl)
  }

  
  return (
    <View style={[styles.card, {backgroundColor: CARD_COLORS[index%CARD_COLORS.length]}]} key={index}>
        <Image style= {{width: '50%', height: '25%', borderRadius: 20}} source={{uri: restaurant.restaurant_image}}/>
     
      <Text style={styles.restaurantName}>
            {restaurant.name}
      </Text>

      <View style={styles.foodImagesContainer}>
        <Image style= {styles.foodImage} source={{uri: 'https://images.otstatic.com/prod1/28948642/4/huge.jpg'}}/>
        <Image style= {styles.foodImage} source={{uri: 'https://images.otstatic.com/prod1/28948594/5/huge.jpg'}}/>
        <Image style= {styles.foodImage} source={{uri: 'http://www.prettyinpistachio.com/wp-content/uploads/2013/10/JacksWifeFreda1-72ppi.jpg'}}/>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
        <LocationButton 
          onPress={()=> {openMap()}}
        />
        
         {/* <TouchableHighlight
        onPress={onPress} 
        underlayColor="#A8BDA6"
        disabled={disabled}
        style={styles.container}>
          <Image style={{height: 10, width: 10 }} source={locationButton}/>
      </TouchableHighlight> */}
      </View>
      
    </View>
  )
}  

export default RestaurantCard

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.4,
        shadowColor: '#171717',
        // shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.12,
        shadowRadius: 3,
        shadowOffset: {width: 3, height: 10},
        // backgroundColor: 'beige',
        borderRadius: 30,
        justifyContent: 'center',
        // borderColor: 'black',
        // borderWidth: 10,
        alignItems: 'center'
    },
    restaurantName: {
        // flex: 1,
        fontWeight: 'bold',
        paddingTop: '5%',
        fontSize: 15,
        // backgroundColor: 'red'
    },

    foodImagesContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
        width: '100%',
        // backgroundColor: 'red'
    },
    foodImage: {
      width: Dimensions.get('window').width * 0.17, 
      height: Dimensions.get('window').width * 0.17, 
      borderRadius: 5,
    },
})