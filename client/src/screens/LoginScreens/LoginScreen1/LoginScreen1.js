import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import BackButton from '../../../components/BackButton';

const LoginScreen1 = ({navigation}) => {
    const [email, setEmail] = useState('')

    // const isValidEmail = () => {
    //     return fetch('https://dutch-pay-test.herokuapp.com/users/')
    //     .then(response => response.json())
    //     .then(json => {
    //         console.log(json)
    //         // const users = json.filter(user => user["email"] === email)
    //         // console.log(users)
    //         // if(users.length != 0) {
    //         //     sendEmailCode()
    //         // } else {
    //         //     console.log("No existing user with username " + email)
    //         // }
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
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
            .then(response => {
                console.log(response.status)
                if (response.status == 201) {
                    navigation.navigate('Login2', {emailParam: email})
                } else if (response.status == 404){
                    console.log('invalid')
                }
            })
            .catch(error => {
                console.error(error);
        });
      }

    const handleLogin = () => {
        sendEmailCode()
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
                        Login with a code sent to your email
                    </Text>
                </View>
                <CustomInput 
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    autoFocus={true}
                    keyboardType="email-address"
                    returnKeyType="next"/>
                {/* <CustomInput
                    placeholder="Password"
                    value={password} 
                    secureTextEntry
                    setValue={setPassword}
                    keyboardType="default"
                    returnKeyType="go"/> */}
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