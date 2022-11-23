import { View, StyleSheet, Text, Alert, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import backIcon from '../../../../assets/icons/backicon.png';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../../config';
import firebase from 'firebase/compat/app'
// import { firebase } from '../../../config'

// const firebase = require('firebase');
 

const RegisterScreen2 = ({navigation, route}) => {
    const { phoneNumber } = route.params;
    const [mobileNumber, setMobileNumber] = useState(phoneNumber)
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null)
    const recaptchaVerifier = useRef(null);


    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        console.log(mobileNumber)
        phoneProvider.verifyPhoneNumber(mobileNumber, recaptchaVerifier.current).then(() => {
            setVerificationId;
            console.log(verificationId)
        });
        // co?nsole.log(verificationId)
        setMobileNumber('');
    }

    const confirmCode = () => {
        
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

        firebase.auth().signInWithCredential(credential).then(() => {
            setCode('');
            navigation.navigate('Register3');
        }).catch((error) => {
            alert(error);
        })
        // Alert.alert('Login Successful');
    }

    // useEffect(() => {
    //     sendVerification();
    // })

    return (
        <View style= {styles.root}>
             <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                    <Image source={backIcon} resizeMode="contain" style={{
                        width: 30,
                        height: 30,
                        alignSelf:'center',
                        justifyContent: 'center',
                        flex: 1,
                        tintColor: '#000000',
                    }}/>
            </TouchableOpacity>

            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style = {styles.title}>
                        Enter your 6 digit
                    </Text>
                    <Text style = {styles.subtitle}>
                        Sent to {phoneNumber}
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
                        sendVerification();
                        console.log('resending code');
                    }}>
                    Resend
                </Text>
                <View style={{width:'100%', flex: 1, marginTop: '60%', alignItems: 'center'}}>
                    <CustomButton
                        text="Continue"
                        onPress={() => {
                            confirmCode()
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

export default RegisterScreen2