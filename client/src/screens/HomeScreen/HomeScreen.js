import { Dimensions, Text, View, StyleSheet, SafeAreaView} from 'react-native'
import React, {useState}  from 'react'

import QRButton from '../../components/QRButton'
import StatusBar from '../../components/StatusBar'
import BottomUp from '../../components/BottomUp'
// import TableInput from '../../components/TableInput'

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
      {/* <View style={styles.button}>
        <QRButton navigation = {navigation}/>
      </View> */}
      <SafeAreaView style={styles.container}>
        {bottomPopUp}
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // justifyContent: 'center',
        flex: 1,
        // justifyContent: "center"
        // backgroundColor: '#3C6F37',  
        // backgroundColor: 'FFFFFF'
    },

    button: {
      marginTop: Dimensions.get('window').height * (0.5 - 0.12) ,
      // position: 'relative',
      // flex: 1
      
    }
})

export default HomeScreen