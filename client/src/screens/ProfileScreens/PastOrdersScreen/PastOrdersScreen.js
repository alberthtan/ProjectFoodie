import { Dimensions, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React, {useState}  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import PastOrderItem from '../../../components/PastOrderItem'
import backIcon from '../../../../assets/icons/backicon.png'

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
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <Image source={backIcon} resizeMode="contain" style={{
                    width: 30,
                    height: 30,
                    alignSelf:'center',
                    justifyContent: 'center',
                    flex: 1,
                    tintColor: '#000000',
                }}/>
            </TouchableOpacity>
            <Text style = {styles.title}>
                Past Orders
            </Text>
        </View>
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

    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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