import { View, StyleSheet, Text, Dimensions} from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import CustomButton from '../../../components/CustomButton'
import { Context } from '../../../globalContext/globalContext';
import LoginHeader from '../../../components/LoginHeader';
import OTPInput from '../../../components/OTPInput';

const RegisterScreen4 = ({navigation, route}) => {
    const { emailParam, firstName, lastName, phoneParam } = route.params;
    const subtitleString = "Sent to +1" + phoneParam

    const [invalid, setInvalid] = useState(false)
    const [invalidText, setInvalidText] = useState('')

    const [num1, setNum1] = useState('')
    const [num2, setNum2] = useState('')
    const [num3, setNum3] = useState('')
    const [num4, setNum4] = useState('')
    const [num5, setNum5] = useState('')
    const [num6, setNum6] = useState('')

    const num1Ref = useRef()
    const num2Ref = useRef()
    const num3Ref = useRef()
    const num4Ref = useRef()
    const num5Ref = useRef()
    const num6Ref = useRef()

    const globalContext = useContext(Context)
    const { setIsLoggedIn, setUserObj, setToken } = globalContext

    // const createUser = async () => {
    //     return await fetch('https://dutch-pay-test.herokuapp.com/users/', {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email: emailParam,
    //         first_name: firstName,
    //         last_name: lastName,
    //         username: emailParam,
    //         phone_number: '+1' + phoneParam
    //       }),
    //     })
    //     .then(response => response.json())
    //     .then(json => {
    //       console.log(json)
    //         if (json["username"] === emailParam) {
    //             setToken(json.token.refresh, json.token.access)
    //             setUserObj(json)
    //             setIsLoggedIn(true)
    //             navigation.navigate('HomeTabs')
    //         }

    //     })
    //       .catch(error => {
    //         console.error(error);
    //       });
    //   }


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

      const verifyPhoneCode = (code) => {
        return fetch('https://dutch-pay-test.herokuapp.com/verify-phone-code/', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone_number: '+1' + phoneParam,
            code: code,
            email: emailParam,
            first_name: firstName,
            last_name: lastName,
            is_registration: true,
          }),
        })
        .then(response => response.json())
        .then(json => {
            console.log('success')
            console.log(phoneParam)
            console.log(json)
            if (json['email'] === emailParam) {
                setInvalid(false)
                setToken(json.token.refresh, json.token.access)
                setUserObj(json)
                setIsLoggedIn(true)
                navigation.navigate('HomeTabs')
            } else {
                setInvalidText('Code does not match')
                setInvalid(true)
            }
            console.log(json['code'])
        })
        .catch(error => {
            console.log('hello')
            console.error(error);
        });
      }

      const handleSignUp = () => {
        let code = num1 + num2 + num3 + num4 + num5 + num6
        if(code.length == 6) {
            verifyPhoneCode(code)
        }
    }

    useEffect(() => {
        handleSignUp()
    }, [num6])


    return (
        <View style= {styles.root}>
            
            <LoginHeader 
                navigation={navigation}
                title = "Enter your 6 digit code"
                subtitle = {subtitleString}
            />

            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: Dimensions.get('window').height * 0.02}}>

                
            <OTPInput
                        ref={num1Ref}
                        value={num1} 
                        onChangeText={(num) => {
                            setNum1(num);
                            if(num) {
                                num2Ref.current.focus()
                            } 
                        }}
                        autoFocus={true}
                        keyboardType="number-pad"
                    />
                    <OTPInput
                        ref={num2Ref}
                        value={num2} 
                        onChangeText={(num) => {
                            setNum2(num);
                            if(num) {
                                num3Ref.current.focus()
                            } 
                        }}
                        onKeyPress={({nativeEvent}) => {
                            if(nativeEvent.key === 'Backspace' && !num2) {
                                num1Ref.current.focus()
                                num1Ref.current.clear()
                                setNum1('')
                            }
                        }}
                        autoFocus={false}
                        keyboardType="number-pad"
                    />
                    <OTPInput
                        ref={num3Ref}
                        value={num3}
                        onChangeText={(num) => {
                            setNum3(num);
                            if(num) {
                                num4Ref.current.focus()
                            } 
                        }}
                        onKeyPress={({nativeEvent}) => {
                            if(nativeEvent.key === 'Backspace' && !num3) {
                                num2Ref.current.focus()
                                num2Ref.current.clear()
                                setNum2('')
                            }
                        }}
                        autoFocus={false}
                        keyboardType="number-pad"
                    />
                    <OTPInput
                        ref={num4Ref}
                        value={num4} 
                        onChangeText={(num) => {
                            setNum4(num);
                            if(num) {
                                num5Ref.current.focus()
                            } 
                        }}
                        onKeyPress={({nativeEvent}) => {
                            if(nativeEvent.key === 'Backspace' && !num4) {
                                num3Ref.current.focus()
                                num3Ref.current.clear()
                                setNum3('')
                            }
                        }}
                        autoFocus={false}
                        keyboardType="number-pad"
                    />
                    <OTPInput
                        ref={num5Ref}
                        value={num5} 
                        onChangeText={(num) => {
                            setNum5(num);
                            if(num) {
                                num6Ref.current.focus()
                            } 
                        }}
                        onKeyPress={({nativeEvent}) => {
                            if(nativeEvent.key === 'Backspace' && !num5) {
                                num4Ref.current.focus()
                                num4Ref.current.clear()
                                setNum4('')
                            }
                        }}
                        autoFocus={false}
                        keyboardType="number-pad"
                    />
                    <OTPInput
                        ref={num6Ref}
                        value={num6} 
                        onChangeText={(num) => {
                            setNum6(num);
                        }}
                        onKeyPress={({nativeEvent}) => {
                            if(nativeEvent.key === 'Backspace' && !num6) {
                                num5Ref.current.focus()
                                num5Ref.current.clear()
                                setNum5('')
                            }
                        }}
                        autoFocus={false}
                        keyboardType="number-pad"
                    />
            </View>

            <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                    sendPhoneCode();
                    console.log('resending code');
                }}>
                Resend
            </Text>

            {invalid ? 
                <Text
                    style={styles.invalidStyle}>
                    {invalidText}
                </Text> : 
                <></>
            }

            <View style={{width:'100%', flex: 1, alignItems: 'center', marginTop: Dimensions.get('window').height * 0.2}}>
                <CustomButton
                    text="Continue"
                    onPress={handleSignUp}
                    disabled={(num1 == '' || num2 == '' || num3 == '' || num4 == '' || num5 == '' || num6 == '')}
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
        width: '100%',
    },

    hyperlinkStyle: {
        color: 'green',
        alignSelf: 'flex-end',
        marginTop: '2%',
        marginRight: '5%',
    },

    invalidStyle: {
        position: 'absolute',
        color: 'red',
        right: Dimensions.get('window').width * 0.095,
        top: Dimensions.get('window').height * 0.33,
    },
})

export default RegisterScreen4