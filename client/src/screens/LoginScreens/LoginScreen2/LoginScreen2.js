import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, { useState, useContext } from 'react'
import { Context } from "../../../globalContext/globalContext.js"
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import backIcon from '../../../../assets/icons/backicon.png';
import BackButton from '../../../components/BackButton';

const LoginScreen2 = ({navigation, route}) => {
    const globalContext = useContext(Context)

    const { emailParam } = route.params
    const { setIsLoggedIn, userObj, setUserObj, setToken, getToken } = globalContext

    const [code, setCode] = useState('')

    // function initAppSettings() {
    //     fetch(`${domain}/app/settings`, {
    //         method: 'GET'
    //     })
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         } else {
    //             throw res.json()
    //         }
    //     })
    //     .then(json => {
    //         console.log(json)
    //         setAppSettings(json)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }
    
    const sendEmailCode = () => {
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
            .then(navigation.navigate('HomeTabs'))
            .catch(error => {
                console.error(error);
        });
    }

     const verifyEmailCode = async () => {
        return await fetch('https://dutch-pay-test.herokuapp.com/verify-email-code/', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailParam,
            code: code,
            is_register: false,
          }),
        })
        .then(response => response.json())
        .then(json => {
            if (json.hasOwnProperty('code')) {
                console.log("invalid code")
            } else if (json['username'] === emailParam){

                setToken(json.token.refresh, json.token.access)
                setUserObj(json)
                setIsLoggedIn(true)
                navigation.navigate('HomeTabs')  
                
            } else {
                console.log("invalid")
            }
        })
        .catch(error => {
            console.error(error);
        });
      }

      const handleLogin = () => {
        // navigation.navigate('HomeTabs')
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
                        Enter your 6 digit code
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
                        sendEmailCode()
                        console.log('resending code')
                    }}>
                    Resend
                </Text>
                <View style={{width:'100%', flex: 1, marginTop: '60%', alignItems: 'center'}}>
                    <CustomButton
                        text="Continue"
                        onPress={handleLogin}
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

export default LoginScreen2