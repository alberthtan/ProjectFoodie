import { Dimensions, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React, {useState}  from 'react'

import QRButton from '../../components/QRButton'
import StatusBar from '../../components/StatusBar'
import BottomUpReceipt from '../../components/BottomUpReceipt'
import SearchBar from '../../components/SearchBar'
// import TableInput from '../../components/TableInput'
import filterIcon from '../../../assets/icons/filter.png'
import BottomUpFilter from '../../components/BottomUpFilter'

const popuplist = [
  {
    id: 1,
    name: 'Chicken Karaage',
    price: '$5.80'
  },
  {
    id: 2,
    name: 'Takoyaki',
    price: '$5.80'
  },
]

const HomeScreen = ({route, navigation}) => {
  const [search, setSearch] = useState('')
  const { ordered } = route.params
  let popupRef = React.createRef()
  let filterpopupRef = React.createRef()

  const onShowPopUp = () => {
    popupRef.show()
  }

  const onClosePopUp = () => {
    popupRef.close()
  }

  const onShowFilterPopUp = () => {
    // console.log(popupRef)
    filterpopupRef.filterShow()
  }

  const onCloseFilterPopUp = () => {
    filterpopupRef.filterClose()
  }

  // const [tableid, setTableID] = useState('')
let statusbar // based on updating database, true for now
let bottomPopUp
if (ordered) {
  statusbar = 
  <View style ={{paddingBottom: 50}}>
    <StatusBar barStyle="dark-content"
                onPress={onShowPopUp}/>
  </View>
  bottomPopUp = 
  <BottomUpReceipt
    title="Your Orders"
    ref={(target) => popupRef = target}
    onTouchOutside={onClosePopUp}
    data={popuplist}
    navigation={navigation}
  />
}

  return (
    <View style = {styles.container}>
      {statusbar}
      <Text style = {styles.title}>
            Discovery
      </Text>

      <View style = {{flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
        <SearchBar
          placeholder="Search"
          value={search} 
          setValue={setSearch}
          style={{flex: 1}}
        />
        <TouchableOpacity
            onPress={onShowFilterPopUp}
            style={{height: 30}}>
          <Image source={filterIcon} style={styles.filter}/>
        </TouchableOpacity>
        
      </View>
      

      <SafeAreaView style={styles.container}>
        {bottomPopUp}
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <BottomUpFilter
          title="Sort and Filter"
          ref={(target) => filterpopupRef = target}
          onTouchOutside={onCloseFilterPopUp}
          // data={popuplist}
          // navigation={navigation}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        // flexDirection: 'column',
        // justifyContent: 'center'
    },

    title: {
      fontSize: 30,
      fontWeight:"bold",
      marginLeft: 20,
      marginBottom: 20,
      marginTop: Dimensions.get('window').height * 0.07,
  },

    filter: {
      height: 15,
      width: 15,
      padding: 12,
      justifyContent: 'center',
      marginLeft: 15
  },
})

export default HomeScreen