import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

const SignInScreen = ({navigation}) => {
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
    <View style= {styles.root}>
      <Text style = {styles.logo}>DutchPay</Text>
      <CustomInput 
        placeholder="Username or Email"
        value={username} 
        setValue={setUsername}
      />
      <CustomInput 
        placeholder="Password" 
        value={password} 
        setValue={setPassword}
        secureTextEntry={true}
      />

      <CustomButton
        text="Login In"
        onPress={() => navigation.navigate('Home')}
      />

      <CustomButton
        text="Forgot Password?"
        onPress={onForgotPasswordPressed}
        type= "TERTIARY"
      />

      {/* <CustomButton
        text="Sign In with Facebook"
        onPress={onSignInFacebook}
      />

      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
      /> */}

    </View>
  )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        padding: 20,
        backgroundColor: '#F9FBFC',
    },

    logo: {
      fontSize: 30,
      color: '#3C6F37',
      marginBottom: 50,
      fontWeight: 'bold'
    }
})

export default SignInScreen