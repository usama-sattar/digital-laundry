import React, { useState, useEffect, useContext } from "react";
import { Pressable } from "react-native";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Badge } from "react-native-elements";
import { cartContext } from "../../context/cart";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import { Avatar, Button, Overlay, AirbnbRating } from "react-native-elements";
import axios from "axios";
import { API } from "../../global/constants";
export default function SelectScreen({ route, navigation }) {
  const { cart, addToCart } = useContext(cartContext);
  const [rating, setRating] = useState(0);
  console.log(route.params._id);

  const sendRating = async () => {
    if (rating > 0) {
      const result = await axios.post(
        `${API}/shop/rating/${route.params.data._id}`,
        { rating }
      );
      const data = await result.data;
      if (data) {
        Alert.alert("Rating done successfully");
      }
    }
  };
  const { data } = route.params;
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.95 }}>
        <View style={styles.header}>
          <Text style={{ color: "white", fontSize: 25 }}>{data.name}</Text>
        </View>
        {console.log(data)}
        <View>
          {data.services &&
            data.services.map((item, index) => {
              return (
                <View
                  style={{ marginHorizontal: 20, marginTop: 10 }}
                  key={index}
                >
                  <View style={styles.itemContainer}>
                    <View style={{ width: "40%" }}>
                      <Text style={{ color: "white", fontSize: 15 }}>
                        {item.title}
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <Text style={{ color: "white", fontSize: 15 }}>
                        Rs. {item.price}{" "}
                      </Text>
                    </View>
                    <View style={{ width: "40%" }}>
                      <TouchableOpacity
                        style={styles.cart}
                        onPress={() => addToCart(item.name, item.price)}
                      >
                        <Text style={{ color: "white", fontSize: 15 }}>
                          Push to Cart
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
      <View>
        <AirbnbRating size={20} onFinishRating={(rate) => setRating(rate)} />
        <Button
          title="Submit"
          onPress={sendRating}
          buttonStyle={{
            backgroundColor: colors.pinkColor,
            width: 100,
            alignSelf: "center",
            marginVertical: 10,
          }}
        />
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Pressable
          style={
            cart.length > 0
              ? styles.cartButton
              : [styles.cartButton, { backgroundColor: "gray" }]
          }
          onPress={() =>
            navigation.navigate("CartScreen", {
              name: data.name,
              id: data.vendor,
            })
          }
          disabled={cart.length > 0 ? false : true}
        >
          <Text style={{ marginHorizontal: 10, fontSize: 20, color: "white" }}>
            Cart
          </Text>
          <Badge status="warning" value={cart.length} />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  header: {
    width: "100%",
    backgroundColor: colors.pinkColor,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cart: {
    backgroundColor: colors.pinkColor,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  cartButton: {
    backgroundColor: colors.pinkColor,
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
