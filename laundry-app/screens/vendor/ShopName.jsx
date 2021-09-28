import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
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
    <View
      style={{
        flex: 1,
        backgroundColor: colors.darkBlue,
        justifyContent: "center",
      }}
    >
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
          placeholder="address"
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
      </View>
    </View>
  );
}
