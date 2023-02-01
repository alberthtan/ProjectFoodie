import React, {useState} from 'react'
import { View, Dimensions } from "react-native"
import Carousel from 'react-native-snap-carousel'
// import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CardItem.js'
import CarouselCardItem from './CarouselCardItem'
import RestaurantCard from '../RestaurantCard'
import data from './data'

const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = 250

const CarouselCards = () => {
  const isCarousel = React.useRef(null)
  const testRestaurants = [1, 2, 3, 4
]

  return (
    <View style={{alignItems: 'center'}}>
      <Carousel
        layout="default"
        layoutCardOffset={5}
        ref={isCarousel}
        data={testRestaurants}
        renderItem={RestaurantCard}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
      />
    </View>
  )
}


export default CarouselCards