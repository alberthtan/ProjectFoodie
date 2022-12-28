import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import BackButton from '../../../components/BackButton';

import { auth } from '../../../config'

const LoginScreen1 = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                 navigation.navigate('HomeTabs')
            }
        })

        return unsubscribe
    }, [])

    const handleLogin = () => {
         auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log('Logged in with:', user.email)
            })
            .catch(error => alert(error.message))
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
                        Welcome back
                    </Text>
                    <Text style = {styles.subtitle}>
                        Login with your email
                    </Text>
                </View>
                <CustomInput 
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    autoFocus={true}
                    keyboardType="email-address"
                />
                <CustomInput 
                    placeholder="Password"
                    value={password} 
                    secureTextEntry
                    setValue={setPassword}
                    keyboardType="default"
                />
                <View style={{width:'100%', flex: 1, marginTop: '45%', alignItems: 'center'}}>
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
      marginTop: 10
    },

    subtitle: {
        fontSize: 15,
        color: 'black',
        marginTop: 10,
        marginBottom: 10
    },
})

export default LoginScreen1