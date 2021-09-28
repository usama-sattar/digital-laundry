import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import axios from "axios";
import { cartContext } from "../../context/cart";
import { API } from "../../global/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../global/colors";
import { Button } from "react-native-elements";

function CardPayment({ vendor }) {
  return (
    <StripeProvider publishableKey="pk_test_51J56lVJIiMKnmPN2rwY9qFt8R5FTtdITJoIRU3wEASsmx31gCGK7yBuGThKyPJuZH3e2ASFwFgxWewU28AUDqpZa00BjkrySxV">
      <StripeHandler vendor={vendor} />
    </StripeProvider>
  );
}
function StripeHandler({ vendor }) {
  const [user, setUser] = useState("");
  const [cardDetails, setCardDetails] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const { cart, total } = useContext(cartContext);
  const { confirmPayment, loading } = useConfirmPayment();

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    const customer = await AsyncStorage.getItem("customerId");
    if (customer) {
      const customerId = await JSON.parse(customer);
      setUser(customerId);
    }
  };
  const paymentHandle = async () => {
    if (!cardDetails?.complete) {
      Alert.alert("Error", "Enter Detail Please");
      return;
    }
    const billing = {
      name: name,
      email: email,
      cart: cart,
      address: address,
      contact: contact,
      price: total,
      user: user,
      vendor: vendor,
    };
    const response = await axios.post(
      `${API}/customers/create-payment`,
      billing
    );
    const result = await response.data;
    try {
      const { paymentIntent, error } = await confirmPayment(result, {
        type: "Card",
        billingDetails: { billing },
      });
      const response = await axios.post(`${API}/customers/order`, {
        //customerId: user,
        name,
        email,
        address,
        contact,
        cart,
        total,
        vendor,
      });
      const result = await response.data;
      try {
        if (result) {
          Alert.alert("Successfully placed order");
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="name"
          onChangeText={(text) => setName(text)}
          style={{
            borderWidth: 1,
            padding: 5,
            borderRadius: 15,
            backgroundColor: "white",
            paddingLeft: 10,
            width: "90%",
            alignSelf: "center",
          }}
        />
        <TextInput
          placeholder="email"
          onChangeText={(text) => setEmail(text)}
          style={{
            borderWidth: 1,
            padding: 5,
            borderRadius: 5,
            borderRadius: 15,
            backgroundColor: "white",
            paddingLeft: 10,
            marginTop: 10,
            width: "90%",
            alignSelf: "center",
          }}
        />
        <TextInput
          placeholder="address"
          onChangeText={(text) => setAddress(text)}
          style={{
            borderWidth: 1,
            padding: 5,
            borderRadius: 5,
            borderRadius: 15,
            backgroundColor: "white",
            paddingLeft: 10,
            marginTop: 10,
            width: "90%",
            alignSelf: "center",
          }}
        />
        <TextInput
          placeholder="contact number"
          onChangeText={(text) => setContact(text)}
          style={{
            borderWidth: 1,
            padding: 5,
            borderRadius: 5,
            borderRadius: 15,
            backgroundColor: "white",
            paddingLeft: 10,
            marginTop: 10,
            width: "90%",
            alignSelf: "center",
          }}
          keyboardType="numeric"
        />
        <View>
          <CardField
            placeholder={{ number: "4242 4242 4242 4242" }}
            postalCodeEnabled={false}
            style={styles.cardField}
            cardStyle={{ backgroundColor: "white", borderRadius: 5 }}
            onCardChange={(cardDetail) => {
              setCardDetails(cardDetail);
            }}
          />
        </View>
      </View>
      <View>
        <Button
          title="Pay"
          buttonStyle={{
            backgroundColor: colors.pinkColor,
            width: "90%",
            alignSelf: "center",
          }}
          onPress={paymentHandle}
          disabled={loading}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.darkBlue,
  },
  cardField: {
    width: "90%",
    marginVertical: 10,
    height: 50,
    alignSelf: "center",
  },
});
export default CardPayment;
