import { StyleSheet, Text, Pressable, View} from 'react-native'
import React , { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TipButton = ({id, currentButton, setCurrentButton, percentage, subtotal, parentCallback}) => {
    const [isPressed, setIsPressed] = useState(false)
  const [tipAmount, setTipAmount] = useState(0)

  useEffect(() => {
    switch(percentage) {
        case '15%':
            setTipAmount(0.15 * subtotal)
            break;
        case '18%':
            setTipAmount(0.18 * subtotal)
            break;
        case '20%':
            setTipAmount(0.20 * subtotal)
            break;
        default:
            setTipAmount(0)
      }
  }, [])
  
  return (
    <Pressable
        style={[styles.tipButton, (currentButton == id) ? styles.green : styles.gray]}
        onPress={() => {
            if(currentButton == id) {
                setCurrentButton(null)
            } else {
                setCurrentButton(id)
            }
            
            // setIsPressed(!isPressed)
            
            parentCallback(tipAmount)
        }} >
        <View style={{justifyContent: 'center'}}>
            <Text style={(currentButton == id) ? styles.selectedPercentage : styles.percentage}>{percentage}</Text>
            <NumberFormat
                value = {tipAmount}
                displayType = "text"
                thousandSeparator={true}
                prefix = "$"
                decimalScale={2}
                fixedDecimalScale = {true}
                renderText={(value) => <Text style = {(currentButton == id) ? styles.selectedAmount : styles.amount}>{value}</Text>}/>
    
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    tipButton: {
        height: 70,
        width: 100,
        alignSelf: "flex-start",
        padding: 15,
        margin: 10,
        borderRadius: 50,
        flex: 1,
        justifyContent: 'center'
    },

    selectedPercentage: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },

    percentage: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        textAlign: 'center'
    },

    selectedAmount: {
        fontSize: 13,
        color: 'white',
        textAlign: 'center'
    },

    amount: {
        fontSize: 13,
        color: 'black',
        textAlign: 'center'
    },

    gray: {
        backgroundColor: '#D9D9D9'
      },
    
    green: {
        backgroundColor: '#3C6F37'
    }
})

export default TipButton

