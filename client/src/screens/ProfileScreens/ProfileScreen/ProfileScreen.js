import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, {useContext, useState} from 'react'
import profileIcon from '../../../../assets/icons/profileicon.png'
import ProfileButton from '../../../components/ProfileButton'
import profileIcon2 from '../../../../assets/icons/profile.png'
import pastorders from '../../../../assets/icons/pastorders.png'
import payment from '../../../../assets/icons/payment.png'
import { Context } from '../../../globalContext/globalContext'
// import LoginHomeScreen from '../../LoginScreens/LoginHomeScreen'
// import {Avatar} from '../../../components/Avatar';
import * as ImagePicker from 'expo-image-picker'
import base64 from 'react-native-base64'
import { Alert } from 'react-native';


const ProfileScreen = ({navigation}) => {
  const globalContext = useContext(Context)
  const { userObj, setIsLoggedIn, deleteToken, getToken, setUserObj } = globalContext


  // console.log(userObj)
  const [image, setImage] = useState(userObj['profile_picture'])

  const handleUpdateProfilePicture = async (image) => {
    let token = await getToken('access')
    console.log("IMAGEEEE")
    console.log(console.log(image.type))
    console.log(typeof(image.uri))
    let formdata = new FormData();
    formdata.append("profile_picture", {
      uri: image.uri,
      name: userObj.username,
      type: image.type
  })

  console.log(image.uri)

    authorization = "Bearer".concat(" ", token)
    return fetch('https://dutch-pay-test.herokuapp.com/update-user/', {
          method: 'PATCH',
          headers: {
            Accept: '*/*',
            'Accept-Encoding': 'gzip,deflate,br',
            Connection: 'keep-alive',
            'Content-Type': 'multipart/form-data',
            Authorization: authorization
          },
          body: formdata,
        })
        .then(res => res.json())
        .then(json => {
          console.log('hello')
          console.log(json)
        })
        .catch(error => {
          console.error(error);
        });
  }

  const pickImage = async () => {


    // const permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync()

    //   if (permissionResult.granted === false) {
    //       alert("You've refused to allow this appp to access your photos!");
    //       return;
    //   } 

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      forceJpg: true,
      includeBase64: true,
    })
    // console.log("RESULTS\n")
    // console.log(result)
    // console.log(result.data)
  
    if(!result.canceled) {
      // console.log('here')
      // console.log(result.assets[0].uri)
      setImage(result.assets[0].uri)
      // console.log(result.assets[0].uri)
      let newUserObj = userObj
      newUserObj.profile_picture = result.assets[0].uri
      setUserObj(newUserObj)

      // const response = await fetch(result.uri);
      // const blob = await response.blob();
      // console.log("BLOB")
      // console.log(blob)
      // console.log("BLOB END")
      handleUpdateProfilePicture({uri: result.assets[0].uri, type: 'image/jpg'})
    }
  }

  // console.log(userObj)
  // console.log(getToken('refresh'))

  // const onAvatarChange = (image) => {
  //   console.log(image);
  //   // upload image to server here 
  // };

  const handleSignOut = async () => {
      await deleteToken("access")
      await deleteToken("refresh")
      setIsLoggedIn(false)
  }

  const handleDeleteAccount = async () => {
    let token = await getToken('access')
    const authorization = "Bearer".concat(" ", token)
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? All your data will be erased.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete Account",
          onPress: () => {
            return fetch('https://dutch-pay-test.herokuapp.com/delete-user/', {
              method: 'DELETE',
              headers: {
                Accept: '*/*',
                'Accept-Encoding': 'gzip,deflate,br',
                Connection: 'keep-alive',
                'Content-Type': 'multipart/form-data',
                Authorization: authorization
              },
            })
              .then(res => res.json())
              .then(async (json) => {
                console.log(json)
                await deleteToken("access")
                await deleteToken("refresh")
                setIsLoggedIn(false)
              })
              .catch(error => {
                console.error(error);
              });
          }
        }
      ],
      { cancelable: false }
    );
  };
  

  return (
    <>
      <View style={styles.profileHeader}>
          <TouchableOpacity
              style={styles.profilePicture}
              onPress={pickImage}>
                {image != null ? 
                  <Image source={{uri: image}} resizeMode="contain" style={{
                      width: '100%',
                      height:'100%',
                      // flexWrap: 'wrap',
                      borderRadius: 50,
                      alignSelf:'center',
                      justifyContent: 'center',
                      flex: 1,
                  }}/> 
                  :
                  <Image source={profileIcon} resizeMode="contain" style={{
                    width: 100,
                    height: 100,
                    alignSelf:'center',
                    justifyContent: 'center',
                    flex: 1,
                    tintColor: '#000000',
                }}/> }
          </TouchableOpacity>
          <Text style = {styles.profileName}>
                {userObj["first_name"] + ' ' + userObj["last_name"]}
          </Text>
        </View>
      <ScrollView style ={{height: '100%', flex: 1}} showsVerticalScrollIndicator = {true}>
        <View style={styles.profileBody}>
          <ProfileButton name="Update Profile" onPress={() => navigation.navigate('EditProfile')} imageSource={profileIcon2}/>
          {/* <ProfileButton name="Past Orders" onPress={() => navigation.navigate('PastOrders')} imageSource={pastorders}/> */}
          <ProfileButton name="Payment" onPress={() => navigation.navigate('Payments')} imageSource={payment}/>
        </View>
        <View style={styles.profileFooter}>
          <TouchableOpacity
              onPress={handleSignOut}>
            <Text style={styles.signOut}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={handleDeleteAccount}>
            <Text style={styles.deleteAccount}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </>
 
  )
}

const styles = StyleSheet.create({
  // HEADER
  profileHeader: {
    width: '100%',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#B2B2B2',
    marginTop: Dimensions.get('window').height * 0.07,
    alignSelf: 'center'
  },
  
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: Dimensions.get('window').height * 0.03,
    marginBottom: 30
    // marginVertical: 10
  },
  
  // BODY
  profileBody: {
    width: '100%',
    flex: 4,
    padding: 20
  },

  bodyContainer: {
    flexDirection: 'row',
    // paddingTop: 20,
    // paddingBottom: 20,
    width: '100%'
  },
  
  frontArrow: {
    width: 20,
    height: 20,
    alignSelf:'center',
    justifyContent: 'flex-end',
    tintColor: '#000000',
  },

  // buttonText: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   width: '95%'
  // },
  
  // FOOTER
  profileFooter: {
    width: '100%',
    height: '70%',
    // flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signOut: {
    color: '#327CEC',
    fontSize: 17,
    fontWeight: 'bold',
  },
  deleteAccount: {
    color: 'red',
    fontSize: 17,
    fontWeight: 'bold',
  }
})

export default ProfileScreen