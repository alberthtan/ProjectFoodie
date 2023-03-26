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
  }, [])

  const data = [
    {
      // id: 0,
      name: 'Jack\'s Wife Freda',
      mainImage: 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg',
      address: '50+Carmine+St+New+York+NY+10014+United+States',
      dish1: 'Yogurt Parfait',
      dish2: 'Omelette',
      dish3: 'Jack\'s Breakfast',
      points: 9
    },
    {
      // id: 1,
      name: 'Sherkaan',
      mainImage: 'https://images.squarespace-cdn.com/content/v1/5c5c3833840b161566b02a76/1554140515685-SA6JFOU3IJRJI6ZR9L71/social+share-01.jpg',
      address: '50+Carmine+St+New+York+NY+10014+United+States',
      dish1: 'Mango Lassi',
      dish2: 'House Salad',
      dish3: 'Butter Chicken',
      points: 7
    },
    {
      // id: 1,
      name: 'Laree Ada',
      mainImage: 'https://jerseydigs.com/wp-content/uploads/2020/05/Laree-Adda-287-Grove-Street-jersey-city-pakistani-restaurant.jpg',
      address: '50+Carmine+St+New+York+NY+10014+United+States',
      dish1: 'Mango Lassi',
      dish2: 'Garlic Naan',
      dish3: 'Chicken Biryani',
      points: 5
    },
    {
      // id: 1,
      name: 'Ippudo',
      mainImage: 'https://cdn.vox-cdn.com/thumbor/IUiqHJ6R5L1S3L768esRV9yMOvg=/0x0:1150x765/1200x800/filters:focal(511x361:695x545)/cdn.vox-cdn.com/uploads/chorus_image/image/56562025/menu_02.0.jpg',
      address: '50+Carmine+St+New+York+NY+10014+United+States',
      dish1: 'Edamame',
      dish2: 'Gyoza',
      dish3: 'Ippudo Ramen',
      points: 4
    },{
      // id: 1,
      name: 'Kuro Shiro',
      mainImage: 'https://d1ralsognjng37.cloudfront.net/9712875e-0784-4676-8cbb-4c9e791748b9',
      address: '50+Carmine+St+New+York+NY+10014+United+States',
      dish1: 'Gyoza',
      dish2: 'Fried Rice',
      dish3: 'Shoyu Ramen',
      points: 2
    }
  ]

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
          <View style = {styles.title2}>
            <Text style={styles.text}>DutchPay</Text>
          </View>
        {/* <View style={styles.dutchCard}>
          <DutchCard onPress={() => {navigation.navigate('PastOrders')}}/>
        </View> */}
      </>
      }

      

      <View style = {styles.cardContainer}>

          <CarouselCards data={data}/>
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
      // justifyContent: 'center',
      // fontSize: Dimensions.get('window').width * 0.075, 
      // fontWeight: 'bold',
      // fontFamily: 'Roboto_700Bold',
      // position: 'absolute',

      // top: Dimensions.get('window').height * 0.08,
      // left: Dimensions.get('window').width * 0.05,
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#D9D9D9',

      shadowColor: '#171717',
      shadowOpacity: 0.05,
      shadowRadius: 6,
      shadowOffset: {width: 0, height:10},
      backgroundColor: '#f6f5f5',
    },

    text: {
      fontSize: Dimensions.get('window').width * 0.075, 
      fontWeight: 'bold',
      // fontFamily: 'Roboto_700Bold',
      color: '#3C6F37',
      bottom: Dimensions.get('window').height * 0.03,
      position: 'absolute',
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