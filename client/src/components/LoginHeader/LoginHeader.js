import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import BackButton from '../BackButton'
import React from 'react'

const LoginHeader = ({navigation, title, subtitle}) => {
  return (
    <>
        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: Dimensions.get('window').height * 0.07}}>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <BackButton/>
            </TouchableOpacity>

            <Text style = {styles.title}>
                {title}
            </Text>

        </View>

        <Text style = {styles.subtitle}>
            {subtitle}
        </Text>
    </>
  )
}

export default LoginHeader

const styles = StyleSheet.create({
    backButton: {
        // backgroundColor: 'blue',
        width: 28,
        height: 34,
        // alignSelf: 'center'
        justifyContent: 'center'
    },

    title: {
        // backgroundColor: 'red',
      fontSize: 28,
      color: '#3C6F37',
      fontWeight: 'bold',
      paddingLeft: 10,
    //   alignSelf: 'center',
    //   justifyContent: 'center'
    },

    subtitle: {
        fontSize: 15,
        color: 'black',
        marginTop: 16,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
})