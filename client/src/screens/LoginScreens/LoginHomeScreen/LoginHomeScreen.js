import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'

const LoginHomeScreen = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onLoginInPressed = () => {
        console.warn("Sign in")
    }

    const onForgotPasswordPressed = () => {
      console.warn("onForgotPasswordPressed")
    }

    const onSignInFacebook = () => {
      console.warn("facebook")
    }

    const onSignInGoogle = () => {
      console.warn("google")
    }

  return (
    <>
        <View style={styles.titleContainer}>
            <Text style = {styles.logo}>
                DutchPay
            </Text>
        </View>
        <View style={styles.container}>
            <CustomButton
                text="Register"
                onPress={() => navigation.navigate('Register1')}
            />

            <CustomButton
                text="Login"
                onPress={() => navigation.navigate('Login1')}
            />
            
            <Text style={styles.textStyle} numberOfLines={2}>
                By continuing, you agree to our{'\n'}
                <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                        console.log("opening terms of use")
                    }}>
                    terms of use
                </Text>
                {' '}and{' '}
                <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                        console.log("opening privacy policy")
                    }}>
                    privacy policy
                </Text>
            </Text>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#F9FBFC',
        paddingTop: 150,
    },

    container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        // flex: 1,
        padding: 20,
        paddingBottom: 50,
        // marginBottom: 30,
        backgroundColor: '#F9FBFC',
    },

    logo: {
      fontSize: 40,
      color: '#3C6F37',
      fontWeight: 'bold'
    },

    textStyle: {
        margin: 10,
        opacity: 0.5,
        width: '80%',
        textAlign: 'center',
    },

    hyperlinkStyle: {
        color: 'green',
    },
})

export default LoginHomeScreen