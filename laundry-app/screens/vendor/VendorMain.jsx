import React, { useEffect, useRef, useState, useContext } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ProductConsumer } from "../../context";
import { colors } from "../../global/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API } from "../../global/constants";
import { chatContext } from "../../context/chat";

function VendorMain({ navigation }) {
  const { vendor, user } = useContext(chatContext);
  const [pending, setPending] = useState();
  const [fullfilled, setFullfilled] = useState();
  useEffect(() => {
    getPending();
    getFullfilled();
  });

  const getPending = async () => {
    const result = await axios.get(`${API}/vendors/total/pending/${vendor}`);
    setPending(result.data);
  };
  const getFullfilled = async () => {
    const result = await axios.get(`${API}/vendors/total/fullfilled/${vendor}`);
    setFullfilled(result.data);
  };
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <View style={styles.container}>
            <View style={{ backgroundColor: "#FEF9EF" }}>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.textColor,
                  marginVertical: 15,
                  textAlign: "center",
                }}
              >
                Vendor Dashboard
              </Text>
            </View>
            <View style={styles.cardHolder}>
              <View style={[styles.card, { backgroundColor: "#34BE82" }]}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  onPress={() => navigation.navigate("PendingScreen")}
                >
                  <Text style={[styles.textStyle, { color: "white" }]}>
                    Pending Orders
                  </Text>
                  <Ionicons name="checkmark" size={25} color="white" />
                  <Text style={[styles.textStyle, { color: "white" }]}>
                    {pending && pending}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.card, { backgroundColor: "#FFA400" }]}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  onPress={() => {
                    navigation.navigate("FullfilledScreen");
                  }}
                >
                  <Text style={[styles.textStyle, { color: "white" }]}>
                    Fullfilled Orders
                  </Text>
                  <Ionicons name="checkmark-done" size={25} color="white" />
                  <Text style={[styles.textStyle, { color: "white" }]}>
                    {fullfilled && fullfilled}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.card, { backgroundColor: "#2F86A6" }]}>
                <TouchableOpacity
                  onPress={() => {
                    value.Logout();
                    navigation.navigate("Login");
                  }}
                >
                  <Text style={styles.textStyle}>Logout</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: "#B5DEFF",
  },
  cardHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textStyle: {
    color: "yellow",
    fontSize: 20,
  },
  card: {
    width: "80%",
    alignSelf: "center",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
});
export default VendorMain;
