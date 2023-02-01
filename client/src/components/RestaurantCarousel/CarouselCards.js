import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
// import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CardItem.js'
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem'
import RestaurantCard from '../RestaurantCard'

const data = [
  {
    title: "Aenean leo",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: "https://picsum.photos/id/11/200/300",
  },
  {
    title: "In turpis",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: "https://picsum.photos/id/10/200/300",
  },
  {
    title: "Lorem Ipsum",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: "https://picsum.photos/id/12/200/300",
  },
];

const testRestaurants = [
  {
    // id: 0,
    mainImage: 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg',
    address: '50+Carmine+St+New+York+NY+10014+United+States',
    foodImage1: 'https://images.otstatic.com/prod1/28948642/4/huge.jpg',
    foodImage2: 'https://images.otstatic.com/prod1/28948594/5/huge.jpg',
    foodImage3: 'http://www.prettyinpistachio.com/wp-content/uploads/2013/10/JacksWifeFreda1-72ppi.jpg',
  },
  {
    // id: 1,
    mainImage: 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg',
    address: '50+Carmine+St+New+York+NY+10014+United+States',
    foodImage1: 'https://images.otstatic.com/prod1/28948642/4/huge.jpg',
    foodImage2: 'https://images.otstatic.com/prod1/28948594/5/huge.jpg',
    foodImage3: 'http://www.prettyinpistachio.com/wp-content/uploads/2013/10/JacksWifeFreda1-72ppi.jpg',
  },
  {
    // id: 1,
    mainImage: 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg',
    address: '50+Carmine+St+New+York+NY+10014+United+States',
    foodImage1: 'https://images.otstatic.com/prod1/28948642/4/huge.jpg',
    foodImage2: 'https://images.otstatic.com/prod1/28948594/5/huge.jpg',
    foodImage3: 'http://www.prettyinpistachio.com/wp-content/uploads/2013/10/JacksWifeFreda1-72ppi.jpg',
  },
  {
    // id: 1,
    mainImage: 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg',
    address: '50+Carmine+St+New+York+NY+10014+United+States',
    foodImage1: 'https://images.otstatic.com/prod1/28948642/4/huge.jpg',
    foodImage2: 'https://images.otstatic.com/prod1/28948594/5/huge.jpg',
    foodImage3: 'http://www.prettyinpistachio.com/wp-content/uploads/2013/10/JacksWifeFreda1-72ppi.jpg',
  },{
    // id: 1,
    mainImage: 'https://jackswifefreda.com/wp-content/uploads/2021/06/1_HCH_8344_1280x720-1170x658.jpg',
    address: '50+Carmine+St+New+York+NY+10014+United+States',
    foodImage1: 'https://images.otstatic.com/prod1/28948642/4/huge.jpg',
    foodImage2: 'https://images.otstatic.com/prod1/28948594/5/huge.jpg',
    foodImage3: 'http://www.prettyinpistachio.com/wp-content/uploads/2013/10/JacksWifeFreda1-72ppi.jpg',
  }
]

const CarouselCards = () => {
  const isCarousel = React.useRef(null)

  return (
    <View style={{alignItems: 'center'}}>
      <Carousel
        layout="default"
        // layoutCardOffset={5}
        ref={isCarousel}
        // activeSlideOffset={20}
        enableMomentum={true}
        data={testRestaurants}
        renderItem={RestaurantCard}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        // activeSlideAlignment='center'
        // inactiveSlideShift={0}
        swipeThreshold={20}
        useScrollView={true}
      />
    </View>
  )
}


export default CarouselCards