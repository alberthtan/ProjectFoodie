import { View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'

import MenuCategoryButton from '../../components/MenuCategoryButton'
import MenuItem from '../../components/MenuItem'
import sanityClient from '../../../sanity/sanity'
import CustomButton from '../../components/CustomButton'

const MenuScreen = ({route, navigation}) => {
    const { cart, count } = route.params
    
    const [MenuCategories, setMenuCategories] = useState([])
    const [MenuItems, setMenuItems] = useState([])
    const [currentCategory, setCurrentCategory] = useState('')
    // const [count, setCount] = useState(0)

    useEffect(()=> {
        sanityClient.fetch(`*[_type == "category"] {
            ...,
          }`).then(data => {
            setMenuCategories(data)
          })
    }, [])


    useEffect(()=> {
        sanityClient.fetch(`*[_type == "dish"] {
            ...,
          }`).then(data => {
            setMenuItems(data)
          })
    }, [])

    useEffect(()=> {
        sanityClient.fetch(`*[_type == "category"] {
            ...,
          }[0]._id`).then(data => {
            setCurrentCategory(data)
          })
    }, [])

    const oneCategory = ({item}) => (
        <MenuCategoryButton
            navigation = {navigation}
            name = {item.title}
            color_id = {item._id}
            currentCategory = {currentCategory}
            setCurrentCategory = {setCurrentCategory}
        />
    )

    const oneDish = ({item}) => (
        <MenuItem
            navigation = {navigation}
            name = {item.name}
            price = {item.price}
            description = {item.short_description}
            count = {count}
            cart = {cart}
        />
    )

    let button
    if (count > 0) {
        button = <View style = {{alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, height: Dimensions.get('window').height * 0.15, borderColor: '#D9D9D9'}}>
                    <CustomButton 
                        text={"VIEW ORDER (" + count + ")"}
                        style = {{bottom: 0, position: 'absolute'}}
                        onPress = {() => {navigation.navigate('Checkout', {cart: cart, count: count}), console.log(cart)}}/>
                </View>
    }

  return (
    <View style = {{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                style = {styles.container}
                onPress = {() => navigation.navigate('Home')} />

            <View style = {styles.rectangle}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {{fontWeight:'bold', fontSize: 16, marginLeft: 5}}>Table Number: 123456</Text>
                </View>
            </View>
        </View>

        <Text style = {styles.restaurantName}>
            Restaurant Name
        </Text>

        {/* {MenuCategories?.map(category => (
            <MenuCategoryButton
                navigation = {navigation}
                key = {category.id}
                name = {category.title}
                color_id = {category.id}
            />
        ))} */}

        <View style = {{flex: 1}}>
            <FlatList
                horizontal= {true}
                showsHorizontalScrollIndicator = {false}
                data = { MenuCategories }
                renderItem = { oneCategory }
                style={{marginTop: 20}}
            />
            <FlatList
                showsVerticalScrollIndicator = {false}
                data = { MenuItems }
                renderItem = { oneDish }
                style = {{height: Dimensions.get('window').height}}
            />
        {button}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 10,
        height: 10,

        padding: 15,
        marginVertical: 5,
        borderRadius: 50,
        backgroundColor: '#24891A',
        marginLeft: 10,
        marginTop: 50
    },

    restaurantName: {
        fontSize: 30,
        fontWeight:"bold",
        marginLeft: 10
    },

    rectangle: {
        width: 200,
        height: 30,
        backgroundColor: '#D9D9D9',
        marginLeft: 140,
        marginTop: 50,
        marginVertical: 30
      },
})

export default MenuScreen