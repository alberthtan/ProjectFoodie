import { StyleSheet, Text, View, Image, Dimensions, Linking, Platform } from 'react-native'
import React from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'
import CustomButton from '../CustomButton'

// const restaurantImage = 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg'

const RestaurantCard = ({restaurant}) => {
  
  const openMap = () => {
    let mapUrl = (Platform.OS === 'ios') ? ('maps://?q=' + restaurant.address) : ('http://maps.google.com/maps?q=' + restaurant.address)
    Linking.openURL(mapUrl)
    // Platform.select({
    //     ios: () => {
    //         Linking.openURL('http://maps.apple.com/maps?daddr=');
    //     },
    //     android: () => {
    //         Linking.openURL('http://maps.google.com/maps?daddr=');
    //     }
    // });
}

  
  return (
    <View style={styles.card}>
        <Image style= {{width: '50%', height: '25%', borderRadius: '20%'}} source={{uri: restaurant.mainImage}}/>
     
      <Text style={styles.restaurantName}>
            Jacks' Wife Freda
      </Text>

      <View style={styles.foodImagesContainer}>
        <Image style= {styles.foodImage} source={{uri: restaurant.foodImage1}}/>
        <Image style= {styles.foodImage} source={{uri: restaurant.foodImage2}}/>
        <Image style= {styles.foodImage} source={{uri: restaurant.foodImage3}}/>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
        <CustomButton text='Map' type='MAP' onPress={()=> {openMap()}}/>
      </View>
      
    </View>
  )
}  

export default RestaurantCard

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.4,
        shadowColor: '#171717',
        // shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.12,
        shadowRadius: 3,
        shadowOffset: {width: 0, height: 0},
        backgroundColor: 'beige',
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