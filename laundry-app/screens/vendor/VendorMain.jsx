import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ProductConsumer } from "../../context";
import { colors } from "../../global/colors";
function VendorMain({ navigation }) {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../../assets/vendor-screen.png")}
            />
            <Text style={{ fontSize: 20, color: "white", marginVertical: 15 }}>
              Vendor Dashboard
            </Text>
            <View style={styles.cardHolder}>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.pinkColor,
                  width: "50%",
                  flexBasis: "45%",
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                }}
                onPress={() => navigation.navigate("PendingScreen")}
              >
                <Text style={[styles.textStyle, { color: "white" }]}>
                  Pending Orders
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: colors.pinkColor,
                  width: "50%",
                  flexBasis: "45%",
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                }}
              >
                <Text style={[styles.textStyle, { color: "white" }]}>
                  Fullfilled Orders
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: colors.pinkColor,
                  width: "50%",
                  flexBasis: "45%",
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                }}
                onPress={() => {
                  value.Logout();
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.textStyle}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    </ProductConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    alignItems: "center",
  },

  cardHolder: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "red",
    fontSize: 15,
  },
  image: {
    width: "100%",
    height: "50%",
    marginVertical: 20,
  },
});
export default VendorMain;
