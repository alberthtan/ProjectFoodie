import React, {useState} from 'react'
import { View, Dimensions } from "react-native"
import Carousel from 'react-native-snap-carousel'
// import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CardItem.js'
import MenuItemsList from '../MenuItemsList'
// import data from './data'

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Dimensions.get('window').width

const MenuItemsCarousel = ({isCarousel, data, subtotal, name, navigation, table_id, restaurant_id, parentCallback}) => {
//   const isCarousel = React.useRef(null)
//   console.log('got here')
//   console.log(data)



  const createMenuItemsList = ({item}) => {
    return(
    <MenuItemsList
        navigation={navigation}
        menuItemsList = {item}
        subtotal = {subtotal}
        table_id = {table_id}
        restaurant_id = {restaurant_id}
        restaurant_name = {name}
        isOrdering = {true}
    />)
  }
  console.log('here')

  return (
    <View style={{alignItems: 'center', alignSelf: 'center'}}>
      <Carousel
        // layout="default"
        // layout="tinder"
        // layoutCardOffset={0}
        // onSnapToItem={(slideIndex) => parentCallback(slideIndex)}
        onScrollIndexChanged={(slideIndex) => parentCallback(slideIndex)}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        ref={isCarousel}
        data={data}
        renderItem={createMenuItemsList}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
        // decelerationRate={'fast'}
      />
    </View>
  )
}


export default MenuItemsCarousel