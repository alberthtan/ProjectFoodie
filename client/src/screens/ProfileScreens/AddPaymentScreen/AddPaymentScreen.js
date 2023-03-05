import { Dimensions, Text, View, StyleSheet, DatePickerIOSComponent, Image, TouchableOpacity, Touchable} from 'react-native'
import React, {useState}  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import xIcon from '../../../../assets/icons/xicon.png'
import Stripe from '../../../Stripe/Stripe'


const AddPaymentScreen = ({navigation}) => {

  return (
    <View style = {styles.container}>
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <Image source={xIcon} resizeMode="contain" style={{
                    width: 30,
                    height: 30,
                    alignSelf:'center',
                    justifyContent: 'center',
                    flex: 1,
                    tintColor: '#000000',
                }}/>
            </TouchableOpacity>
            <Text style = {styles.title}>
                Add Payment
            </Text>
        </View>

        <Stripe navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },

    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
    backButton: {
        height: 30,
        marginTop: Dimensions.get('window').height * 0.07,
        marginLeft: 0,
        alignSelf: 'flex-start'
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
      },

    filter: {
      height: 15,
      width: 15,
      padding: 12,
      justifyContent: 'center',
      marginLeft: 15
  },
})

export default AddPaymentScreen