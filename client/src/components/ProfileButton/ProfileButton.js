import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import frontArrowIcon from '../../../assets/icons/frontarrow.png'

const ProfileButton = ({name, onPress, imageSource}) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.bodyContainer}>
          <Image source={imageSource} resizeMode="contain" style={styles.imageIcon}/>
          <Text style={styles.buttonText}>
              {name}
          </Text>
          <Image source={frontArrowIcon} resizeMode="contain" style={styles.frontArrow}/>
        </View>
    </TouchableOpacity>
  )
}

export default ProfileButton

const styles = StyleSheet.create({
    bodyContainer: {
        flexDirection: 'row',
        // paddingTop: 20,
        marginBottom: 40,
        // padding: 20,
        width: '100%',
      },

      imageIcon: {
        width: 20,
        height: 20,
        alignSelf:'center',
        tintColor: '#000000',
        flex: 1
      },
      
      frontArrow: {
        width: 15,
        height: 15,
        alignSelf:'center',
        // tintColor: '#000000',
        flex: 0.5
      },
    
      buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '95%',
        flex: 10,
        marginLeft: 10 
      },
})