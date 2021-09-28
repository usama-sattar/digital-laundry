import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ProductConsumer } from "../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API } from "../../global/constants";

function EditVendor({ navigation }) {
  useEffect(() => {
    getStorage();
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);

  const getStorage = async () => {
    const id = await AsyncStorage.getItem("customerId");

    axios
      .get(`${API}/customers/current/${id}`)
      .then((res) => {
        setName(res.data.name);
        setPhone(res.data.phone);
      })
      .catch((err) => console.log(err));
  };
  const update = async () => {
    const id = await AsyncStorage.getItem("customerId");
    if (id) {
      axios
        .post(`${API}/customers/update/${id}`, {
          name: name,
          phone: phone,
        })
        .then((res) => {
          console.log("success update");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <View style={styles.container}>
      <ProductConsumer>
        {(value) => {
          return (
            <View>
              <Image
                source={require("../../assets/avatar-edit.jpg")}
                style={{ width: 200, height: 200, borderRadius: 200 }}
              />
              <TextInput value={name} style={styles.input} />
              <TextInput value={phone.toString()} style={styles.input} />
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity style={styles.button} onPress={update}>
                  <Text style={{ color: "white" }}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    value.Logout();
                    navigation.navigate("Login");
                  }}
                >
                  <Text style={{ color: "white" }}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </ProductConsumer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150,
    backgroundColor: "#3397e8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
export default EditCustomer;
