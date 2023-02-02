import { Dimensions, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useRef}  from 'react'

import CarouselCards from '../../components/RestaurantCarousel/RestaurantCarousel'
import DutchCard from '../../components/DutchCard';


import { LogBox } from 'react-native';

LogBox.ignoreLogs(['expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScreen.hideAsync() instead.'])



const HomeScreen = ({route, navigation}) => {
  const [restaurantList, setRestaurantList] = useState([])
  const [noReceipts, setNoReceipts] = useState(false)

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

      {noReceipts ? 
      <>
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
      </> :
      <>
          <Text style = {styles.title2}>
            <Text style={{color: '#3C6F37'}}>DutchPay</Text>
          </Text>
        <View style={styles.dutchCard}>
          <DutchCard onPress={() => {console.log("Dutchcard pressed!")}}/>
        </View>
      </>
      }

      

      <View style = {styles.cardContainer}>

          <CarouselCards data={restaurantList}/>
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
      marginTop: Dimensions.get('window').height * 0.05,
      justifyContent: 'center'
    },


    title2: {
      justifyContent: 'center',
      fontSize: Dimensions.get('window').width * 0.075, 
      fontWeight: 'bold',
      fontFamily: 'Roboto_700Bold',
      position: 'absolute',

      top: Dimensions.get('window').height * 0.08,
      left: Dimensions.get('window').width * 0.05,
    },

    dutchCard: {
      // flex: 2,
      // height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'blue',
      // position: 'absolute',
      marginTop: Dimensions.get('window').height * 0.18,
      bottom: Dimensions.get('window').height * 0.02
      // paddingTop: Dimensions.get('window').height * 0.1
    }
})

export default HomeScreen