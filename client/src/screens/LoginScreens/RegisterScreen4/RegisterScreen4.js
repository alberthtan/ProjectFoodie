import { View, StyleSheet, Text, Alert, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
// import backIcon from '../../../../assets/icons/backicon.png';
import BackButton from '../../../components/BackButton';
import { Context } from '../../../globalContext/globalContext';

const RegisterScreen4 = ({navigation, route}) => {
    const { emailParam, firstName, lastName, phoneParam } = route.params;
    const [code, setCode] = useState('');

    const globalContext = useContext(Context)
    const { setIsLoggedIn, userObj, setUserObj, setToken, getToken } = globalContext

    const createUser = () => {
        console.log(emailParam + firstName + lastName + phoneParam)
        return fetch('https://dutch-pay-test.herokuapp.com/users/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailParam,
            first_name: firstName,
            last_name: lastName,
            username: emailParam,
            phone_number: '+1' + phoneParam
          }),
        }).then(console.log('created user'))
        .then(response => response.json())
        .then(json => {
          console.log(json)
            if (json["username"] === emailParam) {
              (async () => {
                await setToken(json.token.refresh, json.token.access)
                // console.log("REFRESH TOKEN")
                console.log(getToken("refresh"))
                console.log(getToken("access"))
                setUserObj(json)
                setIsLoggedIn(true)
              })
                navigation.navigate('HomeTabs')
            }

        })
          .catch(error => {
            console.error(error);
          });
      }

    const sendPhoneCode = () => {
        return fetch('https://dutch-pay-test.herokuapp.com/send-phone-code/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone_number: phoneParam,
          }),
        })
        .then(console.log("success"))
        .then(res => console.log(res.json()))
        .then(json => {
            setData(json)
            console.log(data)
          })
          .catch(error => {
            console.error(error);
          });
      }

      const verifyPhoneCode = () => {
        return fetch('https://dutch-pay-test.herokuapp.com/verify-phone-code/', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone_number: '+1' + phoneParam,
            code: code,
            is_registration: true,
          }),
        })
        .then(response => response.json())
        .then(json => {
            console.log('success')
            console.log(phoneParam)
            console.log(json)
            if (json['code'] === code) {
                createUser()
            }
            console.log(json['code'])
        })
        .catch(error => {
            console.error(error);
        });
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
                        Sent to {phoneParam}
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
                        sendPhoneCode();
                        console.log('resending code');
                    }}>
                    Resend
                </Text>
                <View style={{width:'100%', flex: 1, marginTop: '50%', alignItems: 'center'}}>
                    <CustomButton
                        text="Continue"
                        onPress={() => {
                            console.log(verifyPhoneCode())
                        }}
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

export default RegisterScreen4