import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import backIcon from '../../../../assets/icons/backicon.png';

const LoginScreen1 = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('')

    return (
        <View style= {styles.root}>
            
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
                        Welcome back
                    </Text>
                    <Text style = {styles.subtitle}>
                        Enter your number for a one-time login code
                    </Text>
                </View>
                <CustomInput 
                    placeholder="(615) 975-4270"
                    value={phoneNumber} 
                    setValue={setPhoneNumber}
                    autoFocus={true}
                    keyboardType="phone-pad"
                />
                <View style={{width:'100%', flex: 1, marginTop: '65%', alignItems: 'center'}}>
                    <CustomButton
                        text="Continue"
                        onPress={() => navigation.navigate('Login2', {phoneNumber: phoneNumber}) }
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