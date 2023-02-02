import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'

import LoginHeader from '../../../components/LoginHeader';

const RegisterScreen3 = ({navigation, route}) => {
    const { emailParam, firstName, lastName } = route.params;
    const [phoneNumber, setPhoneNumber] = useState('')

    const sendCode = () => {
        return fetch('https://dutch-pay-test.herokuapp.com/send-phone-code/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone_number: '+1' + phoneNumber,
            }),
            })
            .then(console.log("success"))
            .then(navigation.navigate('Register4', {phoneParam: phoneNumber, emailParam: emailParam, firstName: firstName, lastName: lastName}))
            .catch(error => {
                console.error(error);
        });
        
      }

      const handleSignUp = () => {
        sendCode()
    }

    return (
        <View style= {styles.root}>

            <LoginHeader 
                navigation={navigation}
                title = "Enter your phone number"
                subtitle = "You'll log in with a code instead of a password."
            />

            <View style={{alignItems: 'center'}}>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                     <Text style={{marginRight: 5}}>
                        +1
                     </Text>
                     <CustomInput 
                        placeholder="(615) 975-4270"
                        value={phoneNumber} 
                        setValue={setPhoneNumber}
                        autoFocus={true}
                        keyboardType="number-pad"
                        returnKeyType="go"
                        onSubmitEditing={() => handleSignUp()}
                        maxLength={10}
                        // onChangeText={(firstName) => {inputLastName.current.focus()}}
                    />
                </View>

                <View style={{width:'100%', alignItems: 'center', marginTop: Dimensions.get('window').height * 0.28}}>
                    <CustomButton
                        text="Continue"
                        onPress={handleSignUp}
                        disabled={(phoneNumber == '')}
                    />
                </View>
            </View>
            
        </View>
  )
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        padding: 20,
        backgroundColor: '#F9FBFC',
        width: '100%',
    },
})

export default RegisterScreen3