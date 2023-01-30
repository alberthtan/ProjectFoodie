import { Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useContext}  from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { LogBox } from 'react-native';

import CustomButton from '../../components/CustomButton'
import TipButton from '../../components/TipButton';
import CheckoutItem from '../../components/CheckoutItem'
import AddItemsButton from '../../components/AddItemsButton'
import CheckoutSubtotal from '../../components/CheckoutSubtotal'
import CheckoutTaxes from '../../components/CheckoutTaxes'
import CheckoutTotal from '../../components/CheckoutTotal/CheckoutTotal'
import HeaderBar from '../../components/HeaderBar'
import SharedItem from '../../components/SharedItem'
import SwipeBar from '../../components/SwipeBar';

import { Context } from '../../globalContext/globalContext'
import CustomInput from '../../components/CustomInput';

const TipScreen = ({route, navigation}) => {
  const {subtotal, restaurant_id, table_id, restaurant_name} = route.params

  const [tipAmount, setTipAmount] = useState(null)
  const [currentButton, setCurrentButton] = useState(null)

  const globalContext = useContext(Context)
  const { userObj } = globalContext


const handleSubmitTip = async () => {

    navigation.navigate('Home')
}


  return (
    <View style = {{flex: 1}}>
        

            <Text style = {[styles.totals, {fontWeight: 'bold', fontSize: 22, alignSelf: 'center', marginTop: Dimensions.get('window').height * 0.2}]}>
                Choose Tip
            </Text>

            <Text style = {[styles.totals, { fontSize: 18, alignSelf: 'center', paddingTop: 20}]}>
                Your Total: ${subtotal * 1.08}
            </Text>

            <View style = {{marginTop: 20, flexDirection: 'row', paddingBottom: 20}}>
              <TipButton id = {1} currentButton = {currentButton} setCurrentButton={setCurrentButton} percentage='15%' subtotal={10} parentCallback={setTipAmount}/>
              <TipButton id = {2} currentButton = {currentButton} setCurrentButton={setCurrentButton} percentage='18%' subtotal={10} parentCallback={setTipAmount}/>
              <TipButton id = {3} currentButton = {currentButton} setCurrentButton={setCurrentButton} percentage='20%' subtotal={10} parentCallback={setTipAmount}/>
              
            </View>

            <View style={{width: '50%', alignSelf: 'center'}}>
                <CustomInput
                    keyboardType='numeric'
                    placeholder = 'Enter Custom Amount'
                    setValue= {(amount) => {setTipAmount(amount), setCurrentButton(null)}}
                    returnKeyType={ 'done' }
                />
            </View>

        <View style = {[styles.orderButton]}>
            {(tipAmount != null) ? 
                <CustomButton
                    text = "Done"
                    onPress = {() => handleSubmitTip()}
                /> :
                <CustomButton
                    text = "Done"
                    type ='TERTIARY'
                    onPress = {() => alert("Add tip amount")}
                />
            }
        </View>
    </View>
  )
}

export default TipScreen

const styles = StyleSheet.create({
    orderButton:{
        marginTop: Dimensions.get('window').height * 0.28,
        // justifyContent: 'center',
        alignItems: 'center',
    },

    totals: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 15
    },

    rectangle: {
        width: 200,
        height: 30,
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
      },
})