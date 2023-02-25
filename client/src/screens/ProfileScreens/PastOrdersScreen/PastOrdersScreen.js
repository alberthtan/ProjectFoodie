import { Dimensions, View, StyleSheet} from 'react-native'
import React, {useContext, useState, useEffect}  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import PastOrderItem from '../../../components/PastOrderItem'
import HeaderBar from '../../../components/HeaderBar'
import { Context } from '../../../globalContext/globalContext'


const PastOrdersScreen = ({navigation}) => {

  // const [tableid, setTableID] = useState('')
  const [pastOrderList, setPastOrderList] = useState([])
  const globalContext = useContext(Context)

  const { userObj } = globalContext


  const getReceipts = async () => {
    return fetch('https://dutch-pay-test.herokuapp.com/receipts/?format=json')
      .then(response => response.json())
      .then(json => {
        let result = json.filter(order => order.user === userObj['id'])
        setPastOrderList(result)
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getReceipts()
  }, [])
  
const oneOrder = ({item}) => (
  <PastOrderItem
      navigation = {navigation}
      restaurant_id = {item.restaurant}
      timestamp= {item.timestamp}
      cart_string = {item.cart_string}
      user={item.user}
  />
)

  return (
    <View style = {styles.container}>
      <HeaderBar name="Past Orders" navigation={navigation}/>
      <View style={{flex: 1}}>
        <FlatList
          data={pastOrderList}
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