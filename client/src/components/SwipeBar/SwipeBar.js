import { StyleSheet, Text, View, Dimensions, Pressable, Image} from 'react-native'
import React from 'react'
import swipeIcon from '../../../assets/icons/swipe-up.png'

const SwipeBar = ({onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>

        <Text style={styles.text}>Tap to view receipt</Text>

        <Image source={swipeIcon} resizeMode="contain" style={styles.swipe}/>

    </Pressable>

  )
}

export default SwipeBar

const styles = StyleSheet.create({
    
    container: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        // height: '30%',
        height: Dimensions.get('window').height * 0.12,
        borderTopEndRadius: 30,
        

        shadowColor: '#171717',
        // shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        
        justifyContent: 'center',
        alignItems: 'center'
    },

    text :{
        fontWeight: 'bold'
    },

    swipe :{
        width: 50,
        height: 50,
        justifyContent: 'center',
    }
    
    


    
})