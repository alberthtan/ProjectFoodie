import { Dimensions, Text, View, StyleSheet} from 'react-native'
import React, {useState}  from 'react'

import QRButton from '../../components/QRButton'
import TableInput from '../../components/TableInput'

const HomeScreen = ({navigation}) => {

  const [tableid, setTableID] = useState('')


  return (
    <View style={styles.container}>

      <QRButton navigation = {navigation}/>

      <TableInput 
        value={tableid} 
        setValue={setTableID}
        placeholder='table id'
      />

    </View>


  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#3C6F37',  
    },
})

export default HomeScreen