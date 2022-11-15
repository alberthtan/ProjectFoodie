import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import backIcon from '../../../../assets/icons/backicon.png';

const RegisterScreen3 = ({navigation}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')

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
                        Create your profile
                    </Text>
                </View>
                
                <CustomInput 
                    placeholder="First name"
                    value={firstName} 
                    setValue={setFirstName}
                    autoFocus={true}
                />
                <CustomInput 
                    placeholder="Last name"
                    value={lastName} 
                    setValue={setLastName}
                />
                <CustomInput 
                    placeholder="Username"
                    value={username} 
                    setValue={setUsername}
                />
                <View style={{width:'100%', flex: 1, marginTop: '20%', alignItems: 'center'}}>
                    <CustomButton
                        text="Start"
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
      marginBottom: 20,
    },
})

export default RegisterScreen3