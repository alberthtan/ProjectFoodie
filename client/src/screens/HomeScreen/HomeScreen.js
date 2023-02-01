import { Dimensions, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useRef}  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import StatusBar from '../../components/StatusBar'
import BottomUpReceipt from '../../components/BottomUpReceipt'
import RestaurantItem from '../../components/RestaurantItem'
// import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import RestaurantCard from '../../components/RestaurantCard'
import Carousel, {Pagination} from 'react-native-snap-carousel'



const HomeScreen = ({route, navigation}) => {
  const [search, setSearch] = useState('')
  const { ordered } = route.params
  const [restaurantList, setRestaurantList] = useState([])
  const [index, setIndex] = useState(0)

  const isCarousel = useRef()
  // const SLIDER_WIDTH = Dimensions.get('window').width + 80
  // const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

  let testRestaurants = [
    {
      // id: 0,
      mainImage: 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg',
      address: '50+Carmine+St+New+York+NY+10014+United+States',
      foodImage1: 'https://images.otstatic.com/prod1/28948642/4/huge.jpg',
      foodImage2: 'https://images.otstatic.com/prod1/28948594/5/huge.jpg',
      foodImage3: 'http://www.prettyinpistachio.com/wp-content/uploads/2013/10/JacksWifeFreda1-72ppi.jpg',
    },
    {
      // id: 1,
      mainImage: 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg',
      address: '50+Carmine+St+New+York+NY+10014+United+States',
      foodImage1: 'https://images.otstatic.com/prod1/28948642/4/huge.jpg',
      foodImage2: 'https://images.otstatic.com/prod1/28948594/5/huge.jpg',
      foodImage3: 'http://www.prettyinpistachio.com/wp-content/uploads/2013/10/JacksWifeFreda1-72ppi.jpg',
    }
  ]

  // const [fontsLoaded] = useFonts({
  //   'Jost': require('../../../assets/fonts/Jost-Regular.ttf'),
  // });

  // const fetchFonts = async () =>
  //   await Font.loadAsync({
  //     'Jost': require('../../../assets/fonts/Jost-Regular.ttf'),
  // });

  const oneRestaurant = ({item}) => {
    <RestaurantCard restaurant = {item}/>
  }

  return (
    <View style = {styles.container}>

      <View style={styles.spacerFlex}></View>

      <View style={styles.titleContainer}>
        <Text style = {styles.title}>
          Welcome to <Text style={{color: '#3C6F37'}}>DutchPay</Text>
        </Text>
      </View>
      

      <View style = {styles.subtitleContainer}>
        <Text style = {styles.subtitle}>
          When you order at restaurants with the
        </Text>
        <Text style = {styles.subtitle}>
          DutchPay camera, you'll see your orders and the 
        </Text>
        <Text style = {styles.subtitle}>
           people you shared them with!
        </Text>
      </View>

      <View style = {styles.cardContainer}>
        <Carousel
        sliderWidth={100}
        itemWidth={50}
          // layout="tinder"
          // layoutCardOffset={0}
        ref={isCarousel}
        data={testRestaurants}
        renderItem={oneRestaurant}
          // sliderWidth={SLIDER_WIDTH}
          // itemWidth={ITEM_WIDTH}
          // removeClippedSubviews={false}
          // onSnapToItem={(index) => setIndex(index)}
          // useScrollView={true}
        />
        {/* <Pagination
          dotsLength={testRestaurants.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        /> */}
        {/* <RestaurantCard restaurant = {testRestaurants[0]}/> */}
      
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f6f5f5',
    },

    
    titleContainer: {
      flex: 2,
    },

    title: {
      alignSelf: 'center', 
      fontSize: Dimensions.get('window').width * 0.07, 
      fontWeight: 'bold',
      // fontFamily: 'Roboto',
      position: 'absolute',
      bottom: Dimensions.get('window').width * 0.05,
    },

    subtitleContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    
    subtitle: {
      alignSelf: 'center',
      // fontFamily: 'Jost',
      fontSize: Dimensions.get('window').width * 0.037,
      marginVertical: 5,
      textAlign: 'center'
    },

    cardContainer: {
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center'
    },

    



    card: {
      // width: Dimensions.get('window').width * 0.3,
      // height: Dimensions.get('window').height * 0.1,
      width: 100,
      height: 100,
      // shadowColor: '#171717',
      // // shadowOffset: {width: -2, height: 4},
      // shadowOpacity: 0.3,
      // shadowRadius: 4,
      borderColor: 'black',
      borderWidth: 10,
      backgroundColor: 'red'
  },
  restaurantName: {
      fontWeight: 'bold',
      fontColor: 'red'
  },
  restaurantImagesContainer: {
      flexDirection: 'row'
  },
  restaurantImages: {

  }


})

export default HomeScreen