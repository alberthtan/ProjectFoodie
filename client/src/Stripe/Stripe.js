import { SafeAreaView, StyleSheet, Button, View } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import {CardField, CardFieldInput, StripeProvider, useStripe, createToken, confirmPayment} from '@stripe/stripe-react-native'
import { Context } from '../globalContext/globalContext'

const Stripe = () => {

    const globalContext = useContext(Context)

    const { userObj, getToken } = globalContext

    // const {createToken} = useStripe();
    const [loading, setLoading] = useState(false);
    const [cardDetails, setCardDetails] = useState(CardFieldInput | null);
    const [stripeCustomerId, setStripeCustomerId] = useState(null);

    useEffect(() => {
      getToken("access").then((accessToken) => {
        fetch('https://dutch-pay-test.herokuapp.com/stripe-customers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(response => response.json())
      .then(json => {
        console.log(json)
        setStripeCustomerId(json[0]['id'])
      }
      )
    })}, [])

    // const [cardDetails, setCardDetails] = useState({
    //     complete: false,
    //     error: null,
    //   });
    
      const handleCardDetailsChange = (details) => {
        console.log("fuck")
        setCardDetails(details);
        console.log(cardDetails)
      };


    const handleCreatePaymentMethod = async () => {
        setLoading(true);
        console.log(cardDetails.last4)
        const { token, error: tokenError } = await createToken({
            // bankAccount: cardDetails.bankAccount,
            // "bankAccount": null, 
            // "card": {"address": null, 
            // "brand": "MasterCard", 
            // "country": "US", 
            // "currency": null, 
            // "expMonth": 6, 
            // "expYear": 2024, 
            // "funding": "Credit", 
            // "id": "card_1MhPbgFsXLeRVzOVeh7L1ovz", 
            // "last4": "0413", 
            // "name": null}, "created": "1677815312000", "id": "tok_1MhPbgFsXLeRVzOVavmznBPB", "livemode": true, "type": "Card",
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
        console.log(stripeCustomerId)
        console.log(token["card"]["id"])
        fetch('https://dutch-pay-test.herokuapp.com/add-card/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            // payment_method_id: paymentMethodId,
            // stripe_customer_id: stripeCustomerId,
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