import { View, StyleSheet, Text, Pressable, TouchableHighlight, Dimensions} from 'react-native'
import React from 'react'


const MenuCategoryButton = ({parentCallBack, item, currentCategory, setCurrentCategory}) => {
  const compareId = (currentCategory.id == item.id)
  const isCategoryButton = React.useRef(null)

  return (

    <TouchableHighlight
      ref={isCategoryButton}
      onPress = {() => {
        parentCallBack(item,)
      }}
      style={[styles.container, ((compareId) ? styles.underline: styles.noUnderline)]}
      underlayColor='#E5EFE3'
      >
        <View>
            <Text style={{fontWeight: 'bold',  marginLeft: 10,
          marginRight: 5,}}>{item.name}</Text>
          {/* {compareId ? <View style={styles.slider}/> : <View style={styles.emptySlider}/>} */}
        </View>
    </TouchableHighlight>
  )

}

const styles = StyleSheet.create({
  container: {
      // width: 100,
      // height: 30,
      // borderRadius: 30,
      // backgroundColor: 'blue',
      padding: 10,
      // height: 50,
      alignSelf: 'flex-end',
      // alignSelf: 'center',
      // justifyContent: 'center',
      // alignItems: 'center',
      // flex: 1
      // borderBottomWidth: 10,
      // borderBottomColor: 'green'
  },

  underline: {
      borderBottomWidth: 5,
      borderBottomColor: 'green'
  },
  noUnderline: {
    borderBottomWidth: 5,
    borderBottomColor: '#f6f5f5'
},

  gray: {
    backgroundColor: '#D9D9D9'
  },

  green: {
    
      backgroundColor: '#3C6F37'
  },

  slider: {
      height: Dimensions.get('window').height * 0.005,
      width: '100%',
      backgroundColor: 'black',
      alignSelf: 'center'
  },
})

export default MenuCategoryButton