import { SafeAreaView, StyleSheet, Button, View } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import {CardField, CardFieldInput, StripeProvider, useStripe, createToken, confirmPayment} from '@stripe/stripe-react-native'
import { Context } from '../globalContext/globalContext'
import CustomButton from '../components/CustomButton'

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
        navigation.goBack()
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
                    padding: 80,
                    alignItems: 'center'
                    // flexWrap: 'wrap-reverse'
                }}
                onCardChange={handleCardDetailsChange}
                />
                <View style={{width: '100%', alignItems: 'center', padding: 15}}>
                  <CustomButton text='Add Payment' onPress={handleCreatePaymentMethod}/>
                </View>
                {/* <Button style={{marginTop: 100}} title="Add Payment" onPress={handleCreatePaymentMethod} disabled={loading}/> */}
            </View>
        </SafeAreaView>

    </StripeProvider>
  )
}

export default Stripe

const styles = StyleSheet.create({})