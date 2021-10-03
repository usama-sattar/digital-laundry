import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import { API } from "../../global/constants";
import { cartContext } from "../../context/cart";
import { ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../global/colors";

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const { order } = useContext(cartContext);

  useEffect(() => {
    getData();
  }, [order]);

  const getData = async () => {
    const customer = await AsyncStorage.getItem("customerId");
    console.log("before");
    if (customer) {
      const c = JSON.parse(customer);
      getOrders(c);
      console.log("before");
    }
  };
  const getOrders = async (customerId) => {
    const result = await axios.get(`${API}/customers/orders/${customerId}`);
    const data = await result.data;
    setOrders(data);
    console.log(orders);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {orders &&
          orders.map((item, key) => {
            return (
              <ListItem
                key={key}
                bottomDivider
                containerStyle={{ backgroundColor: colors.darkBlue }}
              >
                <ListItem.Content>
                  <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
                    Vendor: {item.vendor}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
                    Price: {item.total}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
