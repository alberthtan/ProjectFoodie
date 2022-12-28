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
    const [password, setPassword] = useState('')
    // const [verificationId, setVerificationId] = useState(null)
    // const recaptchaVerifier = useRef(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                 navigation.navigate('HomeTabs')
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log('Registered in with:', user.email)
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style= {styles.root}>
            {/* <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            /> */}
            
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
            <CustomInput 
                placeholder="Password"
                value={password} 
                setValue={setPassword}
                secureTextEntry
                keyboardType="default"
            />
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
        // alignItems: 'center',
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