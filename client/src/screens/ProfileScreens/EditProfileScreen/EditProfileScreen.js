import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useContext } from 'react'
import profileIcon from '../../../../assets/icons/profileicon.png'
import CustomInput from '../../../components/CustomInput'
import HeaderBar from '../../../components/HeaderBar'
import { Context } from '../../../globalContext/globalContext'

const EditProfileScreen = ({navigation}) => {
  const globalContext = useContext(Context)

  const { userObj } = globalContext

  const [firstName, setFirstName] = useState(userObj['first_name'])
  const [lastName, setLastName] = useState(userObj['last_name'])
  const [email, setEmail] = useState(userObj['email'])
  const [phoneNumber, setPhoneNumber] = useState(userObj['phone_number'])


  // const handleUpdateProfile = async () => {
  //   return fetch('https://dutch-pay-test.herokuapp.com/update-profile/', {
  //         method: 'PATCH',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           email: emailParam,
  //         }),
  //       })
  //       .then(console.log("success"))
  //       .then(res => console.log(res.json()))
  //       .catch(error => {
  //         console.error(error);
  //       });
  // }



  return (
    // <ScrollView style ={{height: '100%', flex:}}>
    <View style={{flex: 1}}>
      <HeaderBar name="Update Profile" navigation={navigation}/>
      
        <ScrollView style ={{height: '100%'}}>   
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={80}>
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
              </KeyboardAvoidingView>
            

        </ScrollView>
        
      </View>
 
  )
}

const styles = StyleSheet.create({
  // HEADER
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  

  // PROFILE IMAGE
  profileImageContainer: {
    flex: 2,
    marginTop: 20
  },
  profilePicture: {
    alignSelf: 'center',
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