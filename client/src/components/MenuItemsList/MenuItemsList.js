import { StyleSheet, Text, View, Image, Dimensions, Linking, Platform, FlatList } from 'react-native'
import React, {useState} from 'react'
import MenuItem from '../MenuItem/MenuItem'

const MenuItemsList = ({navigation, menuItemsList, subtotal, table_id, restaurant_id, restaurant_name, isOrdering}) => {

    //item is category
    //make fetch call to get menu items

    const oneDish = ({item}) => (
        <MenuItem
            navigation = {navigation}
            item = {item}
            name = {item.name}
            price = {item.price}
            description = {item.description}
            subtotal = {subtotal}
            table_id = {table_id}
            restaurant_id = {restaurant_id}
            restaurant_name = {restaurant_name}
            isOrdering = {true}
        />
    )

  return (
    <FlatList
        showsVerticalScrollIndicator = {false}
        data = { menuItemsList }
        renderItem = { oneDish }
    />
  )
}  

export default MenuItemsList

const styles = StyleSheet.create({
})