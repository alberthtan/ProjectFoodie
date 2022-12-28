import { Dimensions, View, StyleSheet} from 'react-native'
import React  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import PaymentMethodItem from '../../../components/PaymentMethodItem'
import CustomButton from '../../../components/CustomButton'
import HeaderBar from '../../../components/HeaderBar'

const paymentMethodList = [
  {
    id: 1,
    cardType: 'Debit',
    cardEndDigits: '1234',
    cardCompany: 'Visa',
    bankCompany: 'Chase',
  },
  // {
  //   id: 2,
  //   cardType: 'Debit',
  //   cardEndDigits: '1234',
  //   cardCompany: 'Visa',
  //   bankCompany: 'Chase',
  // },
  // {
  //   id: 3,
  //   cardType: 'Debit',
  //   cardEndDigits: '1234',
  //   cardCompany: 'Visa',
  //   bankCompany: 'Chase',
  // },
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
        <HeaderBar name="Payment Methods" navigation={navigation}/>
      <View style={{flex: 1}}>
        <FlatList
          style={{paddingTop: 10}}
          data={paymentMethodList}
          renderItem={onePaymentMethod}
          showsHorizontalScrollIndicator = {false}
        />
        <View style={{alignItems: 'center', width: '100%', marginBottom: 20}}>
          <CustomButton
              text = "+ Add New Card"
              onPress = {() => navigation.navigate("AddPayment")}
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