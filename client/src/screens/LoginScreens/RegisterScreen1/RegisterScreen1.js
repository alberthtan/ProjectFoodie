import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, { useState, useEffect} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import BackButton from '../../../components/BackButton';

// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import { firebaseConfig } from '../../../config';
// import firebase from 'firebase/compat/app'

import { auth } from '../.././../config'


const RegisterScreen1 = ({navigation}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    const validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
        //   this.setState({ email: text })
          return false;
        }
        else {
          return true
        //   console.log("Email is Correct");
        }
      }

    const sendEmailCode = () => {
        // console.log(emailParam)

        if(validate(email)) {
            return fetch('https://dutch-pay-test.herokuapp.com/send-email-code/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
                })
                .then(console.log("success"))
                .then(navigation.navigate('Register2', {emailParam: email, firstName: firstName, lastName: lastName}))
                .catch(error => {
                    console.error(error);
            });
        } else {
            console.log("invalid email")
        }
        
      }

    const handleSignUp = () => {
        navigation.navigate('Register2', {emailParam: 'allenchun360@gmail.com', firstName: 'Allen', lastName: 'Chun'})

        // sendEmailCode()
    }



    return (
        <View style= {styles.root}>
            
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                    <BackButton/>
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Text style = {styles.title}>
                    Enter your phone number
                </Text>
                <Text style = {styles.subtitle}>
                    You'll login with a code instead of a password
                </Text>
            </View>
            <CustomInput 
                placeholder="First Name"
                value={firstName} 
                setValue={setFirstName}
                autoFocus={true}
                keyboardType="default"
            />
            <CustomInput
                placeholder="Last Name"
                value={lastName}
                setValue={setLastName}
                keyboardType="default"
            />
            <CustomInput 
                placeholder="Email"
                value={email} 
                setValue={setEmail}
                keyboardType="email-address"
            />
            {/* <CustomInput 
                placeholder="Password"
                value={password} 
                setValue={setPassword}
                secureTextEntry
                keyboardType="default"
            /> */}
            <View style={{width:'100%', flex: 1, alignItems: 'center'}}>
                <CustomButton
                    text="Continue"
                    onPress={handleSignUp}
                />
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        padding: 20,
        backgroundColor: '#F9FBFC',
        width: '100%'
    },

    backButton: {
        height: 30,
        marginTop: Dimensions.get('window').height * 0.07,
        marginLeft: 0,
        alignSelf: 'flex-start'
    },

    title: {
      fontSize: 25,
      color: '#3C6F37',
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      marginTop: 10
    },

    subtitle: {
        fontSize: 15,
        color: 'black',
        marginTop: 10,
        marginBottom: 10
    },
})

export default RegisterScreen1