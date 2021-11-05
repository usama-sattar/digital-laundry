import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { TextInput, StyleSheet } from "react-native";
import { ProductConsumer } from "../../context";
import { colors } from "../../global/colors";
import { Button } from "react-native-elements";
import axios from "axios";
import { API } from "../../global/constants";
import { ListItem, Overlay } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PendingScreenContainer({ route, navigation }) {
  const [user, setUser] = useState("");

  const { data } = route.params;
  console.log(data);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const vendor = await AsyncStorage.getItem("vendorId");
    if (vendor) {
      const vendorId = await JSON.parse(vendor);
      setUser(vendorId);
    }
  };
  const changeStatus = async () => {
    const result = await axios.post(`${API}/vendors/pending/${user}`, {
      status: "completed",
    });
    const data = await result.data;
    console.log(data);
  };
  return (
    <View
      style={{
        backgroundColor: colors.darkBlue,
        flex: 1,
      }}
    >
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: colors.darkBlue,
        }}
      >
        <ListItem.Content>
          <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
            Name:{data.name}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
            address: {data.address}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
            contact: {data.contact}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
            Price: {data.total}
          </ListItem.Subtitle>
          <Text style={{ fontStyle: "italic", color: "white" }}>Cart</Text>
          {data.cart.map((p, i) => (
            <View key={i}>
              <Text style={{ color: "white" }}>name: {p.name}</Text>
              <Text style={{ color: "white" }}>quantity: {p.quantity}</Text>
              <Text style={{ color: "white" }}>price: {p.price}</Text>
            </View>
          ))}
        </ListItem.Content>
      </ListItem>
      <Button
        title="Completed ?"
        buttonStyle={{ width: 120, height: 40 }}
        titleStyle={{
          color: "white",
          fontSize: 15,
        }}
        onPress={changeStatus}
      />
      <Button
        title="Book Ride"
        buttonStyle={{ width: 120, height: 40 }}
        titleStyle={{
          color: "white",
          fontSize: 15,
        }}
        onPress={() => navigation.navigate("RideBookingScreen")}
      />
    </View>
  );
}
