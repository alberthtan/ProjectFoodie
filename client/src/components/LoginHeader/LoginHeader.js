import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import BackButton from '../BackButton'
import React from 'react'

const LoginHeader = ({navigation, title, subtitle}) => {
  return (
    <>
        <View style={styles.titleContainer}>

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
    titleContainer: {
        flexDirection: 'row', 
        alignContent: 'center', 
        marginTop: Dimensions.get('window').height * 0.07
    },

    backButton: {
        width: 28,
        height: 34,
        justifyContent: 'center'
    },

    title: {
      fontSize: Dimensions.get('window').width * 0.067,
      color: '#3C6F37',
      fontWeight: 'bold',
      alignSelf: 'center',
    },

    subtitle: {
        fontSize: 15,
        color: 'black',
        marginTop: 16,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
})