import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { FlatList } from 'react-native-gesture-handler'

import MenuCategoryButton from '../../components/MenuCategoryButton'
import MenuItem from '../../components/MenuItem'
import CustomButton from '../../components/CustomButton'
import HeaderBar from '../../components/HeaderBar'
import { Context } from '../../globalContext/globalContext'

import WebsocketController from '../../websocket/websocket'

const MenuScreen = ({route, navigation}) => {
    const { id, name, cart, subtotal } = route.params
    const [Cart, setCart] = useState(cart)
    const [Menus, setMenus] = useState([])
    const [MenuCategories, setMenuCategories] = useState([])
    const [MenuItems, setMenuItems] = useState([])
    const [currentCategory, setCurrentCategory] = useState('')

    const globalContext = useContext(Context)

    const { userObj } = globalContext

  
    const serverMessagesList = [];

  
    const [serverState, setServerState] = useState('Loading...');
    const [serverMessages, setServerMessages] = useState(serverMessagesList);

  let controller = new WebsocketController();
  var ws = controller.ws;

  ws.onopen = () => {
    setServerState('Connected to the server')
    // console.log(serverState)
    // setDisableButton(false);
  };
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
    console.log(JSON.parse(data))
    let message = JSON.parse(data)
    let newCart = []
    // let newCart = JSON.parse(JSON.stringify(Cart))
    
    for (let i = 0; i < message.length; i++) {
      newCart.push(message[i])
    }
    // console.log(cart)
    setCart(newCart)
    // serverMessagesList.push(data);
    // setServerMessages(serverMessagesList)
  };

  useEffect(() => {
    // DO NOT DELETE
    getMenusFromApi(id)

    // console.log(serverState)
    // ws.onopen = () => {
    //   setServerState('Connected to the server')
    //   // console.log(serverState)
    //   // setDisableButton(false);
    // };
    // ws.onclose = (e) => {
    //   console.log(e)
    //   setServerState('Disconnected. Check internet or server.')
    //   // setDisableButton(true);
    // };
    // ws.onerror = (e) => {
    //   console.log('got here')
    //   setServerState(e.message);
    // };
    // ws.onmessage = ({data}) => {
    //   console.log(JSON.parse(data))
    //   let message = JSON.parse(data)
      
    //   for (let i = 0; i < message.length; i++) {
    //     cart.push(message[i])
    //   }
    //   console.log(cart)
    //   setCart(cart)
    //   // serverMessagesList.push(data);
    //   // setServerMessages(serverMessagesList)
    // };
  }, [])

  const handleCheckout = async (cart) => {
    ws.send(JSON.stringify(cart))
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
        getMenuItemsFromApi()               
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
            cart = {Cart}
            subtotal = {subtotal}
            restaurant_id = {id}
            isOrdering = {true}
        />
    )

    let button
    if (Cart.length > 0) {
        button = <View style = {{alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, height: Dimensions.get('window').height * 0.15, borderColor: '#D9D9D9'}}>
                    <CustomButton 
                        text={"View Order (" + Cart.length + ")"}
                        style = {{bottom: 0, position: 'absolute'}}
                        onPress = {() => {navigation.navigate('Checkout', {cart: Cart, subtotal: subtotal}), handleCheckout()}}/>
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