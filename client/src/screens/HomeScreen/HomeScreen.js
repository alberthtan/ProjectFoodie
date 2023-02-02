import { Dimensions, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useRef}  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import StatusBar from '../../components/StatusBar'
import BottomUpReceipt from '../../components/BottomUpReceipt'
import RestaurantItem from '../../components/RestaurantItem'
// import { useFonts } from 'expo-font';
// import {useFonts, Jost_400Regular,} from '@expo-google-fonts/jost'
import * as Font from 'expo-font';
import RestaurantCard from '../../components/RestaurantCard'
import Carousel, {Pagination} from 'react-native-snap-carousel'
import CarouselCards from '../../components/RestaurantCarousel/RestaurantCarousel'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScreen.hideAsync() instead.'])



const HomeScreen = ({route, navigation}) => {
  const [restaurantList, setRestaurantList] = useState([])

  // Fetch Call
  const getRestaurantsFromApi = () => {
    return fetch('https://dutch-pay-test.herokuapp.com/restaurants/?format=json')
      .then(response => response.json())
      .then(json => {
        setRestaurantList(json)
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRestaurantsFromApi();
    console.log(restaurantList)
  }, [])

  return (
    <View style = {styles.container}>

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
        <View style={{marginTop: Dimensions.get('window').height * 0.05}}>
          <CarouselCards data={restaurantList}/>
        </View>
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
      fontSize: Dimensions.get('window').width * 0.075, 
      fontWeight: 'bold',
      fontFamily: 'Roboto_700Bold',
      position: 'absolute',
      bottom: Dimensions.get('window').width * 0.05,
    },

    subtitleContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    
    subtitle: {
      alignSelf: 'center',
      fontFamily: 'Jost_400Regular',
      fontSize: Dimensions.get('window').width * 0.04,
      marginVertical: 5,
      textAlign: 'center'
    },

    cardContainer: {
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
})

export default HomeScreen