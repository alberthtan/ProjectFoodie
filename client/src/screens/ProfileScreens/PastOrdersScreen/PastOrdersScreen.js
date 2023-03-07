import { Dimensions, View, StyleSheet, Text, ScrollView} from 'react-native'
import React, {useContext, useState, useEffect}  from 'react'
import { FlatList } from 'react-native-gesture-handler'

import PastOrderItem from '../../../components/PastOrderItem'
import HeaderBar from '../../../components/HeaderBar'
import { Context } from '../../../globalContext/globalContext'
import { useIsFocused } from '@react-navigation/native'


const PastOrdersScreen = ({navigation}) => {

  // const [tableid, setTableID] = useState('')
  const [pastOrderList, setPastOrderList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const globalContext = useContext(Context)

  const { userObj } = globalContext

  const isFocused = useIsFocused();


  const getReceipts = async () => {
    // setLoaded(!loaded)
    console.log(isFocused)
    return fetch('https://dutch-pay-test.herokuapp.com/receipts/?format=json')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        console.log(json.length)
        let result = json.filter(order => order.user === userObj['id'])
        // let result = []
        // for(let i = 0; i < json.length; i++) {
        //   console.log("outside")
        //   console.log(json[i].user)
        //   console.log(typeof userObj)
        //   if (json[i].user === userObj['id'] ) {
        //     console.log("inside")
        //     console.log(json[i])
        //     result.push(json[i])
        //   }
        // }
        console.log(result)
        // console.log(json)
        console.log("here")
        setPastOrderList(result)
        // setLoaded(true)
        setIsLoading(false)
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    // console.log(userObj)
    // while(true) {
    //   console.log("here")
    //   if(userObj) { break }
    //   setTimeout(() => {
    //     console.log(userObj)
    //   }, 1000);
    // }
    getReceipts()
  }, [userObj, isFocused])
  
  
const oneOrder = ({item}) => (
  <PastOrderItem
      navigation = {navigation}
      restaurant_id = {item.restaurant}
      timestamp= {item.timestamp}
      cart_string = {item.cart_string}
      user={item.user}
  />
)

if (isLoading || pastOrderList == null || userObj == false) {
  console.log(pastOrderList)
  return(<><Text>Loading</Text></>)
}

  return (
    console.log("PasO"),
    console.log(pastOrderList),
    // getReceipts(),
    <View style = {styles.container}>

    {userObj != false ?
      pastOrderList.length != 0 ?
      <>
        <View style = {styles.title2}>
          <Text style={styles.text}>  DutchPay</Text>
        </View>
      <View style={{flex: 5}}>
        <FlatList
          data={pastOrderList}
          renderItem={oneOrder}
          showsHorizontalScrollIndicator = {false}
        />
      </View>
      </>
      :
      <>
      <View style = {styles.title2}>
          <Text style={styles.text}>  DutchPay</Text>
        </View>
      <View style={{flex: 5}}>
      <ScrollView contentContainerStyle= {{justifyContent: 'center', height: '100%'}}>
        <View style={{bottom: Dimensions.get('window').height * 0.1}}>
          <View style={styles.titleContainer}>
            <Text style = {styles.title}>
              Welcome to <Text style={{color: '#3C6F37'}}>DutchPay</Text>
            </Text>
          </View>
          

          <View style = {styles.subtitleContainer}>
            <Text style = {styles.subtitle}>
              When you order at restaurants with the
            </Text>
            <Text style = {styles.subtitle}>
              DutchPay camera, you'll see your orders and the 
            </Text>
            <Text style = {styles.subtitle}>
              people you shared them with!
            </Text>
          </View>
        </View>
      </ScrollView>
      </View>
      </>
      :
      <></>
      }
      {/* <View style = {styles.title2}>
        <Text style={styles.text}>  DutchPay </Text>
      </View>
      <View style={{flex: 5}}>
        <FlatList
          data={pastOrderList}
          renderItem={oneOrder}
          showsHorizontalScrollIndicator = {false}
        />
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center'
    },

    // backButton: {
    //     height: 30,
    //     marginTop: Dimensions.get('window').height * 0.07,
    //     marginLeft: 0,
    //     alignSelf: 'flex-start'
    // },

    // title: {
    //     fontSize: 25,
    //     fontWeight: 'bold',
    //   },

//     title: {
//       fontSize: 30,
//       fontWeight:"bold",
//       marginLeft: 20,
//       marginBottom: 20,
//       marginTop: Dimensions.get('window').height * 0.07,
//   },

  //   filter: {
  //     height: 15,
  //     width: 15,
  //     padding: 12,
  //     justifyContent: 'center',
  //     marginLeft: 15
  // },

  title2: {
    // justifyContent: 'center',
    // position: 'absolute',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',

    shadowColor: '#171717',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {width: 0, height:10},
    backgroundColor: '#f6f5f5',
    // backgroundColor: 'blue',
    // top: Dimensions.get('window').height * 0.08,
    // left: Dimensions.get('window').width * 0.05
  },

  text: {
    fontSize: Dimensions.get('window').width * 0.075, 
    fontWeight: 'bold',
    fontFamily: 'Roboto_700Bold',
    color: '#3C6F37',
    bottom: Dimensions.get('window').height * 0.03,
    position: 'absolute'
  },

  titleContainer: {
    // flex: 1,
    // backgroundColor: 'red',
    // justifyContent: 'center'
  },

  title: {
    alignSelf: 'center', 
    fontSize: Dimensions.get('window').width * 0.075, 
    fontWeight: 'bold',
    // fontFamily: 'Roboto_700Bold',
    // position: 'absolute',
    bottom: Dimensions.get('window').width * 0.05,
  },
  subtitleContainer: {
    // flex: 1,
    // justifyContent: 'center',
  },
  
  subtitle: {
    alignSelf: 'center',
    // fontFamily: 'Jost_400Regular',
    fontSize: Dimensions.get('window').width * 0.04,
    marginVertical: 5,
    textAlign: 'center',
    // position: "absolute",
    // top: Dimensions.get('window').width * 0.05
  },
})

export default PastOrdersScreen