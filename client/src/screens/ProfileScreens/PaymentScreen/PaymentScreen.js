import { Dimensions, View, StyleSheet} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useIsFocused } from '@react-navigation/native'

import PaymentMethodItem from '../../../components/PaymentMethodItem'
import CustomButton from '../../../components/CustomButton'
import HeaderBar from '../../../components/HeaderBar'

import { Context } from '../../../globalContext/globalContext'

const paymentMethodList = [
  {
    id: 1,
    cardType: 'Debit',
    cardEndDigits: '1234',
    cardCompany: 'Visa',
    bankCompany: 'Chase',
  },
]

const PaymentScreen = ({navigation}) => {

    const globalContext = useContext(Context)
    const { getToken } = globalContext

    const [paymentMethods, setPaymentMethods] = useState([])
    const isFocused = useIsFocused();

    const handleDelete = (id) => {
        let temp = paymentMethods.filter(paymentMethod => paymentMethod.id !== id);
        setPaymentMethods(temp)
    }

    const getPaymentMethods = async () => {
      let token = await getToken('access')
      authorization = "Bearer".concat(" ", token)
      return fetch('https://dutch-pay-test.herokuapp.com/get-cards', {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: authorization,
          },
        })
        .then(response => response.json())
        .then(json => {
          console.log("PAYMENT METHODS")
          // console.log(json)
          let paymentMethodsTemp = []
          console.log(json)
          for(let i=0; i < json.length; i++) {
            let paymentMethod = {
              cardType: 'Debit',
              cardEndDigits: json[i]["last4"],
              cardCompany: json[i]["brand"],
              bankCompany: 'Chase',
              id: json[i]['id']
            }
            paymentMethodsTemp.push(paymentMethod)
            console.log(paymentMethod)
          }
          setPaymentMethods(paymentMethodsTemp)
        })
        .catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
      if(isFocused) {
        getPaymentMethods()
      }
    }, [isFocused])

    const onePaymentMethod = ({item}) => (
      <PaymentMethodItem
          navigation = {navigation}
          cardType = {item.cardType}
          cardEndDigits= {item.cardEndDigits}
          bankCompany = {item.bankCompany}
          cardCompany = {item.cardCompany}
          id = {item.id}
          handleDelete = {handleDelete}
      />
    )

    return (
      <View style = {styles.container}>
          <HeaderBar name="Payment Methods" navigation={navigation}/>
        <View style={{flex: 1}}>
          <FlatList
            style={{paddingTop: 10}}
            data={paymentMethods}
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