import { SafeAreaView, StyleSheet, Button, View } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import {CardField, CardFieldInput, StripeProvider, useStripe, createToken, confirmPayment} from '@stripe/stripe-react-native'
import { Context } from '../globalContext/globalContext'

const Stripe = ({navigation}) => {

    const globalContext = useContext(Context)

    const { userObj, getToken } = globalContext

    const [loading, setLoading] = useState(false);
    const [cardDetails, setCardDetails] = useState(CardFieldInput | null);


    const handleCardDetailsChange = (details) => {
      setCardDetails(details);
      console.log(cardDetails)
    };


    const handleCreatePaymentMethod = async () => {
        setLoading(true);
        console.log(cardDetails.last4)
        const { token, error: tokenError } = await createToken({
            ...cardDetails,
            type: 'Card',
          });
          if (tokenError) {
            console.log(tokenError);
            setLoading(false);
            return;
          }

        const accessToken = await getToken("access");

        fetch('https://dutch-pay-test.herokuapp.com/add-card/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            token: token["id"],
          }),
        });
        setLoading(false);
        navigation.navigate("Payments")
    };

  return (
    <StripeProvider
        publishableKey="pk_live_51Mg3eiFsXLeRVzOVijgZAOahtncfYOPii0G3aA4W5QMAeQb4dw0Pl1FazfIwZzfYCjNjbU7iDydGVVC8DLCJf5O800lrWkkMUq"
        // merchantIdentifier='merchant.identifier'
    >
        <SafeAreaView>
            <View>
                <CardField
                autofocus={true}
                postalCodeEnabled={true}
                style={{
                    height: 50,
                    width: '100%', 
                    
                }}
                onCardChange={handleCardDetailsChange}
                />
                <Button title="Add Payment" onPress={handleCreatePaymentMethod} disabled={loading}/>
            </View>
        </SafeAreaView>

    </StripeProvider>
  )
}

export default Stripe

const styles = StyleSheet.create({})