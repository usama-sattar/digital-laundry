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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
import { cartContext } from "../../context/cart";
import { colors } from "../../global/colors";
function Cart({ navigation, route }) {
  const { cart, increment, decrement, total, remove } = useContext(cartContext);
  const { vendor } = route.params;

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.95 }}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.header}>
            <Text style={{ color: "white", fontSize: 25 }}>
              Welcome to Cart
            </Text>
          </View>
          <View>
            {cart.map((item, key) => (
              <ListItem
                key={key}
                bottomDivider
                containerStyle={{ backgroundColor: colors.darkBlue }}
              >
                <ListItem.Content>
                  <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
                    Service: {item.name}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
                    Price: {item.price}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content>
                  <View>
                    <TouchableOpacity onPress={() => increment(item, key)}>
                      <Ionicons
                        name="add-circle"
                        size={25}
                        color={colors.yellowColor}
                      ></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => decrement(item, key)}>
                      <Ionicons
                        name="remove-circle"
                        size={25}
                        color={colors.redColor}
                      ></Ionicons>
                    </TouchableOpacity>
                  </View>
                </ListItem.Content>
                <ListItem.Content>
                  <ListItem.Subtitle style={{ color: "white", fontSize: 15 }}>
                    Quantity: {item.quantity}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    <TouchableOpacity onPress={() => remove(key)}>
                      <Ionicons name="trash" size={25} color={"red"}></Ionicons>
                    </TouchableOpacity>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            Total Amount:{total}
          </Text>
        </View>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        {/* {cart.length > 0 ? ( */}
        <Pressable
          style={styles.checkoutButton}
          onPress={() =>
            navigation.navigate("CheckoutScreen", { vendor: vendor })
          }
        >
          <Text style={{ marginHorizontal: 10, fontSize: 20, color: "white" }}>
            Proceed to Checkout
          </Text>
        </Pressable>
        {/* ) : null} */}
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
  checkoutButton: {
    backgroundColor: colors.pinkColor,
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
export default Cart;
