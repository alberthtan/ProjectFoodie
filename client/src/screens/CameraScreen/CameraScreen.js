import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, {useEffect, useState}  from 'react'
// import tw from 'tailwind-react-native-classnames'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { YellowBox } from 'react-native-web';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import xicon from '../../../assets/icons/xicon.png';

import { firebase } from '../../firebase/config'


const CameraScreen = ({navigation}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [tableList, setTableList] = useState([])
    const [restaurantList, setRestaurantList] = useState([])
    // const db = firebase.firestore()

    const getRestaurantsFromApi = () => {
        return fetch('https://dutch-pay-test.herokuapp.com/restaurants/?format=json')
          .then(response => response.json())
          .then(json => {
            setRestaurantList(json)
          })
          .catch(error => {
            console.error(error);
          });
      };

      const getTablesFromApi = () => {
        return fetch('https://dutch-pay-test.herokuapp.com/tables/?format=json')
          .then(response => response.json())
          .then(json => {
            setTableList(json)
          })
          .catch(error => {
            console.error(error);
          });
      };

    useEffect(()=> {
        if(!hasPermission) {
            (async()=> {
                const {status} = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            })();
        }  
    }, [])

    const handleBarCodeScanned = (result) => {
        (async()=> {
            await getTablesFromApi()
            await getRestaurantsFromApi()

            const id = JSON.stringify(result.data).replace(/['"]+/g, '')

            const filtered_tables = tableList.filter(table => table["id"] == id)

            if(filtered_tables.length != 0) {
                setScanned(true)
                const restaurant_id = filtered_tables[0]["restaurant"]
                var restaurant_name = "dummy"
                for(let i=0; i < restaurantList.length; i++) {
                    if(restaurantList[i]["id"] == restaurant_id) {
                        restaurant_name = restaurantList[i]["name"]
                    }
                }
                navigation.navigate('Menu', {cart: [], count: 0, subtotal: 0, id : restaurant_id, name: restaurant_name})
            } 
        })();

        
    }

    if(hasPermission === null || hasPermission === false)
    {
        return <Text>No access</Text>
    }

    return (
        <View style = {styles.container}>

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style = {[StyleSheet.absoluteFillObject]}
            > 
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                        <Image source={xicon} resizeMode="contain" style={{
                            width: 30,
                            height: 30,
                            alignSelf:'center',
                            justifyContent: 'center',
                            flex: 1,
                            tintColor: '#FFFFFF',
                        }}/>
                </TouchableOpacity>

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

    backButton: {
        height: 30,
        marginTop: Dimensions.get('window').height * 0.07,
        marginLeft: 10,
        alignSelf: 'flex-start'
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