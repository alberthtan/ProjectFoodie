import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'

import MenuCategoryButton from '../../components/MenuCategoryButton'
import MenuItem from '../../components/MenuItem'

import { firebase } from '../../firebase/config'
import { getFirestore, doc, getDoc } from '@firebase/firestore'
import { getSupportedCurrencies } from 'react-native-format-currency'
import HeaderBar from '../../components/HeaderBar'

const RestaurantScreen = ({navigation}) => {
    // const { name, description, subtotal } = route.params
    // const items = []
    const [MenuCategories, setMenuCategories] = useState([])
    const [MenuItems, setMenuItems] = useState([])
    const [currentCategory, setCurrentCategory] = useState('')
    // const [count, setCount] = useState(0)
    const db = firebase.firestore()

    const restaurant_id = "DVYuyJMBoh5FnoUfpWXr"
    
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
            cart = {[]}
            subtotal = {0}
            restaurant_id = {restaurant_id}
            isOrdering = {false}
        />
    )


  return (
    <View style = {{flex: 1}}>
        <HeaderBar name="Ippudo" navigation={navigation}/>

        <View style = {{flex: 1}}>
            <FlatList
                showsVerticalScrollIndicator = {false}
                data = { MenuItems }
                renderItem = { oneDish }
                ListHeaderComponent={ getCategories }
            />
        </View>
    </View>
  )
}

export default RestaurantScreen