import { View, StyleSheet, Text, Pressable, TouchableOpacity} from 'react-native'
import React from 'react'


const MenuCategoryButton = ({navigation, name, currentCategory, setCurrentCategory}) => {
  // console.log(currentCategory)
  // console.log(color_id)
  const compareId = (currentCategory == name)
  return (
    <TouchableOpacity
      onPress = {() => {setCurrentCategory(name)}}
      style={[styles.container, compareId ? styles.green: styles.gray]}
      >
        <Text style={[{fontWeight: 'bold'}, compareId ? {color: 'white'}: {color: 'black'}]}>{name}</Text>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  container: {
      // width: 100,
      // height: 30,
      borderRadius: 30,
      padding: 10,
      alignSelf: 'flex-start',
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