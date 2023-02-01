import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import { Context } from "../../../globalContext/globalContext.js"

const LoginHomeScreen = ({navigation}) => {

    const globalContext = useContext(Context)
    const { getToken } = globalContext

    // useEffect(() => {
    //     console.log("IN LOGIN HOME")
    //     const token = getToken("access")
    //     console.log(token)
    // })



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
                type='LOGIN'
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
        backgroundColor: 'white',
        paddingTop: 150,
    },

    container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        // flex: 1,
        padding: 20,
        paddingBottom: 50,
        // marginBottom: 30,
        backgroundColor: 'white',
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