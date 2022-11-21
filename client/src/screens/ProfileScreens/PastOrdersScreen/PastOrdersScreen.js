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
  },
  {
    id: 2,
    restaurantName: 'Jack\'s Wife Freda',
    transactionDate: '12/31/2020',
    status: 'COMPLETED',
  },
  {
    id: 3,
    restaurantName: 'Samwon Garden',
    transactionDate: '12/31/2020',
    status: 'COMPLETED',
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