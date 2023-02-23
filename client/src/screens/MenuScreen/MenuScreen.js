import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { FlatList } from 'react-native-gesture-handler'

import MenuCategoryButton from '../../components/MenuCategoryButton'
import CustomButton from '../../components/CustomButton'
import { Context } from '../../globalContext/globalContext'
import MenuItemsCarousel from '../../components/MenuItemsCarousel'
import MenuHeader from '../../components/MenuHeader/MenuHeader'

const MenuScreen = ({route, navigation}) => {
    const { restaurant_id, active_menu, name, subtotal, table_id } = route.params
    const [destinationCategory, setDestinationCategory]= useState([])
    const [MenuCategories, setMenuCategories] = useState([])
    const [MenuItems, setMenuItems] = useState([])
    const [currentCategory, setCurrentCategory] = useState(null)
    const isCarousel = React.useRef(null)
    const isHeader = React.useRef(null)

    const globalContext = useContext(Context)

    const { ws, cart, setCart, setWs } = globalContext
  

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
      console.log(message)
      let temp = []
      
      for (let i = 0; i < message.length; i++) {
        // console.log('got here')
        temp.push(message[i])
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

    const getMenusFromApi = async () => {
        return await fetch('https://dutch-pay-test.herokuapp.com/menus/' + active_menu + '/?format=json')
          .then(response => response.json())
          .then(json => {
            // const result = json.filter(menu => menu["restaurant"] == id)
            // setMenus(result)
            getCategoriesFromApi(json.id)
          })
          .catch(error => {
            throw error;
          });
      };

    const getCategoriesFromApi = async (id) => {
        return await fetch('https://dutch-pay-test.herokuapp.com/categories/?format=json')
          .then(response => response.json())
          .then(json => {
            const result = json.filter(category => category["menu"] == id)
            const emptyRows = new Array(result.length).fill([]);
            setCurrentCategory(result[0])
            setDestinationCategory(result[0])
            setMenuCategories(result)
            setMenuItems(emptyRows)
          })
          .catch(error => {
            throw error;
          });
      };

      const getMenuItemsFromApi = async () => {
        return fetch('https://dutch-pay-test.herokuapp.com/menu-items/?format=json')
          .then(response => response.json())
          .then(json => {
            let menuItems = []
            
            for(let i=0; i < MenuCategories.length; i++) {
              let items = []
              for(let j=0; j < json.length; j++) {
                if(MenuCategories[i].id == json[j].category) {
                  items.push(json[j])
                }
              }
              menuItems.push(items)
            }
            setMenuItems(menuItems)
          })
          .catch(error => {
            throw error;
          });
      };

    const handleCallbackCarousel = (currentIndex) => {
        setCurrentCategory(MenuCategories[currentIndex])
        isHeader.current.scrollToIndex({animated: true, index: currentIndex})
    }

    const handleCallbackCategory = (item) => {
      let index = MenuCategories.indexOf(item)
      isCarousel.current.snapToItem(index)
      isHeader.current.scrollToIndex({animated: true, index: index})
    }

    useEffect(() => {
      if(MenuCategories.length != 0) {
        getMenuItemsFromApi()
        setCurrentCategory(MenuCategories[0])
      }
    }, [MenuCategories])


    useEffect(() => {
      getMenusFromApi()
    }, [])


    const oneCategory = ({item, index}) => (
        <MenuCategoryButton
            navigation = {navigation}
            item = {item}
            currentCategory = {currentCategory}
            setCurrentCategory = {setCurrentCategory}
            parentCallBack = {handleCallbackCategory}
            id={index}
            destinationCategory={destinationCategory}
            setDestinationCategory={setDestinationCategory}
        />
    )

  

  return (
    <View style = {{flex: 1}}>

        <MenuHeader 
            name={name} 
            isHeader={isHeader}
            navigation={navigation} 
            destination="HomeTabs" 
            oneCategory={oneCategory}
            MenuCategories={MenuCategories}
        />

        <View style = {{flex: 6.5}}>
            <MenuItemsCarousel
              isCarousel={isCarousel}
              data={MenuItems}
              subtotal={subtotal}
              name={name}
              navigation={navigation}
              table_id={table_id}
              restaurant_id={restaurant_id}
              active_menu={active_menu}
              parentCallback={handleCallbackCarousel}
              />
        </View>

        {(calculateLength() > 0) ? 
            <View style = {styles.viewOrderContainer}>
                <CustomButton 
                    text={"View Order (" + calculateLength() + ")"}
                    style = {{bottom: 50, position: 'absolute'}}
                    onPress = {() => {navigation.navigate('Checkout', {table_id: table_id, subtotal: subtotal, restaurant_id: restaurant_id, restaurant_name: name, active_menu: active_menu})}}
                />
            </View> : 
            <></>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  viewOrderContainer: {
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    backgroundColor: 'white', 
    height: Dimensions.get('window').height * 0.12, 
    paddingTop: 5,
    borderWidth: 1, 
    borderColor: '#D9D9D9', 
  },


})

export default MenuScreen