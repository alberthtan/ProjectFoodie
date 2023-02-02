import { View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native'
import React, { useState, useRef } from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'

import LoginHeader from '../../../components/LoginHeader';

const RegisterScreen1 = ({navigation}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [invalid, setInvalid] = useState(false)
    const [invalidText, setInvalidText] = useState('')

    const inputFirstName = useRef()
    const inputLastName = useRef()
    const inputEmail = useRef()

    const validateEmailFormat = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return (reg.test(email))
    }

    const sendEmailCode = () => {
        console.log("here")

        if(validateEmailFormat(email)) {
            return fetch('https://dutch-pay-test.herokuapp.com/send-email-code/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    is_register: true,
                }),
            })
            .then(response => {
                console.log(response.status)
                if (response.status === 201) {
                    setInvalid(false)
                    navigation.navigate('Register2', {emailParam: email, firstName: firstName, lastName: lastName})
                } else if (response.status === 400){
                    console.log('Unable to send email code')
                    setInvalidText('Email already exists')
                    setInvalid(true)
                }
            })
            .catch(error => {
                console.error(error);
            });
        } else {
            console.log("Invalid email format")
            setInvalidText('Invalid email format')
            setInvalid(true)
        }
        
      }

    const handleSignUp = () => {
        sendEmailCode()
    }

    return (
        <View style= {styles.root}>

            <LoginHeader 
                navigation={navigation}
                title = "Sign up"
                subtitle = "We'll use your email to log in."
            />

            <View style={{alignItems: 'center'}}>
                <CustomInput 
                    ref={inputFirstName}
                    placeholder="First Name"
                    value={firstName} 
                    setValue={setFirstName}
                    autoFocus={true}
                    keyboardType="default"
                    returnKeyType="next"
                    onSubmitEditing={() => inputLastName.current.focus()}
                    // onChangeText={(firstName) => {inputLastName.current.focus()}}
                />
                <CustomInput
                    placeholder="Last Name"
                    value={lastName}
                    setValue={setLastName}
                    keyboardType="default"
                    returnKeyType="next"
                    ref={inputLastName}
                    onSubmitEditing={() => inputEmail.current.focus()}
                />
                <CustomInput 
                    placeholder="Email"
                    value={email} 
                    setValue={setEmail}
                    keyboardType="email-address"
                    autoCapitalize='none'
                    returnKeyType='go'
                    ref={inputEmail}
                    onSubmitEditing={() => handleSignUp()}
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                />
                {invalid ? 
                    <Text
                        style={styles.invalidStyle}>
                        {invalidText}
                    </Text> : 
                    <></>
                }
            </View>

            <View style={{width:'100%', alignItems: 'center', marginTop: Dimensions.get('window').height * 0.05}}>
                <CustomButton
                    text="Continue"
                    onPress={handleSignUp}
                    disabled={(firstName == '' || lastName == '' || email == '')}
                />
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        padding: 20,
        backgroundColor: 'white',
        width: '100%',
    },
    invalidStyle: {
        position: 'absolute',
        color: 'red',
        right: Dimensions.get('window').width * 0.04,
        top: Dimensions.get('window').height * 0.25,
    },
})

export default RegisterScreen1