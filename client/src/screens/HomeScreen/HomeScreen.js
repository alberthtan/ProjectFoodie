import { Dimensions, Text, View, StyleSheet} from 'react-native'
import React, {useState}  from 'react'

import QRButton from '../../components/QRButton'
import StatusBar from '../../components/StatusBar'
// import TableInput from '../../components/TableInput'

const HomeScreen = ({route, navigation}) => {
  const { ordered } = route.params

  // const [tableid, setTableID] = useState('')
let statusbar // based on updating database, true for now
if (ordered) {
  statusbar = <StatusBar/>
}

  return (
    <View style = {styles.container}>
      {statusbar}
      <View style={styles.button}>
        <QRButton navigation = {navigation}/>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // justifyContent: 'center',
        flex: 1,
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