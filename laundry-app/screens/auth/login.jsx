import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../global/constants";
import { colors } from "../../global/colors";

function Login(props) {
  const [userType, setuserType] = useState(null);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const sendPhone = () => {
    axios
      .post(`${API}/verify/login/phone`, {
        number: phone,
        userType: userType,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const sendCode = async () => {
    axios
      .post(`${API}/verify/login/code`, {
        number: phone,
        code: code,
        userType: userType,
      })
      .then((res) => {
        console.log(res.data);
        if (userType === "vendor") {
          AsyncStorage.setItem("vendorId", JSON.stringify(res.data._id));
          props.navigation.navigate("VendorScreen");
        } else if (userType === "customer") {
          AsyncStorage.setItem("customerId", JSON.stringify(res.data._id));
          props.navigation.navigate("MainScreenContainer");
        } else {
          AsyncStorage.setItem("riderId", JSON.stringify(res.data._id));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerView}>
        <Image
          style={styles.image}
          source={require("../../assets/fashion.png")}
        />
        <View style={styles.bar}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setuserType("customer")}
          >
            <Text style={{ color: "white" }}>Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setuserType("vendor")}
          >
            <Text style={{ color: "white" }}>Vendor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setuserType("rider")}
          >
            <Text style={{ color: "white" }}>Rider</Text>
          </TouchableOpacity>
        </View>
      </View>
      {userType !== null ? (
        <Text style={{ fontSize: 20, marginTop: 10, color: "white" }}>
          {" "}
          Login {userType}{" "}
        </Text>
      ) : null}
      {userType !== null ? (
        <View style={styles.loginView}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TextInput
              style={{
                width: "60%",
                borderBottomWidth: 1,
                padding: 5,
                backgroundColor: "white",
                borderRadius: 20,
                paddingLeft: 10,
              }}
              placeholder="Mobile number"
              onChangeText={(text) => setPhone(text)}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={{
                backgroundColor: colors.pinkColor,
                padding: 5,
                borderRadius: 5,
              }}
              onPress={() => sendPhone()}
            >
              <Text style={{ color: "white" }}>Send Code</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Code"
            onChangeText={(text) => setCode(text)}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={() => sendCode()}>
            <Text style={{ color: "white" }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("SignUp")}
            style={{ paddingTop: 10 }}
          >
            <Text style={{ color: "white" }}>Do not have account? SignUp</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("SignUp")}
          style={{ paddingTop: 10 }}
        >
          <Text style={{ color: "white" }}>Do not have account? SignUp</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  loginView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "stretch",
  },
  image: {
    width: 150,
    height: 150,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.pinkColor,
    justifyContent: "center",
    padding: 10,
    width: "25%",
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
  },
  innerView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  input: {
    height: 30,
    margin: 10,
    width: "80%",
    borderBottomWidth: 1,
    padding: 5,
    color: "white",
    backgroundColor: "white",
    height: 40,
    borderRadius: 20,
    paddingLeft: 10,
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
});

export default Login;
