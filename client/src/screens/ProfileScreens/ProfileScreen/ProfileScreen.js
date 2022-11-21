import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import profileIcon from '../../../../assets/icons/profileicon.png'
import ProfileButton from '../../../components/ProfileButton'
import profileIcon2 from '../../../../assets/icons/profile.png'
import pastorders from '../../../../assets/icons/pastorders.png'
import payment from '../../../../assets/icons/payment.png'

const ProfileScreen = ({navigation}) => {
  return (
    <>
      <ScrollView style ={{height: '100%'}}>
        <View style={styles.profileHeader}>
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
          <Text style = {styles.profileName}>
                Profile Name
          </Text>
        </View>
        <View style={styles.profileBody}>
          <ProfileButton name="Update Profile" onPress={() => navigation.navigate('EditProfile')} imageSource={profileIcon2}/>
          <ProfileButton name="Past Orders" onPress={() => navigation.navigate('PastOrders')} imageSource={pastorders}/>
          <ProfileButton name="Payment Methods" onPress={() => navigation.navigate('Payments')} imageSource={payment}/>
        </View>
        <View style={styles.profileFooter}>
          <TouchableOpacity
              onPress={() => navigation.navigate("LoginHome")}>
            <Text style={styles.signOut}>Sign Out</Text>
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  
  profilePicture: {
    height: '70%',
    marginTop: Dimensions.get('window').height * 0.07,
    alignSelf: 'center'
  },
  
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
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
  }
})

export default ProfileScreen