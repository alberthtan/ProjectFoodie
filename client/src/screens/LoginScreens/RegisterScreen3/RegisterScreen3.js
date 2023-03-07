import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, TextInput} from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import usFlag from '../../../../assets/icons/united-states.png'

import LoginHeader from '../../../components/LoginHeader';

const RegisterScreen3 = ({navigation, route}) => {
    const { emailParam, firstName, lastName } = route.params;
    const [phoneNumber, setPhoneNumber] = useState('')
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('')

    const formatPhoneNumber = (phoneNumberString) => {
        // const temp = phoneNumberString
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        // return null;
        // console.log(temp)
        return null;
      };

      const handleChange = (value) => {
        setPhoneNumber(value)
        const formattedPhoneNumber = formatPhoneNumber(value);
        setFormattedPhoneNumber(formattedPhoneNumber);
      };

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
                     {/* <Text style={{marginRight: 5}}>
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
                    /> */}
                    {/* <PhoneInput
                    defaultCode="US"
                    countryPickerButtonStyle={{backgroundColor:'blue'}}
                    /> */}
                    <View style={styles.input}>
                        <Image source={usFlag} style={{position: 'absolute', left: 15, width: 20, height: 20, zIndex: 1}} />
                        <TextInput
                            placeholder="(615) 975-4270"
                            keyboardType="phone-pad"
                            returnKeyType="go"
                            autoFocus={true}
                            onSubmitEditing={() => handleSignUp()}
                            onChangeText={handleChange}
                            value={formattedPhoneNumber}
                            style={{ marginLeft: 5, height: '100%', paddingLeft: 30, fontSize: 18}}
                            maxLength={10}
                            // style={{fontSize: 20, borderWidth: 1, borderColor: 'gray', padding: 10}}
                        />
                    </View>
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

    input: {
        backgroundColor: '#EEEEEE', 
        width: '95%',
        height: Dimensions.get('window').height * 0.055,

        borderRadius: 10,
        borderColor: 'e8e8e8',

        paddingHorizontal: 10,
        marginVertical: 12,
        justifyContent: 'center'
        
    },
})

export default RegisterScreen3