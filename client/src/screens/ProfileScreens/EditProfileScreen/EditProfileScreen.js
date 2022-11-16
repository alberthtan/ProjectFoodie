import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import profileIcon from '../../../../assets/icons/profileicon.png'
import backIcon from '../../../../assets/icons/backicon.png'
import CustomInput from '../../../components/CustomInput'

const EditProfileScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('Roger')
  const [lastName, setLastName] = useState('Federer')
  const [email, setEmail] = useState('thegoat@gmail.com')
  const [phoneNumber, setPhoneNumber] = useState('200-2020-2020')
  return (
    // <ScrollView style ={{height: '100%', flex:}}>
    <View style={{flex: 1}}>
        <ScrollView style ={{height: '100%'}}>
            <View style={styles.profileHeader}>
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
                <Text style = {styles.profileName}>
                    Personal
                </Text>
            </View>
            <View style={styles.profileImageContainer}>
                <TouchableOpacity
                    style={styles.profilePicture}
                    onPress={() => console.log("profile pic")}>
                        <Image source={profileIcon} resizeMode="contain" style={{
                            width: 100,
                            height: 100,
                            alignSelf:'center',
                            justifyContent: 'center',
                            flex: 1,
                            tintColor: '#000000',
                        }}/>
                </TouchableOpacity>

            </View>
            <View style={styles.profileBody}>
                <Text style={styles.text}>First Name</Text>
                <CustomInput
                    value={firstName} 
                    setValue={setFirstName}/>
                <Text style={styles.text}>Last Name</Text>
                <CustomInput
                    value={lastName} 
                    setValue={setLastName}/>
                <Text style={styles.text}>Email</Text>
                <CustomInput
                    value={email} 
                    setValue={setEmail}/>
                <Text style={styles.text}>Phone Number</Text>
                <CustomInput
                    value={phoneNumber} 
                    setValue={setPhoneNumber}
                    keyboardType='phone-pad'/>
            </View>
        </ScrollView>
      </View>
 
  )
}

const styles = StyleSheet.create({
  // HEADER
  profileHeader: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  backButton: {
    height: 30,
    marginTop: Dimensions.get('window').height * 0.07,
    marginLeft: 0,
    alignSelf: 'flex-start'
},

  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    // marginTop: 10
  },
  

  // PROFILE IMAGE
  profileImageContainer: {
    flex: 2,
  },
  profilePicture: {
    // height: '70%',
    // marginTop: Dimensions.get('window').height * 0.07,
    alignSelf: 'center',
    paddingBottom: 30
  },
  

  // BODY
  profileBody: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    alignItems: 'center'
  },

  text: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    opacity: 0.5
  }
})

export default EditProfileScreen