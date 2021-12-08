import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { TextInput, StyleSheet, Alert } from "react-native";
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
    Alert.alert("Success", "Status changed succesfully");
    navigation.navigate("VendorScreen");
  };
  return (
    <View
      style={{
        backgroundColor: colors.secondaryColor,
        flex: 1,
      }}
    >
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: colors.secondaryColor,
        }}
      >
        <ListItem.Content>
          <ListItem.Subtitle style={styles.textView}>
            Name: {data.name}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.textView}>
            address: {data.address}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.textView}>
            contact: {data.contact}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.textView}>
            Price: {data.total}
          </ListItem.Subtitle>
          <Text style={{ fontStyle: "italic", color: colors.textColor }}>
            Cart
          </Text>
          {data.cart.map((p, i) => (
            <View
              key={i}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "lightgray",
                width: "100%",
              }}
            >
              <Text style={{ color: colors.textColor, fontSize: 15 }}>
                name: {p.name}
              </Text>
              <Text style={{ color: colors.textColor, fontSize: 15 }}>
                quantity: {p.quantity}
              </Text>
              <Text style={{ color: colors.textColor, fontSize: 15 }}>
                price: {p.price}
              </Text>
            </View>
          ))}
        </ListItem.Content>
      </ListItem>
      <View style={styles.btnContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  textView: {
    color: colors.textColor,
    fontSize: 18,
    alignSelf: "center",
    marginTop: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
