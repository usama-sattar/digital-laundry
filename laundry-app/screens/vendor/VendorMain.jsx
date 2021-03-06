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
            <View style={styles.cardHolder}>
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    color: colors.textColor,
                    fontWeight: "bold",
                    marginBottom: 20,
                  }}
                >
                  DASHBOARD
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "space-around",
                  width: "90%",
                }}
              >
                <View style={[styles.rowCard, { backgroundColor: "#5732FB" }]}>
                  <TouchableOpacity
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
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

                <View style={[styles.rowCard, { backgroundColor: "#FC6B21" }]}>
                  <TouchableOpacity
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
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
              </View>
              <View style={[styles.card, { backgroundColor: "#1EBAFC" }]}>
                <TouchableOpacity
                  onPress={() => {
                    value.Logout();
                    navigation.navigate("Login");
                  }}
                >
                  <Text style={[styles.textStyle, { color: "white" }]}>
                    Logout
                  </Text>
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
    backgroundColor: colors.secondaryColor,
    justifyContent: "center",
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
    fontSize: 22,
  },
  card: {
    width: "85%",
    alignSelf: "center",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  rowCard: {
    width: "45%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
});
export default VendorMain;
