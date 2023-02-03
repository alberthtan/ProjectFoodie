import { View, StyleSheet, Text, Pressable, TouchableOpacity} from 'react-native'
import React from 'react'


const MenuCategoryButton = ({parentCallBack, item, currentCategory, setCurrentCategory}) => {
  const compareId = (currentCategory.id == item.id)
  return (
    <TouchableOpacity
      onPress = {() => {
        setCurrentCategory(item)
        parentCallBack(item)
      }}
      style={[styles.container, compareId ? styles.green: styles.gray]}
      >
        <Text style={[compareId ? {color: 'white'}: {color: 'black'}]}>{item.name}</Text>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  container: {
      // width: 100,
      // height: 30,
      borderRadius: 30,
      padding: 10,
      // alignSelf: 'flex-start',
      alignSelf: 'center',
      marginLeft: 10,
      marginRight: 5,
      // justifyContent: 'center',
      // alignItems: 'center',
      // flex: 1
  },

  gray: {
    backgroundColor: '#D9D9D9'
  },

  green: {
    
      backgroundColor: '#3C6F37'
  }

  
})

export default MenuCategoryButton