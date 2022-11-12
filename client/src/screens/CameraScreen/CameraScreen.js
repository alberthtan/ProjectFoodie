import { View, Text, Dimensions, TouchableOpacity, StyleSheet} from 'react-native'
import React, {useEffect, useState}  from 'react'
// import tw from 'tailwind-react-native-classnames'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { YellowBox } from 'react-native-web';
// import QRCodeScanner from 'react-native-qrcode-scanner';

import { firebase } from '../../firebase/config'


const CameraScreen = ({navigation}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const db = firebase.firestore()

    useEffect(()=> {
        (async()=> {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [])

    const handleBarCodeScanned = (result) => {
        const id = JSON.stringify(result.data).replace(/['"]+/g, '')
        db.collection('Restaurants').get()
            .then(snap => {
                snap.forEach(doc => {
                    if(id == doc.id) {
                        console.log("Restaurant found!")
                        setScanned(true)
                        navigation.navigate('Menu', {cart: [], count: 0, subtotal: 0, restaurant_id : id})
                    }
                })
            })

        // console.log('Bar Code with Type ' + {result.type} + ' and data ' + {result.data} + ' has been scanned')
       
    }

    if(hasPermission === null || hasPermission === false)
    {
        return <Text>No access</Text>
    }

    return (
        <View style = {styles.container}>
            {/* <TouchableOpacity 
                style = {styles.button}
                onPress = {() => navigation.navigate('Menu')}
            >
            </TouchableOpacity> */}

            {/* <View style = {{position: 'absolute', borderColor: 'white', borderWidth: 2}}>

            </View> */}

            <BarCodeScanner
                // onBarCodeScanned={() => navigation.navigate('Menu', {cart: [], count: 0, subtotal: 0})}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style = {[StyleSheet.absoluteFillObject]}
            > 
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => navigation.goBack()}
                />

                <View style = {styles.viewInstruction}>
                    <Text style = {styles.instruction}>
                        Scan QR code to find menu
                    </Text>
                </View>
            </BarCodeScanner>


        </View>

    );
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
        flexDirection: 'row',
    },

    button: {
        width: 10,
        height: 10,

        padding: 15,
        marginVertical: 5,
        borderRadius: 50,
        backgroundColor: '#24891A',
        marginTop:50,
        marginLeft: 10
    },

    viewInstruction:{
        flex: 1,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.2,
        backgroundColor: 'white',
    },

    instruction: {
        bottom: 0,
        position: 'absolute',
        flex: 1,
        marginBottom: Dimensions.get('window').height * 0.1,
        fontWeight: 'bold',
    }
})

export default CameraScreen