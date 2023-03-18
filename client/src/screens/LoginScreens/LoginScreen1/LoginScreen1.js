import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, TextInput} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import LoginHeader from '../../../components/LoginHeader';
import usFlag from '../../../../assets/icons/united-states.png'

const LoginScreen1 = ({navigation}) => {
    // const [email, setEmail] = useState('')
    // const [invalid, setInvalid] = useState(false)
    // const [invalidText, setInvalidText] = useState('')

    // const validateEmailFormat = (email) => {
    //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    //     return (reg.test(email))
    // }

    // const sendEmailCode = () => {
    //     if(validateEmailFormat(email)) {
    //         return fetch('https://dutch-pay-test.herokuapp.com/send-email-code/', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: email.toLowerCase(),
    //                 is_register: false
    //             }),
    //             })
    //             .then(response => {
    //                 console.log(response.status)
    //                 if (response.status === 201) {
    //                     setInvalid(false)
    //                     navigation.navigate('Login2', {emailParam: email.toLowerCase()})
    //                 } else if (response.status === 400){
    //                     console.log('Unable to send email code')
    //                     setInvalidText('Invalid email')
    //                     setInvalid(true)
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             }
    //         );
    //     } else {
    //         console.log("Invalid email format")
    //         setInvalidText('Invalid email format')
    //         setInvalid(true)
    //     }
    // }

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
            .then(navigation.navigate('Login2', {phoneParam: phoneNumber}))
            .catch(error => {
                console.error(error);
        });
        
      }

    const handleLogin = () => {
        // sendEmailCode()
        sendCode()
    }

    return (
        <View style= {styles.root}>

            <LoginHeader 
                navigation={navigation}
                title = "Welcome back"
                subtitle = "Login with your phone number."
            />

            <View style={{alignItems: 'center'}}>
                {/* <CustomInput 
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
                {invalid ? 
                    <Text
                        style={styles.invalidStyle}>
                        {invalidText}
                    </Text> : 
                    <></>
                } */}
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
                
                <View style={{width:'100%', alignItems: 'center', marginTop: Dimensions.get('window').height * 0.23}}>
                    <CustomButton
                        text="Continue"
                        onPress={handleLogin}
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
    invalidStyle: {
        position: 'absolute',
        color: 'red',
        right: Dimensions.get('window').width * 0.04,
        top: Dimensions.get('window').height * 0.09,
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

export default LoginScreen1