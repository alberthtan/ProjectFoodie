import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import BackButton from '../../../components/BackButton';

const RegisterScreen3 = ({navigation, route}) => {
    const { emailParam, firstName, lastName } = route.params;
    const [phoneNumber, setPhoneNumber] = useState('')

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
            .then(navigation.navigate('Register4', {phoneParam: phoneNumber, emailParam: emailParam, firstName: firstName, lastName: lastName}))
            .catch(error => {
                console.error(error);
        });
        
      }

      const handleSignUp = () => {
        // sendCode()
        navigation.navigate('Register4', {phoneParam: phoneNumber, emailParam: emailParam, firstName: firstName, lastName: lastName})
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
                        Enter your phone number
                    </Text>
                    <Text style = {styles.subtitle}>
                        You'll login with a code instead of a password
                    </Text>
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 16}}>+1</Text>
                    </View>
                    <View style={{flex: 12}}>
                        <CustomInput 
                            placeholder="Phone Number"
                            value={phoneNumber} 
                            setValue={setPhoneNumber}
                            autoFocus={true}
                            keyboardType="number-pad"
                        />
                    </View>
                    
                </View>

                <View style={{width:'100%', flex: 1, marginTop: '50%', alignItems: 'center'}}>
                    <CustomButton
                        text="Continue"
                        onPress={handleSignUp}
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
        marginBottom: 10,
        marginTop: 10
    },
})

export default RegisterScreen3