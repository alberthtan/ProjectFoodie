import { Dimensions, View, StyleSheet} from 'react-native'
import React  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import PastOrderItem from '../../../components/PastOrderItem'
import HeaderBar from '../../../components/HeaderBar'

const pastOrdersList = [
  {
    id: 1,
    restaurantName: 'Ippudo',
    transactionDate: '12/31/2020',
    status: 'COMPLETED',
    restaurantImage: 'https://www.kikkoman.eu/fileadmin/_processed_/0/0/csm_WEB_Traditional_Fukuoka_Ramen_646cd39e6b.jpg'
  },
  {
    id: 2,
    restaurantName: 'Jack\'s Wife Freda',
    transactionDate: '12/31/2020',
    status: 'COMPLETED',
    restaurantImage: 'https://cdn.vox-cdn.com/thumbor/dIpTdNGyJdUgxa8KCdkEtXcVXi4=/0x0:960x628/1200x800/filters:focal(404x238:556x390)/cdn.vox-cdn.com/uploads/chorus_image/image/57106681/17021915_1328439217202661_4461976011855380041_n.0.jpg'
  },
  {
    id: 3,
    restaurantName: 'Samwon Garden',
    transactionDate: '12/31/2020',
    status: 'COMPLETED',
    restaurantImage: 'https://stardiamondaward.com/wp-content/uploads/2019/05/samwongarden-korean-bbq-inside.png'
  },
]

const PastOrdersScreen = ({navigation}) => {

  // const [tableid, setTableID] = useState('')

const oneOrder = ({item}) => (
  <PastOrderItem
      navigation = {navigation}
      restaurantName = {item.restaurantName}
      transactionDate= {item.transactionDate}
      status = {item.status}
      restaurantImage={item.restaurantImage}
  />
)

  return (
    <View style = {styles.container}>
      <HeaderBar name="Past Orders" navigation={navigation}/>
      <View style={{flex: 1}}>
        <FlatList
          style={{paddingTop: 10}}
          data={pastOrdersList}
          renderItem={oneOrder}
          showsHorizontalScrollIndicator = {false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },

    backButton: {
        height: 30,
        marginTop: Dimensions.get('window').height * 0.07,
        marginLeft: 0,
        alignSelf: 'flex-start'
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
      },

//     title: {
//       fontSize: 30,
//       fontWeight:"bold",
//       marginLeft: 20,
//       marginBottom: 20,
//       marginTop: Dimensions.get('window').height * 0.07,
//   },

    filter: {
      height: 15,
      width: 15,
      padding: 12,
      justifyContent: 'center',
      marginLeft: 15
  },
})

export default PastOrdersScreen