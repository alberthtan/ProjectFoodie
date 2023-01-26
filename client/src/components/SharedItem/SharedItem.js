import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React , { useState, useContext } from 'react'
import NumberFormat from 'react-number-format'
import checkIcon from '../../../assets/icons/checkmark.png';
import { Context } from '../../globalContext/globalContext';

const SharedItem = ({navigation, orderedBy, sharedBy, name, price, parentCallback}) => {
    const [checked, setChecked] = useState(false)
    
    const globalContext = useContext(Context)

    const { userObj } = globalContext

  return (
    <Pressable style = {styles.container}
    onPress={() => {
        console.log(checked)
        setChecked(!checked)
        if(!checked) { 
            parentCallback(price/2) 
        } else { 
            parentCallback(-1 * price/2) 
        }
      }}>
        <View
            style={{
                width: 30,
                height: 30, 
                marginRight: 5,
                marginLeft: 15,
                borderRadius: 30,
                borderWidth: 0.5,
                borderColor: '#7C7878',
                backgroundColor: "#FFFFFF"
            }}
            >
            
                {checked ? 
                <Image source={checkIcon} resizeMode="contain" style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    alignSelf:'center',
                    justifyContent: 'center',
                    flex: 1,
                    // tintColor: '#000000',
                }}/> : null 
            }

                
        </View>
        <View style={{marginLeft: 10}}>
            <Text style={[checked ? styles.black: styles.faded]}>{name}</Text>
            {checked ? 
                <Text style = {[styles.description, styles.faded]}>
                    {"Ordered By: " + orderedBy + "\nShared By: " + userObj.first_name + " " + sharedBy}
                </Text> : 
                <Text style = {[styles.description, styles.faded]}>
                    {"Ordered By: " + orderedBy + "\nShared By: " + sharedBy}
                </Text>
            }
        </View>

        {/* <Text style = {styles.name}>{name}</Text> */}
        {checked ? 
        <View style={styles.price}>
            <NumberFormat
                value = {price}
                displayType = "text"
                thousandSeparator={true}
                prefix = "$"
                decimalScale={2}
                fixedDecimalScale = {true}
                renderText={(value) =>
                    <Text style={[{textDecorationLine: 'line-through', fontSize: 15}, styles.faded]}>{value} </Text>          
                }>
            </NumberFormat>
            <NumberFormat
                value = {price/2}
                displayType = "text"
                thousandSeparator={true}
                prefix = "$"
                decimalScale={2}
                fixedDecimalScale = {true}
                renderText={(value) =>
                    <Text style={{fontSize: 15}}>{value}</Text>          
                }>
            </NumberFormat>
        </View>
        :
        <NumberFormat
            value = {price}
            displayType = "text"
            thousandSeparator={true}
            prefix = "$"
            decimalScale={2}
            fixedDecimalScale = {true}
            renderText={(value) =>
                <Text style={[styles.price, styles.faded]}>{value}</Text>          
            }>
        </NumberFormat>
        }
        
    </Pressable>
  )
}

export default SharedItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginTop: 30,
    },

    name: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 15
    },

    price: {
        right: 0,
        position: 'absolute',
        fontSize: 15,
        marginRight: 20,
        flexDirection: 'row'
    },

    description: {
        marginTop: 5
    },

    faded: {
        color: '#7C7878'
    }
})