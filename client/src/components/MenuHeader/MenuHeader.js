import { Easing, Animated, StyleSheet, ScrollView, Text, View, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MenuCategoryButton from '../MenuCategoryButton'


import BackButton from '../BackButton'

const MenuHeader = ({name, navigation, destination, MenuCategories, oneCategory, isHeader}) => {
    // const widthAnim = useRef(new Animated.Value(sliderWidth)).current;
    // const xAnim = useRef(new Animated.Value(sliderX)).current;

    // const handleScroll = (event) => {
    //     console.log(event.nativeEvent.contentOffset.x);
    // }

    // useEffect(() => {
    //     Animated.timing(widthAnim, {
    //       toValue: sliderWidth,
    //       duration: 100,
    //       useNativeDriver: true,
    //     }).start();
    //     console.log("width " + sliderWidth)
    //   }, [sliderWidth]);

    //   useEffect(() => {
    //     Animated.timing(xAnim, {
    //       toValue: sliderX,
    //       duration: 100,
    //       useNativeDriver: true,
    //     }).start();
    //     console.log("x " + sliderX)
    //   }, [sliderX]);

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', flex: 1}}>
                <View style={{flex: 1, alignSelf: 'center'}}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => destination ? navigation.navigate(destination) : navigation.goBack()}>
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

            {/* <Animated.View
                        style={{height: Dimensions.get('window').height * 0.007,
                        // width: widthAnim,
                        backgroundColor: 'black',
                        transform: [{ translateX: xAnim}, 
                            {scaleX: widthAnim.interpolate({
                                inputRange: [0, Dimensions.get('window').width],
                                outputRange: [0, 1]  
                        })}]
                    }}
                    /> */}

           
            

            
        </View>
    )
}

export default MenuHeader

const styles = StyleSheet.create({

    container: {

        width: '100%',
        height: Dimensions.get('window').height * 0.2,

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
        fontSize: Dimensions.get('window').width * 0.055,
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