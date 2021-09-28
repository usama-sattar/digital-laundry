import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { TextInput, StyleSheet } from "react-native";
import { ProductConsumer } from "../../context";
import { shopDetails } from "../../global/constants";
import { colors } from "../../global/colors";
import ShopView from "../../components/shopView";

function CreateShop({ route }) {
  const { name, address, account } = route.params;
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <View
            style={{ flex: 1, paddingTop: 5, backgroundColor: colors.darkBlue }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ flexGrow: 1 }}
            >
              {shopDetails.map((item, index) => (
                <ShopView
                  key={index}
                  detail={item}
                  name={name}
                  address={address}
                  account={account}
                />
              ))}
              <View style={{ width: "80%", alignSelf: "center", marginTop: 5 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "500", color: "white" }}
                >
                  Selected Services
                </Text>
                {value.services.length > 0
                  ? value.services.map((item, index) => {
                      return (
                        <View style={{ fontSize: 18, color: "white" }}>
                          <Text key={index}>{item.title}</Text>
                        </View>
                      );
                    })
                  : null}
              </View>
              <TouchableOpacity
                style={styles.submit}
                onPress={() => value.createShop(name, address, account)}
              >
                <Text style={{ color: "white", fontSize: 20 }}>
                  Submit Details
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        );
      }}
    </ProductConsumer>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 30,
    margin: 10,
    width: "100%",
    borderBottomWidth: 1,
    padding: 5,
    color: "black",
  },
  submit: {
    marginTop: 5,
    width: "60%",
    padding: 8,
    backgroundColor: colors.pinkColor,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
export default CreateShop;
