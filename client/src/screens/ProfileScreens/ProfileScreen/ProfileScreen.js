import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Touchable } from 'react-native'
import React from 'react'
import profileIcon from '../../../../assets/icons/profileicon.png'
import frontArrowIcon from '../../../../assets/icons/frontarrow.png'

const ProfileScreen = () => {
  return (
    <>
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
          <TouchableOpacity>
              <View style={styles.bodyContainer}>
                <Text style={styles.buttonText}>
                  Personal
                </Text>
                <Image source={frontArrowIcon} resizeMode="contain" style={styles.frontArrow}/>
              </View>
          </TouchableOpacity>
          <TouchableOpacity>
              <View style={styles.bodyContainer}>
                <Text style={styles.buttonText}>
                  Past Orders
                </Text>
                <Image source={frontArrowIcon} resizeMode="contain" style={styles.frontArrow}/>
              </View>
          </TouchableOpacity>
          <TouchableOpacity>
              <View style={styles.bodyContainer}>
                <Text style={styles.buttonText}>
                  Payment Methods
                </Text>
                <Image source={frontArrowIcon} resizeMode="contain" style={styles.frontArrow}/>
                
              </View>
          </TouchableOpacity>
      </View>
      <View style={styles.profileFooter}>
          <TouchableOpacity>
            <Text style={styles.signOut}>Sign Out</Text>
          </TouchableOpacity>
      </View>
    </>
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
  
  profilePicture: {
    height: '70%',
    marginTop: Dimensions.get('window').height * 0.07,
    alignSelf: 'center'
  },
  
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10
  },
  
  // BODY
  profileBody: {
    width: '100%',
    flex: 2,
    padding: 20
  },

  bodyContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%'
  },
  
  frontArrow: {
    width: 20,
    height: 20,
    alignSelf:'center',
    justifyContent: 'flex-end',
    tintColor: '#000000',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '95%'
  },
  
  // FOOTER
  profileFooter: {
    width: '100%',
    flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signOut: {
    color: '#327CEC',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default ProfileScreen