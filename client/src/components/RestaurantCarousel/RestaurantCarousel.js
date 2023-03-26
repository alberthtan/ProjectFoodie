import React, {useState} from 'react'
import { View, Dimensions } from "react-native"
import Carousel from 'react-native-snap-carousel'
// import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CardItem.js'
import RestaurantCard from '../RestaurantCard'
// import data from './data'

// const SLIDER_WIDTH = Dimensions.get('window').width + 80
// const ITEM_WIDTH = 250
const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = SLIDER_WIDTH * 0.6

const CarouselCards = ({data}) => {
  const isCarousel = React.useRef(null)

  return (
    <View style={{alignItems: 'center', alignSelf: 'center'}}>
      <Carousel
        layout="default"
        layoutCardOffset={5}
        ref={isCarousel}
        data={data}
        renderItem={RestaurantCard}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
      />
    </View>
  )
}


export default CarouselCards