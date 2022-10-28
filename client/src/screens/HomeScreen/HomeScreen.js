import { Dimensions, Text, View, StyleSheet} from 'react-native'
import React, {useState}  from 'react'

import QRButton from '../../components/QRButton'
// import TableInput from '../../components/TableInput'

// import NavigationBar from 'react-native-navigation-bar'
// import NavigationBar from 'react-native-navbar';

const HomeScreen = ({navigation}) => {

  // const [tableid, setTableID] = useState('')

  const rightButtonConfig = {
    title: 'Next',
    handler: () => alert('hello!'),
  };
   
  const titleConfig = {
    title: 'Hello, world',
  };


  return (
    <View style={styles.container}>

      <QRButton navigation = {navigation}/>

      {/* <NavigationBar 
          title='Main title'
          height={50}
          leftButtonTitle='back'
          rightButtonTitle='forward'
        /> */}

      {/* <NavigationBar
        title={titleConfig}
        rightButton={rightButtonConfig}
        // title={titleConfig}
        // rightButton={rightButtonConfig}
      /> */}

      {/* <TableInput 
        value={tableid} 
        setValue={setTableID}
        placeholder='table id'
      /> */}

    </View>


  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // backgroundColor: '#3C6F37',  
        backgroundColor: 'F8F8F8'
    },
})

export default HomeScreen