import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { FlatList } from 'react-native-gesture-handler'

import MenuCategoryButton from '../../components/MenuCategoryButton'
import MenuItem from '../../components/MenuItem'
import CustomButton from '../../components/CustomButton'
import HeaderBar from '../../components/HeaderBar'
import { Context } from '../../globalContext/globalContext'

const MenuScreen = ({route, navigation}) => {
    const { restaurant_id, name, subtotal, table_id } = route.params
    
    const [Menus, setMenus] = useState([])
    const [MenuCategories, setMenuCategories] = useState([])
    const [MenuItems, setMenuItems] = useState([])
    const [currentCategory, setCurrentCategory] = useState('')
    const [isFirstTime, setIsFirstTime] = useState(true)

    const globalContext = useContext(Context)

    const { userObj, ws, cart, setCart, setWs } = globalContext
    // const [Cart, setCart] = useState(cart)
  
    const [serverState, setServerState] = useState('Loading...');
  


  // let controller = new WebsocketController();
  // var ws = controller.ws;
  // useEffect(() => {
  //     ws.send(JSON.stringify({table_id: table_id}))
  // }, [])

  // ws.onopen = () => {
  //   setServerState('Connected to the server')
  //   console.log("opening ws in menu screen")
  //   ws.send(JSON.stringify({table_id: table_id, cart: cart}))
  //   // console.log(serverState)
  //   // setDisableButton(false);
  // };
  ws.onclose = (e) => {
    console.log(e)
    setServerState('Disconnected. Check internet or server.')
    // setDisableButton(true);
  };
  ws.onerror = (e) => {
    console.log('got here')
    setServerState(e.message);
  };
  ws.onmessage = ({data}) => {
    console.log("ACQUIRING MESSAGE IN MENU")
    console.log(data)
    let message = JSON.parse(data)

    if('clear' in message) {
      navigation.navigate('HomeTabs')
      console.log("closing websocket from frontend")
      ws.close()
      setWs(null)
    } else {
      let temp = []
      for (let i = 0; i < message.cart.length; i++) {
        // console.log('got here')
        temp.push(message.cart[i])
      }
      setCart(temp)
    }
  };

  const calculateLength = () => {
    let length = 0
    for(let i=0; i < cart.length; i++) {
      if(cart[i].status == 'pending') {
        length += 1
      }
    }
    return length
  }

    const getMenusFromApi = async (id) => {
        return await fetch('https://dutch-pay-test.herokuapp.com/menus/?format=json')
          .then(response => response.json())
          .then(json => {
            const result = json.filter(menu => menu["restaurant"] == id)
            setMenus(result)
            getCategoriesFromApi(result[0].id)
          })
          .catch(error => {
            console.error(error);
          });
      };

    const getCategoriesFromApi = async (id) => {
        return await fetch('https://dutch-pay-test.herokuapp.com/categories/?format=json')
          .then(response => response.json())
          .then(json => {
            const result = json.filter(category => category["menu"] == id)
            setCurrentCategory(result[0].id)
            setMenuCategories(result)
          })
          .catch(error => {
            console.error(error);
          });
      };

      const getMenuItemsFromApi = () => {
        return fetch('https://dutch-pay-test.herokuapp.com/menu-items/?format=json')
          .then(response => response.json())
          .then(json => {
            const result = json.filter(item => item["category"] == currentCategory)
            setMenuItems(result)
          })
          .catch(error => {
            console.error(error);
          });
      };

    useEffect(() => {
      getMenusFromApi(restaurant_id)
      // console.log(MenuItems)
    }, [])
    
    useEffect(() => {
      // console.log("RUNNINGNGNGNNGN")
      if(!isFirstTime) {
        getMenuItemsFromApi()  
      } else {
        setIsFirstTime(false)
      }
                     
    }, [currentCategory])

    const oneCategory = ({item}) => (
        <MenuCategoryButton
            navigation = {navigation}
            name = {item.name}
            id = {item.id}
            currentCategory = {currentCategory}
            setCurrentCategory = {setCurrentCategory}
        />
    )

    const getCategories = () => (
        <View style = {{height: 50, marginTop: 20}}>
            <FlatList
                horizontal= {true}
                showsHorizontalScrollIndicator = {false}
                data = { MenuCategories }
                renderItem = { oneCategory }
            />
        </View>
    )

    
    const oneDish = ({item}) => (
        <MenuItem
            navigation = {navigation}
            item = {item}
            name = {item.name}
            price = {item.price}
            description = {item.description}
            subtotal = {subtotal}
            table_id = {table_id}
            restaurant_id = {restaurant_id}
            restaurant_name = {name}
            isOrdering = {true}
        />
    )

    let button
    if (calculateLength() > 0) {
        button = <View style = {{alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, height: Dimensions.get('window').height * 0.15, borderColor: '#D9D9D9'}}>
                    <CustomButton 
                        text={"View Order (" + calculateLength() + ")"}
                        style = {{bottom: 0, position: 'absolute'}}
                        onPress = {() => {navigation.navigate('Checkout', {table_id: table_id, subtotal: subtotal, restaurant_name: name})}}/>
                </View>
    }

  return (
    <View style = {{flex: 1}}>
        <HeaderBar name={name} navigation={navigation} destination="HomeTabs"/>

        <View style = {{flex: 1}}>
                <FlatList
                    showsVerticalScrollIndicator = {true}
                    data = { MenuItems }
                    renderItem = { oneDish }
                    ListHeaderComponent={ getCategories }
                />
            
        {button}
        </View>
    </View>
  )
}

export default MenuScreen