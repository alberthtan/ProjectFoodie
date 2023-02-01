import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import LoginHeader from '../../../components/LoginHeader';

const LoginScreen1 = ({navigation}) => {
    const [email, setEmail] = useState('')

    const validateEmailFormat = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return (reg.test(email))
    }

    const sendEmailCode = () => {
        if(validateEmailFormat(email)) {
            return fetch('https://dutch-pay-test.herokuapp.com/send-email-code/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    is_register: false
                }),
                })
                .then(response => {
                    console.log(response.status)
                    if (response.status === 201) {
                        navigation.navigate('Login2', {emailParam: email.toLowerCase()})
                    } else if (response.status === 400){
                        console.log('invalid')
                    }
                })
                .catch(error => {
                    console.error(error);
                }
            );
        } else {
            console.log("Invalid email format")
        }
    }

    const handleLogin = () => {
        sendEmailCode()
    }

    return (
        <View style= {styles.root}>

            <LoginHeader 
                navigation={navigation}
                title = "Welcome back"
                subtitle = "Login with a code sent to your email."
            />

            <View style={{alignItems: 'center'}}>
                <CustomInput 
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    autoFocus={true}
                    keyboardType="email-address"
                    returnKeyType="go"
                    onSubmitEditing={() => handleLogin()}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    enablesReturnKeyAutomatically={true}
                />
                <View style={{width:'100%', alignItems: 'center', marginTop: Dimensions.get('window').height * 0.22}}>
                    <CustomButton
                        text="Continue"
                        onPress={handleLogin}
                        disabled={(email == '')}
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

export default LoginScreen1