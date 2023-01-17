import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

const TestScreen = () => {
    const [data, setData] = useState([])

  // Fetch Call
  const getRestaurantsFromApi = () => {
    return fetch('https://dutch-pay-test.herokuapp.com/restaurants/?format=json')
      .then(response => response.json())
      .then(json => {
        setData(json)
      })
      .catch(error => {
        console.error(error);
      });
  };

  const addRestaurant = () => {
    return fetch('https://dutch-pay-test.herokuapp.com/restaurants/4/', {
      method: 'DELETE',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: 'testRestaurant',
    //     table_count: 10,
    //     address: "new address",
    //     phone_number: "+13103438777"
    //   }),
    });
  }

  useEffect(() => {
    getRestaurantsFromApi();
  }, [])

  return (
    <View>
        {/* {getRestaurantsFromApi} */}

      <Text>TestScreen</Text>
      <TouchableOpacity
        onPress = {() => addRestaurant()}
        style={{width: 100, height: 40, backgroundColor: '#000000'}}>
        <Text>Add Restaurant</Text>
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