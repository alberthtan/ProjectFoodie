import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import backIcon from '../../../../assets/icons/backicon.png';

const LoginScreen2 = ({navigation, route}) => {
    const [verificationCode, setVerificationCode] = useState('')
    const { phoneNumber } = route.params

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
                        Enter your 6 digit code
                    </Text>
                    <Text style = {styles.subtitle}>
                        Sent to {phoneNumber}
                    </Text>
                </View>
                
                <CustomInput 
                    value={verificationCode} 
                    setValue={setVerificationCode}
                    autoFocus={true}
                    keyboardType="number-pad"
                />
                <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                        console.log('resending code')
                    }}>
                    Resend
                </Text>
                <View style={{width:'100%', flex: 1, marginTop: '60%', alignItems: 'center'}}>
                    <CustomButton
                        text="Continue"
                        onPress={() => navigation.navigate('HomeTabs')}
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

export default LoginScreen2