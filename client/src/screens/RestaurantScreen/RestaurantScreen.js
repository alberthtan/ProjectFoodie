import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'

import MenuCategoryButton from '../../components/MenuCategoryButton'
import MenuItem from '../../components/MenuItem'

import { firebase } from '../../firebase/config'
import { getFirestore, doc, getDoc } from '@firebase/firestore'
import { getSupportedCurrencies } from 'react-native-format-currency'
import HeaderBar from '../../components/HeaderBar'

const RestaurantScreen = ({navigation, route}) => {
    const { id, name } = route.params
    const [Menus, setMenus] = useState([])
    const [MenuCategories, setMenuCategories] = useState([])
    const [MenuItems, setMenuItems] = useState([])
    const [currentCategory, setCurrentCategory] = useState('')
    const db = firebase.firestore()

    // const restaurant_id = "DVYuyJMBoh5FnoUfpWXr"

    const getMenusFromApi = (id) => {
        return fetch('https://dutch-pay-test.herokuapp.com/menus/?format=json')
          .then(response => response.json())
          .then(json => {
            const result = json.filter(menu => menu["restaurant"] == id)
            setMenus(result)

            getCategoriesFromApi(result[0].id)
          })
          .catch(error => {
            console.error(error);
          });
      };

    const getCategoriesFromApi = (id) => {
        return fetch('https://dutch-pay-test.herokuapp.com/categories/?format=json')
          .then(response => response.json())
          .then(json => {
            const result = json.filter(category => category["menu"] == id)
            setCurrentCategory(result[0].id)
            setMenuCategories(result)
          })
          .catch(error => {
            console.error(error);
          });
      };

      const getMenuItemsFromApi = () => {
        return fetch('https://dutch-pay-test.herokuapp.com/menu-items/?format=json')
          .then(response => response.json())
          .then(json => {
            const result = json.filter(item => item["category"] == currentCategory)
            setMenuItems(result)
          })
          .catch(error => {
            console.error(error);
          });
      };
    
    useEffect(() => {

        getMenusFromApi(id)

        setCurrentCategory(MenuCategories[0])

    }, [])

    useEffect(() => {

        getMenuItemsFromApi()
                    
    }, [currentCategory])

    const oneCategory = ({item}) => (
        <MenuCategoryButton
            navigation = {navigation}
            name = {item.name}
            id = {item.id}
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
            description = {item.description}
            cart = {[]}
            subtotal = {0}
            restaurant_id = {id}
            isOrdering = {false}
        />
    )


  return (
    <View style = {{flex: 1}}>
        <HeaderBar name={name} navigation={navigation}/>

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