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

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const { order } = useContext(cartContext);

  useEffect(() => {
    getData();
  }, [order]);
  const getData = async () => {
    const customer = await AsyncStorage.getItem("customerId");
    if (customer) {
      const c = JSON.parse(customer);
      getOrders(c);
    }
  };
  const getOrders = async (customerId) => {
    const result = await axios.get(`${API}/customers/orders/${customerId}`);
    const data = await result.data;
    setOrders(data);
  };
  return (
    <View style={styles.container}>
      {orders.map((item, key) => {
        <ListItem
          key={key}
          bottomDivider
          containerStyle={{ backgroundColor: colors.darkBlue }}
        >
          <ListItem.Content>
            <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
              Vendor:{item.vendor}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
              Price: {item.price}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
