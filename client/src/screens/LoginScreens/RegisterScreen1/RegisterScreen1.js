import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import backIcon from '../../../../assets/icons/backicon.png';

const RegisterScreen1 = ({navigation}) => {
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

            <View style={styles.titleContainer}>
                <Text style = {styles.title}>
                    Enter your phone number
                </Text>
                <Text style = {styles.subtitle}>
                    You'll login with a code instead of a password
                </Text>
            </View>
            <CustomInput 
                placeholder="(615) 975-4270"
                value={phoneNumber} 
                setValue={setPhoneNumber}
                autoFocus={true}
                keyboardType="numeric"
            />
            <View style={{width:'100%', flex: 1, marginTop: '65%', alignItems: 'center'}}>
                <CustomButton
                    text="Continue"
                    onPress={() => navigation.navigate('Register2', {phoneNumber: phoneNumber}) }
                />
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
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