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
    const { id, name, cart, count, subtotal } = route.params
    const [Menus, setMenus] = useState([])
    const [MenuCategories, setMenuCategories] = useState([])
    const [MenuItems, setMenuItems] = useState([])
    const [currentCategory, setCurrentCategory] = useState('')

    const globalContext = useContext(Context)

    const { userObj } = globalContext

    

    const serverMessagesList = [];

  
    const [serverState, setServerState] = useState('Loading...');
    const [messageText, setMessageText] = useState('hello');
    const [disableButton, setDisableButton] = useState(true);
    const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
    const [serverMessages, setServerMessages] = useState(serverMessagesList);

  let controller = new WebsocketController();
  var ws = controller.ws;

  useEffect(() => {
    // DO NOT DELETE
    getMenusFromApi(id)

    console.log(serverState)
    ws.onopen = () => {
      setServerState('Connected to the server')
      // console.log(serverState)
      setDisableButton(false);
    };
    ws.onclose = (e) => {
      console.log(e)
      setServerState('Disconnected. Check internet or server.')
      setDisableButton(true);
    };
    ws.onerror = (e) => {
      console.log('got here')
      setServerState(e.message);
    };
    ws.onmessage = ({data}) => {
      console.log(JSON.parse(data))
      // console.log({data})
      serverMessagesList.push(data);
      // console.log(serverMessagesList)
      setServerMessages(serverMessagesList)
      // console.log(serverMessages)
    };
  }, [])

  const submitMessage = async (cart) => {
    const cartList = []
    for(let i=0; i < cart.length; i++) {
      let cartItem = {name: cart[i], orderedBy: userObj['first_name'], sharedBy: []}
      // console.log(cartItem)
      cartList.push(cartItem)
    }
    
    // console.log(cartList)
    ws.send(JSON.stringify(cartList))
    // console.log('here')
    // setMessageText(data)
    // ws.send(data);
    // setInputFieldEmpty(true)
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
            name = {item.name}
            price = {item.price}
            description = {item.description}
            count = {count}
            cart = {cart}
            subtotal = {subtotal}
            restaurant_id = {id}
            isOrdering = {true}
        />
    )

    let button
    if (count > 0) {
        button = <View style = {{alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, height: Dimensions.get('window').height * 0.15, borderColor: '#D9D9D9'}}>
                    <CustomButton 
                        text={"View Order (" + count + ")"}
                        style = {{bottom: 0, position: 'absolute'}}
                        onPress = {() => {navigation.navigate('Checkout', {cart: cart, count: count, subtotal: subtotal}), submitMessage(cart)}}/>
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