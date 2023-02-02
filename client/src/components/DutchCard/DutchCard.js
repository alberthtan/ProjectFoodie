import { StyleSheet, Text, View, TouchableHighlight, Image, Dimensions } from 'react-native'
import React from 'react'
import SwipeRightIcon from '../../../assets/icons/swipe-right.png'

const DutchCard = ({onPress}) => {
  return (
    <TouchableHighlight
      onPress={onPress} 
      underlayColor='#BEE8B8'
      style={styles.button}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
              <Text style={styles.text}>See who you've</Text>
              <Text style={styles.text}>gone <Text style={{color: '#3C6F37'}}>Dutch</Text> with!</Text>
          </View>
          <Image source={SwipeRightIcon} resizeMode="contain" style={styles.swipeRightArrow}/>        
        </View>
        
    </TouchableHighlight>
  )
}

export default DutchCard

const styles = StyleSheet.create({
    button: {
      shadowColor: '#171717',
      shadowOpacity: 0.12,
      borderRadius: 20,
      shadowRadius: 3,
      shadowOffset: {width: 3, height: 10},
    },
  
    container: {
        height: Dimensions.get('window').height * 0.18,
        width: Dimensions.get('window').width * 0.7,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        flexDirection: 'row'
    },

    textContainer: {
      justifyContent: 'center', 
      alignItems: 'center', 

      marginLeft: 10,
    },

    text: {
        fontWeight: 'bold',
        marginVertical: 5,
        fontSize: 18
    },
    swipeRightArrow: {
      width: 50,
      height: 55,
      alignSelf:'center',
      alignItems: 'flex-end',
      left: 10,
    },
})