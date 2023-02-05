import React, {useState} from 'react'
import { View, Dimensions, FlatList } from "react-native"
import Carousel from 'react-native-snap-carousel'
import MenuItem from '../MenuItem/MenuItem'
// import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CardItem.js'
import MenuItemsList from './MenuItemsList'
// import data from './data'

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Dimensions.get('window').width

const MenuItemsCarousel = ({isCarousel, data, subtotal, name, navigation, table_id, restaurant_id, parentCallback}) => {

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
        restaurant_name = {name}
        isOrdering = {true}
    />
)

  const createMenuItemsList = ({item}) => {
    return(
      <FlatList
          showsVerticalScrollIndicator = {false}
          data = { item }
          renderItem = { oneDish }
      />)
  }

  return (
    <View style={{alignItems: 'center', alignSelf: 'center'}}>
      <Carousel

        onSnapToItem={(slideIndex) => {
          parentCallback(slideIndex)
          console.log("snapped")
        }}
        onScrollIndexChanged={(slideIndex) => {
          parentCallback(slideIndex)
          console.log("scrolled")
        }}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        ref={isCarousel}
        data={data}
        renderItem={createMenuItemsList}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
        useExperimentalSnap={true}
        // decelerationRate={'fast'}
      />
    </View>
  )
}


export default MenuItemsCarousel