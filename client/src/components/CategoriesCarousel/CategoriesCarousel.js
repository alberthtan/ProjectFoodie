import { SlideFromRightIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets'
import React, {useState} from 'react'
import { View, Dimensions } from "react-native"
import Carousel from 'react-native-snap-carousel'
// import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CardItem.js'
// import data from './data'
import MenuCategoryButton from '../MenuCategoryButton'

const CategoriesCarousel = ({data, currentCategory, setCurrentCategory, navigation}) => {
const SLIDER_WIDTH = Dimensions.get('window').width * 2
const ITEM_WIDTH = Dimensions.get('window').width * 0.27
  
    const isCarousel = React.useRef(null)
//   console.log('got here')
//   console.log(data)

  const createMenuCategoriesList = ({item}) => {
    // console.log('hello'),
    // console.log(item.item),

    return(
    <MenuCategoryButton
        navigation={navigation}
        name = {item.name}
        id = {item.id}
        setCurrentCategory = {setCurrentCategory}
        currentCategory = {currentCategory}
    />)
  }

  return (
    <View style={{alignContent: 'center', height: Dimensions.get('window').height * 0.1}}>
      <Carousel
        // layout="default"
        // layout="tinder"
        contentContainerCustomStyle={{alignSelf: 'center'}}
        activeSlideAlignment='start'
        layoutCardOffset={9}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        ref={isCarousel}
        data={data}
        renderItem={createMenuCategoriesList}
        sliderWidth={SLIDER_WIDTH}
        // sliderHeight={100}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
      />
    </View>
  )
}


export default CategoriesCarousel