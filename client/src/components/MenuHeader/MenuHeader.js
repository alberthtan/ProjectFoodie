import { Easing, Animated, StyleSheet, ScrollView, Text, View, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import MenuCategoryButton from '../MenuCategoryButton'
import { Context } from '../../globalContext/globalContext'


import BackButton from '../BackButton'

const MenuHeader = ({name, navigation, destination, MenuCategories, oneCategory, isHeader}) => {
    const globalContext = useContext(Context)

    const { ws, setCart } = globalContext

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', flex: 1}}>
                <View style={{flex: 1, alignSelf: 'center'}}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            if(destination == 'HomeTabs') {
                                console.log("closing websocket from frontend")
                                ws.close()
                                // ws.onclose(() => )
                            }
                            setCart([])
                            navigation.navigate(destination)
                        }}>
                        <BackButton/>
                    </TouchableOpacity>
                </View>
                
                <Text style = {styles.title}>
                    {name}
                </Text>
                <View style={{flex: 1}}></View>
            </View>
            
            <View style={{flex: 1}}>
                

                <FlatList
                    ref={isHeader}
                    horizontal= {true}
                    showsHorizontalScrollIndicator = {false}
                    data = { MenuCategories }
                    renderItem = { oneCategory }
                    // style={{backgroundColor: 'blue'}}
                />
            </View>



            
        </View>
    )
}

export default MenuHeader

const styles = StyleSheet.create({

    container: {

        width: '100%',
        height: Dimensions.get('window').height * 0.18,

        paddingTop: Dimensions.get('window').height * 0.06,
        // paddingBottom: 5,

        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',

        shadowColor: '#171717',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 10},

        backgroundColor: '#f6f5f5',

        
    },

    backButton: {
        marginLeft: 20,
        width: 50,
        height: 50,

        justifyContent: 'center',
        // alignContent: 'center',
        // alignSelf: 'center',
        // backgroundColor: 'blue'
    },

    title: {
        fontFamily: 'Roboto_700Bold',
        flex: 6,
        fontSize: Dimensions.get('window').width * 0.05,
        alignSelf: 'center',
        textAlign: 'center',
        // backgroundColor: 'red'
    },

    slider: {
        height: Dimensions.get('window').height * 0.007,
        width: 10,
        backgroundColor: 'black'
    }

})