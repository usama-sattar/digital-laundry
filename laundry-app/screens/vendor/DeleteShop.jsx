import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API } from "../../global/constants";
import { colors } from "../../global/colors";
export default function DeleteShop() {
  const [shop, setShop] = useState(null);
  const [name, setName] = useState("");
  useEffect(() => {
    getStorage();
  }, []);

  const getStorage = async () => {
    const vendor = await AsyncStorage.getItem("vendorId");
    if (vendor) {
      const vendorId = await JSON.parse(vendor);
      await getData(vendorId);
    }
  };
  const getData = async (vendorId) => {
    const result = await axios.get(`${API}/shop/${vendorId}`);
    const data = await result.data;
    setShop(data);
  };

  const deleteShop = async () => {
    const shop_id = await shop._id;
    const result = await axios.delete(`${API}/shop/${shop_id}`);
  };
  return (
    <View style={styles.container}>
      {shop !== null ? (
        <View>
          <Text>{shop.title}</Text>
          <TextInput
            placeholde="enter shop name"
            onChangeText={(text) => setName(text)}
          />
          {shop.title === name ? (
            <Button title="delete" onPress={deleteShop} />
          ) : null}
        </View>
      ) : (
        <View>
          <Text>Nothing to Delete </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
  },
});
