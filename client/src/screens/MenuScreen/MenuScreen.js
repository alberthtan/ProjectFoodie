import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'

import MenuCategoryButton from '../../components/MenuCategoryButton'
import MenuItem from '../../components/MenuItem'
import CustomButton from '../../components/CustomButton'
import HeaderBar from '../../components/HeaderBar'

import { firebase } from '../../firebase/config'
import { getFirestore, doc, getDoc } from '@firebase/firestore'
import { getSupportedCurrencies } from 'react-native-format-currency'

const MenuScreen = ({route, navigation}) => {
    const { cart, count, subtotal, restaurant_id } = route.params
    // const items = []
    const [MenuCategories, setMenuCategories] = useState([])
    const [MenuItems, setMenuItems] = useState([])
    const [currentCategory, setCurrentCategory] = useState('')
    // const [count, setCount] = useState(0)
    const db = firebase.firestore()
 
    useEffect(() => {

        db.collection('Restaurants').get()
                        .then(
                            snap => {
                            const categories = []
                            snap.forEach(
                                doc => {
                                    if(doc.id == restaurant_id) {
                                        db.collection('Menus').get()
                                        .then(snap => {
                                            snap.forEach(doc2 => {
                                                if(doc2.id == doc.data()['Menus'][0].id) {
                                                    // getDoc()
                                                    db.collection('Categories').get()
                                                    .then(snap => {
                                                        snap.forEach(doc3 => {
                                                            console.log("category: " + doc3.id)
                                                            categories.push(doc3.data())
                                                            console.log("categories: " + categories)
                                                        })
                                                        setMenuCategories(categories)
                                                        setCurrentCategory(categories[0]['title'])
                                                    })
                                                }
                                            })
                                        })
                                    }
                            })
                            console.log("cat")
                            console.log("Categories array: " + MenuCategories)
                        })
    }, [])

    useEffect(() => {

        db.collection('Items').get()
                        .then(snap => {
                            const items = []
                            snap.forEach(doc => {
                                if(doc.data()["category_name"] == currentCategory) {
                                    items.push(doc.data())
                                }
                            })
                            setMenuItems(items)
                        })
    }, [currentCategory])

    const oneCategory = ({item}) => (
        <MenuCategoryButton
            navigation = {navigation}
            name = {item.title}
            currentCategory = {currentCategory}
            setCurrentCategory = {setCurrentCategory}
        />
    )

    const getCategories = () => (
        <View style = {{height: 50, marginTop: 20}}>
            <FlatList
                horizontal= {true}
                showsHorizontalScrollIndicator = {false}
                data = { MenuCategories }
                renderItem = { oneCategory }
            />
        </View>
    )

    
    const oneDish = ({item}) => (
        <MenuItem
            navigation = {navigation}
            name = {item.name}
            price = {item.price}
            description = {item.short_description}
            count = {count}
            cart = {cart}
            subtotal = {subtotal}
            restaurant_id = {restaurant_id}
            isOrdering = {true}
        />
    )

    let button
    if (count > 0) {
        button = <View style = {{alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, height: Dimensions.get('window').height * 0.15, borderColor: '#D9D9D9'}}>
                    <CustomButton 
                        text={"VIEW ORDER (" + count + ")"}
                        style = {{bottom: 0, position: 'absolute'}}
                        onPress = {() => {navigation.navigate('Checkout', {cart: cart, count: count, subtotal: subtotal}), console.log(cart)}}/>
                </View>
    }

  return (
    <View style = {{flex: 1}}>
        <HeaderBar name='Restaurant Name' navigation={navigation} destination="HomeTabs"/>

        <View style = {{flex: 1}}>
                <FlatList
                    showsVerticalScrollIndicator = {false}
                    data = { MenuItems }
                    renderItem = { oneDish }
                    ListHeaderComponent={ getCategories }
                />
            
        {button}
        </View>
    </View>
  )
}

export default MenuScreen