import { SafeAreaView, StyleSheet, Button, View } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import {CardField, CardFieldInput, StripeProvider, useStripe, createToken, confirmPayment} from '@stripe/stripe-react-native'
import { Context } from '../globalContext/globalContext'

const Stripe = () => {

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

        console.log(token)
        console.log(token["livemode"])
        // delete token["card"]
        console.log(token["id"])

        // const paymentMethodId = paymentMethod.id;
        const accessToken = await getToken("access");
        console.log(accessToken)

        console.log("STRIPE")
        console.log(token["card"]["id"])
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
    };

  return (
    <StripeProvider
        publishableKey="pk_test_51Mg3eiFsXLeRVzOVO5KIPsOT13pU8MbJss8HLpEeUmyEkqKazhvDwFRoKbq8qIMzgZ8O2ngX793aPY1UqywLPdXa00d0M1qARt"
        // merchantIdentifier='merchant.identifier'
    >
        <SafeAreaView>
            <View>
                <CardField
                autofocus={true}
                postalCodeEnabled={false}
                style={{
                    height: 50,
                    width: '100%'
                }}
                onCardChange={handleCardDetailsChange}
                />
                <Button title="Pay Now" onPress={handleCreatePaymentMethod} disabled={loading}/>
            </View>
        </SafeAreaView>

    </StripeProvider>
  )
}

export default Stripe

const styles = StyleSheet.create({})