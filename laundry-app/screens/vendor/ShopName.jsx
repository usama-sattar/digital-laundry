import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { colors } from "../../global/colors";
import axios from "axios";
import { API } from "../../global/constants";

export default function ShopName({ navigation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [account, setAccount] = useState("");

  const checkName = async () => {
    if (name.length < 4) {
      Alert.alert("Name should contain more than 3 letters");
      return;
    }
    if (!address.trim()) {
      Alert.alert("Address cannot be empty");
      return;
    }
    if (!account.trim()) {
      Alert.alert("Account Info cannot be empty");
      return;
    }

    const response = await axios.get(`${API}/shop/find/${name}`);
    const result = await response.data;
    if (result === true) {
      Alert.alert("shop name already registered");
    } else {
      navigation.navigate("CreateShop", {
        name: name,
        address: address,
        account: account,
      });
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: colors.darkBlue,
        justifyContent: "center",
      }}
    >
      <Image
        style={{
          width: 300,
          height: 300,
          marginVertical: 20,
          alignSelf: "center",
        }}
        source={require("../../assets/vendor.png")}
      />

      <TextInput
        placeholder="store name"
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
        placeholder="account"
        onChangeText={(text) => setAccount(text)}
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
      <View>
        <Button
          title="Next >"
          buttonStyle={{
            backgroundColor: colors.pinkColor,
            width: "30%",
            alignSelf: "center",
            borderRadius: 10,
            marginVertical: 20,
          }}
          onPress={() => checkName()}
        />
      </View>
    </ScrollView>
  );
}
