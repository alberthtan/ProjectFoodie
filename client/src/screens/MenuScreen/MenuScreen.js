import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'

import MenuCategoryButton from '../../components/MenuCategoryButton'
import MenuItem from '../../components/MenuItem'
import CustomButton from '../../components/CustomButton'
import backIcon from '../../../assets/icons/backicon.png';

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
                                // console.log(doc.data())
                                // console.log(doc.id)
                            })
                            console.log("cat")
                            console.log("Categories array: " + MenuCategories)
                            // setMenuCategories(categories)
                            // setCurrentCategory(categories[0]['title'])
                            // console.log("called")
                        })
                        

        // db.collection('Categories').get()
        //                 .then(snap => {
        //                     const categories = []
        //                     snap.forEach(doc => {
        //                         // console.log(doc.data())
        //                         // console.log(doc.id)
        //                         categories.push(doc.data())
        //                     })
        //                     setMenuCategories(categories)
        //                     setCurrentCategory(categories[0]['title'])
        //                     // console.log("called")
        //                 })
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

        // db.collection('Restaurants').get('DVYuyJMBoh5FnoUfpWXr')
        //                 .then(snap => {
        //                     const restaurants = []
        //                     snap.forEach(doc => {
        //                         console.log("restaurant id: " + doc.id)
        //                         const category_id = doc.data()['Menus'][0].id
        //                         console.log("Menu ID: " + doc.data()['Menus'][0].id)
                                
        //                         db.collection('Menus').get(doc.data()['Menus'][0].id)
        //                         .then(snap => {
        //                             snap.forEach(doc2 => 
        //                                 console.log('Menu Name: ' + doc2.data()['name'])
        //                             )
        //                         })
        //                         console.log("restauarant data: " + doc.data())

        //                     })
        //                 })
                    
    }, [currentCategory])

    const oneCategory = ({item}) => (
        <MenuCategoryButton
            navigation = {navigation}
            name = {item.title}
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
            subtotal = {subtotal}
            restaurant_id = {restaurant_id}
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
        <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Home')}>
                        <Image source={backIcon} resizeMode="contain" style={{
                            width: 30,
                            height: 30,
                            alignSelf:'center',
                            justifyContent: 'center',
                            flex: 1,
                            // marginBottom: 8,
                            tintColor: '#000000',
                        }}/>
        </TouchableOpacity>

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
            <View style = {{height: 50}}>
                <FlatList
                    horizontal= {true}
                    showsHorizontalScrollIndicator = {false}
                    data = { MenuCategories }
                    renderItem = { oneCategory }
                />
            </View>
            <FlatList
                showsVerticalScrollIndicator = {false}
                data = { MenuItems }
                renderItem = { oneDish }
            />
        {button}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    backButton: {
        height: 30,
        marginTop: Dimensions.get('window').height * 0.07,
        marginLeft: 10,
        alignSelf: 'flex-start'
    },

    restaurantName: {
        fontSize: 30,
        fontWeight:"bold",
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 20,
        // textAlign: 'center'
    },

    rectangle: {
        // width: 200,
        // height: 30,
        backgroundColor: '#D9D9D9',
        alignSelf: "flex-start",
        marginLeft: 140,
        marginTop: 50,
        padding: 10,
        marginVertical: 30
      },
})

export default MenuScreen