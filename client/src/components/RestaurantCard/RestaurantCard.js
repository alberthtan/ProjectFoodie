// import { StyleSheet, Text, View, Image, Dimensions, Linking, Platform } from 'react-native'
// import React from 'react'
// import { TouchableHighlight } from 'react-native-gesture-handler'
// import CustomButton from '../CustomButton'
// import LocationButton from '../LocationButton'

// // const restaurantImage = 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg'

// export const SLIDER_WIDTH = Dimensions.get('window').width + 80
// export const ITEM_WIDTH = 250
// export const CARD_COLORS = ['#ccd5ae', '#e9edc9', '#fefae0', '#faedcd', '#d4a373', '#fec89a', '#ffd7ba', '#d8e2dc', '#fec5bb']


// const RestaurantCard = ({item, index}) => {
//   let restaurant = item

//   const openMap = () => {
//     let mapUrl = (Platform.OS === 'ios') ? ('maps://?q=' + restaurant.address) : ('http://maps.google.com/maps?q=' + restaurant.address)
//     Linking.openURL(mapUrl)
//   }

  
//   return (
//     <View style={[styles.card, {backgroundColor: CARD_COLORS[index%CARD_COLORS.length]}]} key={index}>
//         <Image style= {{width: '50%', height: '25%', borderRadius: 20}} source={{uri: restaurant.restaurant_image}}/>
     
//       <Text style={styles.restaurantName}>
//             {restaurant.name}
//       </Text>

//       <View style={styles.foodImagesContainer}>
//         <Image style= {styles.foodImage} source={{uri: 'https://images.otstatic.com/prod1/28948642/4/huge.jpg'}}/>
//         <Image style= {styles.foodImage} source={{uri: 'https://images.otstatic.com/prod1/28948594/5/huge.jpg'}}/>
//         <Image style= {styles.foodImage} source={{uri: 'http://www.prettyinpistachio.com/wp-content/uploads/2013/10/JacksWifeFreda1-72ppi.jpg'}}/>
//       </View>

//       <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
//         <LocationButton 
//           onPress={()=> {openMap()}}
//         />
        
//          {/* <TouchableHighlight
//         onPress={onPress} 
//         underlayColor="#A8BDA6"
//         disabled={disabled}
//         style={styles.container}>
//           <Image style={{height: 10, width: 10 }} source={locationButton}/>
//       </TouchableHighlight> */}
//       </View>
      
//     </View>
//   )
// }  

// export default RestaurantCard

// const styles = StyleSheet.create({
//     card: {
//         alignSelf: 'center',
//         width: Dimensions.get('window').width * 0.6,
//         height: Dimensions.get('window').height * 0.4,
//         shadowColor: '#171717',
//         // shadowOffset: {width: -2, height: 4},
//         shadowOpacity: 0.12,
//         shadowRadius: 3,
//         shadowOffset: {width: 3, height: 10},
//         // backgroundColor: 'beige',
//         borderRadius: 30,
//         justifyContent: 'center',
//         // borderColor: 'black',
//         // borderWidth: 10,
//         alignItems: 'center'
//     },
//     restaurantName: {
//         // flex: 1,
//         fontWeight: 'bold',
//         paddingTop: '5%',
//         fontSize: 15,
//         // backgroundColor: 'red'
//     },

//     foodImagesContainer: {
//         // flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '30%',
//         width: '100%',
//         // backgroundColor: 'red'
//     },
//     foodImage: {
//       width: Dimensions.get('window').width * 0.17, 
//       height: Dimensions.get('window').width * 0.17, 
//       borderRadius: 5,
//     },
// })

import { StyleSheet, Text, View, Image, Dimensions, Linking, Platform } from 'react-native'
import React from 'react'
// import LocationButton from '../LocationButton'

// const restaurantImage = 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg'

// export const SLIDER_WIDTH = Dimensions.get('window').width + 80
// export const ITEM_WIDTH = 250
export const CARD_COLORS = ['#ccd5ae', '#e9edc9', '#fefae0', '#faedcd', '#d4a373', '#fec89a', '#ffd7ba', '#d8e2dc', '#fec5bb']
export const INNER_CARD_COLORS = ['#829460','#DE8971', '#DBA39A', '#BE8C63', '#94AF9F', '#ADC2A9', '#D57E7E', '#6B7AA1', '#F29191']

const RestaurantCard = ({item, index}) => {
  let restaurant = item

  const openMap = () => {
    let mapUrl = (Platform.OS === 'ios') ? ('maps://?q=' + restaurant.address) : ('http://maps.google.com/maps?q=' + restaurant.address)
    Linking.openURL(mapUrl)
  }

  
  return (
    <View style={[styles.card, {backgroundColor: CARD_COLORS[index%CARD_COLORS.length]}]} key={index}>

      <View style={{borderRadius: 30, width: 50, height: 50, backgroundColor: 'green', zIndex: 9999, position: 'absolute', top: 10, right: 50, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
            {restaurant.points}
        </Text>
      </View>

        <Image style= {{width: '50%', height: '25%', borderRadius: 20}} source={{uri: restaurant.mainImage}}/>
     
      <Text style={styles.restaurantName}>
            {restaurant.name}
      </Text>

      {/* <View style={styles.foodImagesContainer}>
        <Image style= {styles.foodImage} source={{uri: 'https://images.otstatic.com/prod1/28948642/4/huge.jpg'}}/>
        <Image style= {styles.foodImage} source={{uri: 'https://images.otstatic.com/prod1/28948594/5/huge.jpg'}}/>
        <Image style= {styles.foodImage} source={{uri: 'http://www.prettyinpistachio.com/wp-content/uploads/2013/10/JacksWifeFreda1-72ppi.jpg'}}/>
      </View> */}

      <View style={[styles.dishesContainer, {backgroundColor: INNER_CARD_COLORS[index%CARD_COLORS.length]}]}>
        <View style = {{width: '83%', height: '100%', justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', height: '30%', alignItems: 'center'}}>

            <Text style={{fontWeight: 'bold', color: 'white', flex: 1}}>
              {restaurant.dish1}
            </Text>

            <View style={{backgroundColor: '#DCDCDC', borderRadius: 20}}>
              <Text style={{paddingVertical: 10, paddingHorizontal: 20, fontWeight: 'bold'}}>
                10
              </Text>
            </View>

          </View>

          <View style={{flexDirection: 'row', height: '30%', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', color: 'white', flex: 1}}>
            {restaurant.dish2}
            </Text>
            <View style={{backgroundColor: '#DCDCDC', borderRadius: 20}}>
              <Text style={{paddingVertical: 10, paddingHorizontal: 20, fontWeight: 'bold'}}>
                15
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', height: '30%', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', color: 'white', flex: 1}}>
            {restaurant.dish3}
            </Text>
            <View style={{backgroundColor: '#DCDCDC', borderRadius: 20}}>
              <Text style={{paddingVertical: 10, paddingHorizontal: 20, fontWeight: 'bold'}}>
                20
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
        {/* <LocationButton 
          onPress={()=> {openMap()}}
        /> */}
        
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
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.5,
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
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height * 0.05,
        marginTop: Dimensions.get('window').height * 0.05,
    },
    restaurantName: {
        // flex: 1,
        fontWeight: 'bold',
        paddingTop: '5%',
        fontSize: 18,
        paddingTop: 20,
        paddingBottom: 20,
        color: '#3C6F37'
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

    dishesContainer: {
      justifyContent: 'center',
      height: '50%',
      width: '85%',
      alignItems: 'center',
      // backgroundColor: '#CCD4BF',
      // backgroundColor: '#EEBAB2',
      // backgroundColor: '#e5db9c',
      // backgroundColor: '#94AF9F',
      borderRadius: 20
    }
})