import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { TextInput, StyleSheet } from "react-native";
import { ProductConsumer } from "../../context";
import { colors } from "../../global/colors";
import { Button } from "react-native-elements";
import axios from "axios";
import { API } from "../../global/constants";
import { ListItem } from "react-native-elements";

export default function PendingOrders() {
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getData();
  }, [orders]);

  const getData = async () => {
    const vendor = await AsyncStorage.getItem("vendorId");
    if (vendor) {
      const vendorId = await JSON.parse(vendor);
      await getOrders(vendorId);
      setUser(vendorId);
    }
  };
  const getOrders = async (vendorId) => {
    const result = await axios.get(`${API}/vendors/pending/${vendorId}`);
    const data = await result.data;
    setOrders(data);
  };
  const changeStatus = async () => {
    const result = await axios.post(`${API}/vendors/pending/${vendorId}`, {
      status: "completed",
    });
    const data = await result.data;
    console.log(data);
  };

  return (
    <View style={styles.container}>
      {orders.map((item, key) => {
        return (
          <ListItem
            key={key}
            bottomDivider
            containerStyle={{ backgroundColor: colors.darkBlue }}
          >
            <ListItem.Content>
              <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
                Name:{item.name}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
                address: {item.address}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
                contact: {item.contact}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content>
              <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
                Price: {item.total}
              </ListItem.Subtitle>
            </ListItem.Content>

            <ListItem.Content>
              <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
                cart:
                {item.cart.map((p, i) => (
                  <View key={i}>
                    <Text style={{ color: "white" }}>name: {p.name}</Text>
                    <Text style={{ color: "white" }}>
                      quantity: {p.quantity}
                    </Text>
                    <Text style={{ color: "white" }}>price: {p.price}</Text>
                  </View>
                ))}
              </ListItem.Subtitle>
            </ListItem.Content>
            <Button
              title="completed?"
              buttonStyle={{ width: 60, height: 30 }}
              titleStyle={{
                color: "white",
                fontSize: 8,
              }}
              onPress={() => changeStatus()}
            />
          </ListItem>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
