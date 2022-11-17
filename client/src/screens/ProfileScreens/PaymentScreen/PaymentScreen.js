import { Dimensions, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Touchable} from 'react-native'
import React, {useState}  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import PaymentMethodItem from '../../../components/PaymentMethodItem'
import backIcon from '../../../../assets/icons/backicon.png'
import CustomButton from '../../../components/CustomButton'

const paymentMethodList = [
  {
    id: 1,
    cardType: 'Debit',
    cardEndDigits: '1234',
    cardCompany: 'Visa',
    bankCompany: 'Chase',
  },
  {
    id: 2,
    cardType: 'Debit',
    cardEndDigits: '1234',
    cardCompany: 'Visa',
    bankCompany: 'Chase',
  },
  {
    id: 3,
    cardType: 'Debit',
    cardEndDigits: '1234',
    cardCompany: 'Visa',
    bankCompany: 'Chase',
  },
]

const PaymentScreen = ({navigation}) => {

const onePaymentMethod = ({item}) => (
  <PaymentMethodItem
      navigation = {navigation}
      cardType = {item.cardType}
      cardEndDigits= {item.cardEndDigits}
      bankCompany = {item.bankCompany}
      cardCompany = {item.cardCompany}
  />
)

  return (
    <View style = {styles.container}>
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <Image source={backIcon} resizeMode="contain" style={{
                    width: 30,
                    height: 30,
                    alignSelf:'center',
                    justifyContent: 'center',
                    flex: 1,
                    tintColor: '#000000',
                }}/>
            </TouchableOpacity>
            <Text style = {styles.title}>
                Payment Methods
            </Text>
        </View>
      <View style={{flex: 1}}>
        <FlatList
          data={paymentMethodList}
          renderItem={onePaymentMethod}
          showsHorizontalScrollIndicator = {false}
        />
        <View style={{alignItems: 'center', width: '100%', marginBottom: 20}}>
          <CustomButton
              text = "+ Add New Card"
              onPress = {() => console.log("adding card")}
              />
        </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        // flexDirection: 'column',
        // justifyContent: 'center'
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

export default PaymentScreen