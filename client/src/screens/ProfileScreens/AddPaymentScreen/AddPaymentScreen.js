import { Dimensions, Text, View, StyleSheet, DatePickerIOSComponent, Image, TouchableOpacity, Touchable} from 'react-native'
import React, {useState}  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import xIcon from '../../../../assets/icons/xicon.png'
import CustomButton from '../../../components/CustomButton'
import CustomInput from '../../../components/CustomInput'


const AddPaymentScreen = ({navigation}) => {
    const [cardNumber, setCardNumber] = useState('')
    const [expirationDate, setExpirationDate] = useState('')
    const [cvc, setCvc] = useState('')
    const [zipcode, setZipCode] = useState('')

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
        <View style={{flex: 1, alignItems:'center'}}>
            <CustomInput 
                placeholder="Card number"
                value={cardNumber} 
                setValue={setCardNumber}
                keyboardType="number-pad"
                autoFocus={true}
            />

            <View style={{flexDirection: 'row', width: '95%'}}>
                <View style={{flex: 1}}>
                <CustomInput 
                    placeholder="Expiration Date"
                    value={expirationDate} 
                    setValue={setExpirationDate}
                    keyboardType="number-pad"
                />
                </View>

                <View style={{flex: 1}}>
                    <CustomInput 
                        placeholder="CVC"
                        value={cvc} 
                        setValue={setCvc}
                        keyboardType="number-pad"
                    />
                </View>

            </View>

            <CustomInput 
                placeholder="Zipcode"
                value={zipcode} 
                setValue={setZipCode}
                keyboardType="number-pad"
            />
            <View style={{alignItems: 'center', width: '100%', marginTop: '30%'}}>
            <CustomButton
                text = "Use This Card"
                onPress = {() => {navigation.navigate("Payments"), console.log("using this card")}}
                />
            </View>
        </View>
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