import { Dimensions, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React, {useState}  from 'react'

import QRButton from '../../components/QRButton'
import StatusBar from '../../components/StatusBar'
import BottomUp from '../../components/BottomUp'
import SearchBar from '../../components/SearchBar'
// import TableInput from '../../components/TableInput'
import filterIcon from '../../../assets/icons/filter.png'

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

  const onShowPopUp = () => {
    // console.log(popupRef)
    popupRef.show()
  }

  const onClosePopUp = () => {
    popupRef.close()
  }

  // const [tableid, setTableID] = useState('')
let statusbar // based on updating database, true for now
let bottomPopUp
if (ordered) {
  statusbar = <StatusBar barStyle="dark-content"
    onPress={onShowPopUp}
  />
  bottomPopUp = 
  <BottomUp
    title="Your Orders"
    ref={(target) => popupRef = target}
    onTouchOutside={onClosePopUp}
    data={popuplist}
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
            style={{height: 30}}>
          <Image source={filterIcon} style={styles.filter}/>
        </TouchableOpacity>
        
      </View>
      

      <SafeAreaView style={styles.container}>
        {bottomPopUp}
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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