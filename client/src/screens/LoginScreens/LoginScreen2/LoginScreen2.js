import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, TextInput} from 'react-native'
import React, { useState, useContext, useRef, useEffect} from 'react'
import { Context } from "../../../globalContext/globalContext.js"
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import backIcon from '../../../../assets/icons/backicon.png';
import BackButton from '../../../components/BackButton';
import LoginHeader from '../../../components/LoginHeader/LoginHeader.js'
import OTPInput from '../../../components/OTPInput/OTPInput.js'

const LoginScreen2 = ({navigation, route}) => {
    const globalContext = useContext(Context)

    const { emailParam } = route.params
    const subtitleString = "Sent to " + emailParam
    const { setIsLoggedIn, setUserObj, setToken } = globalContext

    const [code, setCode] = useState('')

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
    
    const sendEmailCode = () => {
        return fetch('https://dutch-pay-test.herokuapp.com/login-send-email-code/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailParam,
                    is_register: false
                }),
                })
                .then(response => {
                    console.log(response.status)
                    if (response.status === 201) {
                        console.log('sent')
                    } else if (response.status === 400){
                        console.log('invalid')
                    }
                })
                .catch(error => {
                    console.error(error);
                }
            );
    }

    const verifyEmailCode = async (code) => {
        return await fetch('https://dutch-pay-test.herokuapp.com/login-verify-email-code/', {
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
                console.log(json['code'])
                setInvalidText('Code does not match')
                setInvalid(true)
            } else if (json['username'] === emailParam + '_CUSTOMER'){
                setInvalid(false)
                setToken(json.token.refresh, json.token.access)
                console.log(json)
                setUserObj(json)
                setIsLoggedIn(true)
                navigation.navigate('HomeTabs')  
                
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleLogin = () => {
        // let code = num1 + num2 + num3 + num4 + num5 + num6
        if(code.length == 6) {
            verifyEmailCode(code)
        }
    }

    // useEffect(() => {
    //     handleLogin()
    // }, [num6])

    useEffect(() => {
        if(code.length == 6) {
            handleLogin()
        }
    }, [code])

    return (
        <View style= {styles.root}>
            
            <LoginHeader 
                navigation={navigation}
                title = "Enter your 6 digit code"
                subtitle = {subtitleString}
            />

            <View style={[ styles.input, {alignSelf: 'center'}]}>
                <TextInput
                    autoFocus={true}
                    style={{fontSize: 24, letterSpacing: (Dimensions.get('window').width * 0.95 - 40) * 0.103}}
                    value={code}
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    maxLength={6}
                />
            </View>
            
            {/* <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: Dimensions.get('window').height * 0.02}}>
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
                            // if(num && !(num1 == '' || num2 == '' || num3 == '' || num4 == '' || num5 == '')) {
                            //     handleSignUp()
                            // }
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
            </View> */}
            <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                    sendEmailCode();
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
            <View style={{width:'100%', alignItems: 'center', marginTop: Dimensions.get('window').height * 0.2}}>
                <CustomButton
                    text="Continue"
                    onPress={handleLogin}
                    // disabled={(num1 == '' || num2 == '' || num3 == '' || num4 == '' || num5 == '' || num6 == '')}
                    disabled={(code.length != 6)}
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

    input: {
        backgroundColor: '#EEEEEE', 
        width: '95%',
        height: Dimensions.get('window').height * 0.055,

        borderRadius: 10,
        borderColor: 'e8e8e8',

        paddingLeft: 35,
        marginVertical: 12,
        justifyContent: 'center'
        
    },
})

export default LoginScreen2