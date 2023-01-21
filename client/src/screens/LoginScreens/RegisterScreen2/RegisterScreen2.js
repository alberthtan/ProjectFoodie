import { View, StyleSheet, Text, Alert, Dimensions, Image, TouchableOpacity, RecyclerViewBackedScrollView} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import BackButton from '../../../components/BackButton';


const RegisterScreen2 = ({navigation, route}) => {
    const { emailParam, firstName, lastName } = route.params;
    const [code, setCode] = useState('');

    const sendEmailCode = () => {
        return fetch('https://dutch-pay-test.herokuapp.com/send-email-code/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailParam,
          }),
        })
        .then(console.log("success"))
        .then(res => console.log(res.json()))
        .catch(error => {
          console.error(error);
        });
      }

      const verifyEmailCode = () => {
        return fetch('https://dutch-pay-test.herokuapp.com/verify-email-code/', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailParam,
            code: code,
            is_register: true
          }),
        })
        .then(response => response.json())
        .then(json => {
            console.log('success')
            if (json['code'] === code) {
                navigation.navigate('Register3', {emailParam: emailParam, firstName: firstName, lastName, lastName})
            }
            console.log(json['code'])
        })
        .catch(error => {
            console.error(error);
        });
      }

      const handleSignUp = () => {
        // navigation.navigate('Register3', {emailParam: emailParam, firstName: firstName, lastName: lastName})

        verifyEmailCode()
    }


    return (
        <View style= {styles.root}>
            
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                    <BackButton/>
            </TouchableOpacity>

            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style = {styles.title}>
                        Enter your 6 digit
                    </Text>
                    <Text style = {styles.subtitle}>
                        Sent to {emailParam}
                    </Text>
                </View>
                
                <CustomInput 
                    value={code} 
                    setValue={setCode}
                    autoFocus={true}
                    keyboardType="number-pad"
                />
                <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                        sendEmailCode();
                        console.log('resending code');
                    }}>
                    Resend
                </Text>
                <View style={{width:'100%', flex: 1, marginTop: '50%', alignItems: 'center'}}>
                    <CustomButton
                        text="Continue"
                        onPress={handleSignUp}
                    />
                </View>
            </View>
            
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    root: {
        alignItems: 'center',
        flex:1,
        padding: 20,
        backgroundColor: '#F9FBFC',
        width: '100%',
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
      marginTop: 10,
    },

    subtitle: {
        fontSize: 15,
        color: 'black',
        marginTop: 10,
        marginBottom: 10,
    },

    hyperlinkStyle: {
        color: 'green',
        alignSelf: 'flex-end',
        marginRight: '5%',
    },
})

export default RegisterScreen2