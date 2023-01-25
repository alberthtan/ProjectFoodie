import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

const TestScreen = () => {
    const [data, setData] = useState([])
    const serverMessagesList = [];

    const [serverState, setServerState] = useState('Loading...');
  const [messageText, setMessageText] = useState('hello');
  const [disableButton, setDisableButton] = useState(true);
  const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
  const [serverMessages, setServerMessages] = useState(serverMessagesList);
  var ws = new WebSocket('ws://10.0.0.26:8000');

  // ws.addEventListener('message', (event) => {
  //   console.log('Message from server ', event.data);
  // });


  useEffect(() => {
    console.log(serverState)
    ws.onopen = () => {
      setServerState('Connected to the server')
      // console.log(serverState)
      setDisableButton(false);
    };
    ws.onclose = (e) => {
      console.log(e)
      setServerState('Disconnected. Check internet or server.')
      setDisableButton(true);
    };
    ws.onerror = (e) => {
      console.log('got here')
      setServerState(e.message);
    };
    ws.onmessage = ({data}) => {
      console.log({data})
      serverMessagesList.push({data});
      console.log(serverMessagesList)
      setServerMessages(serverMessagesList)
      console.log(serverMessages)
    };
  }, [])

  const submitMessage = async () => {
    console.log('here')
    setMessageText('hello')
    // console.log(messageText)
    ws.send(messageText);
    // console.log(messageText)
    // try {
    //   console.log(ws)
    //   setMessageText('hello')
    //   ws.send(messageText);
    //   console.log(messageText)

    // }
    // catch (e) {
    //   console.log(e)
    // }
    // setMessageText('')
    setInputFieldEmpty(true)
  }

  // const receiveMessage = async () => {
  //   ws.onmessage = ({data}) => {
  //     console.log({data})
  //     // serverMessagesList.push({data});
  //     // setServerMessages([...serverMessagesList])
  //   };
  // }

  // Fetch Call
  // const getRestaurantsFromApi = () => {
  //   return fetch('https://dutch-pay-test.herokuapp.com/restaurants/?format=json')
  //     .then(response => response.json())
  //     .then(json => {
  //       setData(json)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  const addRestaurant = () => {
    return fetch('https://dutch-pay-test.herokuapp.com/restaurants/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'testRestaurant',
        table_count: 10,
        address: "new address",
        phone_number: "+13103438777"
      }),
    });
  }

  const addUser = () => {
    return fetch('https://dutch-pay-test.herokuapp.com/users/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: 'testRestaurant',
        last_name: 'Doe',
        email: "random@gmail.com",
        password: "testpassword"
      }),
    });
  }

  // useEffect(() => {
  //   getRestaurantsFromApi();
  // }, [])

  return (
    <View>
        {/* {getRestaurantsFromApi} */}

      <Text>TestScreen</Text>
      <TouchableOpacity
        onPress = {() => addRestaurant()}
        style={{width: 100, height: 40, margin: 10, backgroundColor: '#000000'}}>
        <Text>Add Restaurant</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress = {() => {submitMessage()}}
        style={{width: 100, height: 40, margin: 10, backgroundColor: '#000000'}}>
        <Text>Add User</Text>
      </TouchableOpacity>

      <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.name}, {item.address}, {item.phone_number}, {item.table_count}</Text>
          )}
        />



    </View>
  )
}

export default TestScreen

const styles = StyleSheet.create({})