import { View, StyleSheet, Text, Pressable} from 'react-native'
import React from 'react'


const MenuCategoryButton = ({navigation, name, currentCategory, color_id, setCurrentCategory}) => {
  // console.log(currentCategory)
  // console.log(color_id)
  const compareId = (currentCategory == color_id)
  return (
    <Pressable
      onPress = {() => {setCurrentCategory(color_id)}}
      style={[styles.container, compareId ? styles.green: styles.gray]}
      >
        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[{fontWeight: 'bold'}, compareId ? {color: 'white'}: {color: 'black'}]}> {name}</Text>
        </View>
    </Pressable>
  )

}

const styles = StyleSheet.create({
  container: {
      width: 100,
      height: 30,
      borderRadius: 30,
      // backgroundColor: '#D9D9D9',
      marginLeft: 10,
      marginRight: 5,
      marginBottom: 30
  },

  gray: {
    backgroundColor: '#D9D9D9'
  },

  green: {
      backgroundColor: '#3C6F37'
  }

  
})

export default MenuCategoryButton