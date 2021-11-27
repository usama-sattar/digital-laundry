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

export default function PendingOrders({ navigation }) {
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const vendor = await AsyncStorage.getItem("vendorId");
    if (vendor) {
      const vendorId = await JSON.parse(vendor);
      await getOrders(vendorId);
      setUser(vendorId);
    }
  };
  const getOrders = async (vendorId) => {
    const result = await axios.get(
      `${API}/vendors/pending/60b62df47cf46e1d64e649fd`
    );
    const data = await result.data;
    setOrders(data);
  };

  return (
    <View style={styles.container}>
      {orders.map((item, key) => {
        console.log(item);
        return (
          <ListItem
            key={key}
            bottomDivider
            containerStyle={{ backgroundColor: colors.tertiaryColor }}
          >
            <ListItem.Content>
              <ListItem.Subtitle
                style={{ color: colors.textColor, fontSize: 15 }}
              >
                {item.name}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content>
              <ListItem.Subtitle
                style={{ color: colors.textColor, fontSize: 15 }}
              >
                Price: {item.total}
              </ListItem.Subtitle>
            </ListItem.Content>
            <Button
              title="View"
              buttonStyle={{ width: 60, height: 30 }}
              titleStyle={{
                color: colors.textColor,
                fontSize: 12,
              }}
              onPress={() => {
                navigation.navigate("PendingScreenContainer", {
                  data: item,
                });
              }}
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
    backgroundColor: colors.secondaryColor,
  },
});
