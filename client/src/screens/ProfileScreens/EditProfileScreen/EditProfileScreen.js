import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native'
import React, { useState, useContext } from 'react'
import profileIcon from '../../../../assets/icons/profileicon.png'
import CustomInput from '../../../components/CustomInput'
import HeaderBar from '../../../components/HeaderBar'
import { Context } from '../../../globalContext/globalContext'
import BackButton from '../../../components/BackButton'

const EditProfileScreen = ({navigation}) => {
  const globalContext = useContext(Context)

  const { userObj, getToken, setUserObj } = globalContext

  const [firstName, setFirstName] = useState(userObj['first_name'])
  const [lastName, setLastName] = useState(userObj['last_name'])
  const [email, setEmail] = useState(userObj['email'])
  const [phoneNumber, setPhoneNumber] = useState(userObj['phone_number'])

  const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ('' + phoneNumberString.slice(2)).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
  };

  const [formattedPhoneNumber, setFormattedPhoneNumber]= useState(formatPhoneNumber(userObj['phone_number']))

  const handleChange = (value) => {
    setPhoneNumber(value)
    console.log(value)
    const formattedPhoneNumber = formatPhoneNumber(value);
    setFormattedPhoneNumber(formattedPhoneNumber);
  };


  const handleUpdateProfile = async () => {
    let token = await getToken('access')
    console.log(token)
    authorization = "Bearer".concat(" ", token)
    return fetch('https://dutch-pay-test.herokuapp.com/update-user/', {
          method: 'PATCH',
          headers: {
            Accept: '*/*',
            'Accept-Encoding': 'gzip,deflate,br',
            Connection: 'keep-alive',
            'Content-Type': 'application/json',
            Authorization: authorization
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
          }),
        })
        .then(res => res.json())
        .then(json => {
          console.log("setting user object")
          console.log(json)
          setUserObj(json)
        })
        .catch(error => {
          console.error(error);
        });
  }



  return (
    // <ScrollView style ={{height: '100%', flex:}}>
    <View style={{flex: 1}}>
      {/* <HeaderBar name="Update Profile" navigation={navigation}/> */}

      <View style={styles.container}>

      <View style={{flex: 1}}>
          <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <BackButton/>
          </TouchableOpacity>
      </View>

          
      <Text style = {[styles.title, {flex: 2}]}>
          Update Profile
      </Text>

      <View style={{flex: 1, justifyContent: 'center',}}>
          <TouchableOpacity
              style={{justifyContent: 'center', borderRadius: 10, width: '100%', height: '100%',}}
              onPress={() => {handleUpdateProfile(), navigation.goBack()}}>
                  <Text style={styles.closeText}>
                      Done
                  </Text>
          </TouchableOpacity>
      </View>
      </View>
      
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
                  
                  {/* <CustomInput
                      value={phoneNumber} 
                      setValue={setPhoneNumber}
                      keyboardType='phone-pad'/> */}

                  <View style={styles.input}>
                        {/* <Image source={usFlag} style={{position: 'absolute', left: 15, width: 20, height: 20, zIndex: 1}} /> */}
                        <TextInput
                            keyboardType="phone-pad"
                            // returnKeyType="go"
                            // autoFocus={true}
                            // onSubmitEditing={() => handleSignUp()}
                            onChangeText={handleChange}
                            value={formattedPhoneNumber}
                            style={{ marginLeft: 5, height: '100%', letterSpacing: 1, fontSize: 15}}
                            maxLength={10}
                            // style={{fontSize: 20, borderWidth: 1, borderColor: 'gray', padding: 10}}
                        />
                    </View>

                      
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
  },



  container: {
    flexDirection: 'row', 

    width: '100%',
    height: Dimensions.get('window').height * 0.12,

    paddingTop: Dimensions.get('window').height * 0.06,
    paddingBottom: 5,

    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',

    shadowColor: '#171717',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {width: 0, height:10},

    backgroundColor: '#f6f5f5',

    
},


title: {
    fontFamily: 'Roboto_700Bold',
    fontSize: Dimensions.get('window').width * 0.05,
    alignSelf: 'center',
    textAlign: 'center',
    // backgroundColor: 'red'
},


backButton: {
    marginLeft: 20,
    width: 50,
    height: 50,

    justifyContent: 'center',
},

closeText: {
    fontWeight: 'bold',
    color: '#3C6F37',
    fontSize: 16,
    textAlign: 'center',
},
input: {
  backgroundColor: '#EEEEEE', 
  width: '95%',
  height: Dimensions.get('window').height * 0.055,

  borderRadius: 10,
  borderColor: 'e8e8e8',

  paddingHorizontal: 10,
  marginVertical: 12,
  justifyContent: 'center'
  
},
})

export default EditProfileScreen