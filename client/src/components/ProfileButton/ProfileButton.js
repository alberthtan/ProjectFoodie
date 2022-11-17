import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import frontArrowIcon from '../../../assets/icons/frontarrow.png'

const ProfileButton = ({name, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.bodyContainer}>
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
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%'
      },
      
      frontArrow: {
        width: 20,
        height: 20,
        alignSelf:'center',
        justifyContent: 'flex-end',
        tintColor: '#000000',
      },
    
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '95%'
      },
})