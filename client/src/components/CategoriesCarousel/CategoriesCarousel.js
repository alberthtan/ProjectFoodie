import { SlideFromRightIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets'
import React, {useState} from 'react'
import { View, Dimensions } from "react-native"
import Carousel from 'react-native-snap-carousel'
import MenuCategoryButton from '../MenuCategoryButton'

const CategoriesCarousel = ({data, currentCategory, setCurrentCategory, navigation}) => {
const SLIDER_WIDTH = Dimensions.get('window').width * 2
const ITEM_WIDTH = Dimensions.get('window').width * 0.27
  
const isCarousel = React.useRef(null)

const createMenuCategoriesList = ({item}) => {

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
              contentContainerCustomStyle={{alignSelf: 'center'}}
              activeSlideAlignment='start'
              layoutCardOffset={9}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              ref={isCarousel}
              data={data}
              renderItem={createMenuCategoriesList}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              useScrollView={true}
            />
        </View>
    )
}


export default CategoriesCarousel