import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image, TouchableHighlight, Dimensions} from 'react-native'
import React, {useEffect, useState} from 'react'
import NumberFormat from 'react-number-format'

const PastOrderItem = ({navigation, user, timestamp, restaurant_id, cart_string}) => {
    const [restaurant, setRestaurant] = useState(null)

    const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    const daySuffix = ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
                    "th", "th", "th", "th", "th", "th", "th", "th", "th", "th",
                    "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
                    "st"];
    const date = new Date(timestamp);
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const dayWithSuffix = day + daySuffix[day - 1];
    const formattedDate = `${month} ${dayWithSuffix}, ${year}`;



    const getRestaurant = async () => {
        console.log(restaurant_id)
        return fetch('https://dutch-pay-test.herokuapp.com/restaurants/' + restaurant_id + '/')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setRestaurant(json)
      })
      .catch(error => {
        console.error(error);
      });
    }
    
    useEffect(()=>{
        getRestaurant()
    },[])

  return (
    <TouchableHighlight
        style = {styles.container}
        // onPress = {() => navigation.navigate('RestaurantScreen')}>
        underlayColor='#DCDCDC'
        onPress = {() => navigation.navigate('Receipt2', {restaurant: restaurant, cart_string: cart_string, timestamp: timestamp})}>
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            
            <View style={{width: '20%', borderRadius: 30, left: 10}}>
                {restaurant && 
                    <Image style= {{width: 78, height: 60, borderRadius: 10}} 
                        source={{uri: restaurant.restaurant_image}}/>
                }
            </View>
            <View style = {{width: '65%', marginLeft: '5%'}}>
                {restaurant && 
                    <Text style = {styles.restaurantName}>
                        {restaurant.name}
                    </Text>
                }
                
                <Text style = {styles.transactionDate}>
                    {formattedDate}
                </Text>
                <Text style = {styles.sharedBy}>
                    <Text style={{fontWeight: 'normal'}}> MY CART </Text>
                </Text>
            </View>
            {/* <TouchableOpacity style={styles.receipt} onPress={() => console.log("receipt pressed")}>
                <Text style={styles.text}>Receipt</Text>
            </TouchableOpacity> */}
        </View>
    
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        height: Dimensions.get('window').height * 0.113,
        flex: 1,
    },

    restaurantName: {
        fontWeight: 'bold',
        fontSize: 15,
        // width: '95%'
    },

    transactionDate: {
        // fontWeight: 'bold',
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 5,
    },

    sharedBy: {
        fontSize: 12,
        fontWeight: 'bold'
    },

    receipt: {
        // width: '20%',
        borderRadius: 15,
        // marginRight: 10
        // alignSelf: "flex-end",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3C6F37',
        // height: 30,
        // marginTop: 15,
        height: '60%'
        
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        alignSelf: 'center'
    }
})

export default PastOrderItem