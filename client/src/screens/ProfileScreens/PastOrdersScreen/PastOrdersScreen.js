import { Dimensions, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React, {useState}  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import StatusBar from '../../../components/StatusBar'
import BottomUpReceipt from '../../../components/BottomUpReceipt'
import SearchBar from '../../../components/SearchBar'
import RestaurantItem from '../../../components/RestaurantItem'
import filterIcon from '../../../../assets/icons/filter.png'
import BottomUpFilter from '../../../components/BottomUpFilter'
import PastOrderItem from '../../../components/PastOrderItem'

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
      <Text style = {styles.title}>
            Past Orders
      </Text>

      <View style={{flex: 1}}>
        <FlatList
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

export default PastOrdersScreen