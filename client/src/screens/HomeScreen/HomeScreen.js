import { Dimensions, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React, {useState}  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import StatusBar from '../../components/StatusBar'
import BottomUpReceipt from '../../components/BottomUpReceipt'
import SearchBar from '../../components/SearchBar'
import RestaurantItem from '../../components/RestaurantItem'
import filterIcon from '../../../assets/icons/filter.png'
import BottomUpFilter from '../../components/BottomUpFilter'

const popuplist = [
  {
    id: 1,
    name: 'Original Ramen',
    price: '$12.00',
  },
  {
    id: 2,
    name: 'Spicy Miso',
    price: '$15.00',
  },
  {
    id: 3,
    name: 'Oshinko',
    price: '$3.00',
  },
]

const restaurantList = [
  {
    id: 1,
    name: 'Ippudo',
    description: 'Japanese - Ramen - Vegetarian - Asian',
    restaurantImage: 'https://www.kikkoman.eu/fileadmin/_processed_/0/0/csm_WEB_Traditional_Fukuoka_Ramen_646cd39e6b.jpg'
  },
  {
    id: 2,
    name: 'Jack\'s Wife Freda',
    description: 'American - Brunch - Group Friendly',
    restaurantImage: 'https://cdn.vox-cdn.com/thumbor/dIpTdNGyJdUgxa8KCdkEtXcVXi4=/0x0:960x628/1200x800/filters:focal(404x238:556x390)/cdn.vox-cdn.com/uploads/chorus_image/image/57106681/17021915_1328439217202661_4461976011855380041_n.0.jpg'
  },
  {
    id: 3,
    name: 'Samwon Garden',
    description: 'Korean - Meat - Group Friendly - Asian',
    restaurantImage: 'https://stardiamondaward.com/wp-content/uploads/2019/05/samwongarden-korean-bbq-inside.png'
  },
  {
    id: 4,
    name: 'Sherkaan',
    description: 'Indian - Vegetarian - Group Friendly - Asian',
    restaurantImage: 'https://images.squarespace-cdn.com/content/v1/5c5c3833840b161566b02a76/1554140515685-SA6JFOU3IJRJI6ZR9L71/social+share-01.jpg'
  },
  {
    id: 5,
    name: 'September in Bangkok',
    description: 'Thai - Vegetarian - Group Friendly - Asian',
    restaurantImage: 'https://duyt4h9nfnj50.cloudfront.net/resized/1536342980795-w2880-9e.jpg'
  },
  {
    id: 6,
    name: 'Lazeez',
    description: 'Indian - Vegetarian - Group Friendly - Asian',
    restaurantImage: 'https://d1ralsognjng37.cloudfront.net/91121715-5959-44aa-9663-755f3b458eff.jpeg'
  },
  {
    id: 7,
    name: 'Sitar',
    description: 'Indian - Vegetarian - Group Friendly - Asian',
    restaurantImage: 'https://duyt4h9nfnj50.cloudfront.net/resized/3f7c199ea5126d4b1fba9767274bb77e-w2880-47.jpg'
  },
  {
    id: 8,
    name: 'Jack\'s Bar and Steakhouse',
    description: 'American - Meat - Group Friendly - Burger',
    restaurantImage: 'https://d1ralsognjng37.cloudfront.net/37c08e20-315a-4f41-8c67-ed5f16ac846f.jpeg'
  },
  {
    id: 9,
    name: 'Kuro Shiro',
    description: 'Japanese - Ramen - Vegetarian - Asian',
    restaurantImage: 'https://d1ralsognjng37.cloudfront.net/9712875e-0784-4676-8cbb-4c9e791748b9'
  },
  {
    id: 10,
    name: 'House of Naan',
    description: 'Indian - Vegetarian - Group Friendly - Asian',
    restaurantImage: 'https://houseofnaan.com/wp-content/uploads/2019/06/tikka-fries-twitter.png'
  },
]

const HomeScreen = ({route, navigation}) => {
  const [search, setSearch] = useState('')
  const { ordered } = route.params
  let popupRef = React.createRef()
  let filterpopupRef = React.createRef()

  const onShowPopUp = () => {
    popupRef.show()
  }

  const onClosePopUp = () => {
    popupRef.close()
  }

  const onShowFilterPopUp = () => {
    filterpopupRef.filterShow()
  }

  const onCloseFilterPopUp = () => {
    filterpopupRef.filterClose()
  }

  // const [tableid, setTableID] = useState('')
let statusbar // based on updating database, true for now
let bottomPopUp
if (ordered) {
  statusbar = 
  <View style ={{paddingBottom: 50}}>
    <StatusBar barStyle="dark-content"
                onPress={onShowPopUp}/>
  </View>
  bottomPopUp = 
  <BottomUpReceipt
    title="Your Orders"
    ref={(target) => popupRef = target}
    onTouchOutside={onClosePopUp}
    data={popuplist}
    navigation={navigation}
  />
}

const oneRestaurant = ({item}) => (
  <RestaurantItem
      navigation = {navigation}
      name = {item.name}
      description = {item.description}
      restaurantImage={item.restaurantImage}
  />
)

  return (
    <View style = {styles.container}>
      {statusbar}
      <Text style = {styles.title}>
            Discovery
      </Text>

      {/* <View style = {{flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
        <SearchBar
          placeholder="Search"
          value={search} 
          setValue={setSearch}
          style={{flex: 1}}
        />
        <TouchableOpacity
            onPress={onShowFilterPopUp}
            style={{height: 30}}>
          <Image source={filterIcon} style={styles.filter}/>
        </TouchableOpacity>
        
      </View> */}

      <View style={{flex: 1}}>
        <FlatList
          data={restaurantList}
          renderItem={oneRestaurant}
          showsHorizontalScrollIndicator = {false}
        />
      </View>

      
      {bottomPopUp}
      {/* <SafeAreaView style={styles.container}>
        <BottomUpFilter
          title="Sort and Filter"
          ref={(target) => filterpopupRef = target}
          onTouchOutside={onCloseFilterPopUp}
          // data={popuplist}
          // navigation={navigation}
        />
      </SafeAreaView> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        // flexDirection: 'column',
        // justifyContent: 'center'
    },

    title: {
      fontSize: 30,
      fontWeight:"bold",
      marginLeft: 20,
      marginBottom: 20,
      marginTop: Dimensions.get('window').height * 0.07,
  },

    filter: {
      height: 15,
      width: 15,
      padding: 12,
      justifyContent: 'center',
      marginLeft: 15
  },
})

export default HomeScreen