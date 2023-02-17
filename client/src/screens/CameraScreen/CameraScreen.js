import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, {useEffect, useState, useContext}  from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import xicon from '../../../assets/icons/xicon.png'
import { Context } from '../../globalContext/globalContext'
import { set } from 'mongoose'

const CameraScreen = ({navigation}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [table, setTable] = useState(null)
    const [restaurant, setRestaurant] = useState(null)
    const [calledOnce, setCalledOnce] = useState(false)

    // let calledOnce = false

    const globalContext = useContext(Context)
    const { ws, setWs } = globalContext

    const connectWs = async () => {
        console.log(calledOnce)
        if (!calledOnce) {

            var wsTemp = new WebSocket('wss://dutch-pay-ws.herokuapp.com/');

            wsTemp.onopen = () => {
                console.log('opening ws in camera')
                setWs(wsTemp)
                // wsTemp.send(JSON.stringify({table_id: table.id, cart: [], flag: true}))
            };
            
            wsTemp.onclose = (e) => {
                console.log('Disconnected. Check internet or server.')
                console.log(e.message)
            };
            
            wsTemp.onerror = (e) => {
                console.log('error')
                console.log(e.message);
            };

            console.log('got here')

            setCalledOnce(true)
        }

        // wsTemp.onmessage = ({data}) => {
        //     console.log("receiving message in camera screen")
        //     console.log(data)
        // }
        
    }

    const getRestaurantsFromApi = async (id) => {
        return fetch('https://dutch-pay-test.herokuapp.com/restaurants/' + id)
          .then(response => response.json())
          .then(json => {
            setRestaurant(json)
          })
          .catch(error => {
            console.error(error);
          });
      };

      const getTableFromApi = async (id) => {
        return fetch('https://dutch-pay-test.herokuapp.com/tables/' + id)
          .then(response => response.json())
          .then(json => {
            setTable(json)
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

    useEffect(()=>{
        if(table && restaurant) {
            setScanned(true)
            const restaurant_id = restaurant["id"]
            const restaurant_name = restaurant["name"]
            const active_menu = restaurant["active_menu"]

            console.log("User sending intial message with table_id: " + table.id)

            if(ws) {
                console.log("navigating to menu")
                console.log(table.id)
                // if()
                if(active_menu) {
                    navigation.navigate('Menu', {subtotal: 0, restaurant_id : restaurant_id, active_menu: active_menu, name: restaurant_name, table_id: table.id})
                    console.log(active_menu)
                    ws.send(JSON.stringify({table_id: table.id, flag: true}))
                }

            } else {
                connectWs()
            }
        }

    }, [table, ws])


    const handleBarCodeScanned = (result) => {
        (async()=> {
            console.log(result.data)
            const id = JSON.stringify(result.data).replace(/['"]+/g, '')
            console.log("THIS IS THE ID")
            console.log(id + "whats up")
            await getTableFromApi(id)
            if(table) {
                await getRestaurantsFromApi(table["restaurant"])
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