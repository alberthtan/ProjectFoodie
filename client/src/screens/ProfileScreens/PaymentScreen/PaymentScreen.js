import { Dimensions, View, StyleSheet, Text} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useIsFocused } from '@react-navigation/native'

import PaymentMethodItem from '../../../components/PaymentMethodItem'
import CustomButton from '../../../components/CustomButton'
import HeaderBar from '../../../components/HeaderBar'

import { Context } from '../../../globalContext/globalContext'

const PaymentScreen = ({navigation}) => {

    const globalContext = useContext(Context)
    const { getToken } = globalContext

    const [paymentMethods, setPaymentMethods] = useState([])
    const [defaultPaymentMethodID, setDefaultPaymentMethodID] = useState(null)
    const [paymentHeader, setPaymentHeader] = useState(true)
    const isFocused = useIsFocused();

    const handleDelete = (id) => {
        let temp = paymentMethods.filter(paymentMethod => paymentMethod.id !== id);
        setPaymentMethods(temp)
    }

    const getDefaultPaymentMethod = async () => {
      let token = await getToken('access')
      authorization = "Bearer".concat(" ", token)
      console.log("getting authorization")
      console.log("YOOOO")
      console.log(authorization)
      console.log(isFocused)
      return fetch('https://dutch-pay-test.herokuapp.com/get_default_payment_method', {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: authorization,
          },
        })
        .then(response => response.json())
        .then(json => {
          console.log("DEFAULT")
          if('default' in json) {
            setDefaultPaymentMethodID(json['default'])
          } else {
            console.log("no default payment method")
          }
          
        })
        .catch(error => {
            console.error(error);
        });
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
              cardEndDigits: json[i]["last4"],
              cardCompany: json[i]["brand"],
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
      console.log("is focused?")
      if(isFocused) {
        getPaymentMethods();
        getDefaultPaymentMethod()
        // setTimeout(() => {
        //   getPaymentMethods()
        // }, 2000);
        setTimeout(() => {
          getDefaultPaymentMethod()
          getPaymentMethods()
        }, 1000);
      }
    }, [isFocused])

    const onePaymentMethod = ({item}) => (
      <PaymentMethodItem
          navigation = {navigation}
          cardEndDigits= {item.cardEndDigits}
          cardCompany = {item.cardCompany}
          id = {item.id}
          handleDelete = {handleDelete}
          defaultPaymentMethodID = {defaultPaymentMethodID}
          setDefaultPaymentMethodID = {setDefaultPaymentMethodID}
      />
    )

    return (
      <View style = {styles.container}>
          <HeaderBar name="Payment" navigation={navigation}/>
          <View style={{flex: 1}}>

          {/* {paymentMethods.length == 0 ?  */}
          <ScrollView>
            <View style={{marginLeft: Dimensions.get('window').width * 0.05, marginTop: Dimensions.get('window').height * 0.02}}>
              <Text style={{fontWeight: 'bold'}}>PAYMENT METHODS</Text>
              {paymentMethods.length == 0 ? 
              <Text style={{marginTop: Dimensions.get('window').height * 0.01}}>You have no saved payment methods</Text> :
              <></>}
            </View>

            {paymentMethods.map(item => (
              <PaymentMethodItem
              navigation = {navigation}
              cardEndDigits= {item.cardEndDigits}
              cardCompany = {item.cardCompany}
              id = {item.id}
              handleDelete = {handleDelete}
              defaultPaymentMethodID = {defaultPaymentMethodID}
              setDefaultPaymentMethodID = {setDefaultPaymentMethodID}
          />
            ))}
          </ScrollView>
          {/* :
          <View style={{flex: 1}}>
          <FlatList
            style={{paddingTop: 10}}
            data={paymentMethods}
            renderItem={onePaymentMethod}
            showsHorizontalScrollIndicator = {false}
          />
          </View>
        } */}

      <View style={{alignItems: 'center', width: '100%', padding: 20, marginBottom: Dimensions.get('window').height * 0.03}}>
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