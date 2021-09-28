import React, { useState, useEffect } from "react";
import { View, Image, ImageBackground, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Splash({ navigation }) {
  const moveLogin = async () => {
    const vendor = await AsyncStorage.getItem("vendorId");
    const customer = await AsyncStorage.getItem("customerId");
    const rider = await AsyncStorage.getItem("riderId");
    setTimeout(() => {
      if (customer) {
        navigation.navigate("MainScreen");
      } else if (vendor) {
        navigation.navigate("VendorScreen");
      } else if (rider) {
        navigation.navigate("RiderMain");
      } else {
        navigation.navigate("SignUp");
      }
    }, 2000);
  };
  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
      style={styles.backGround}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/wash.gif")}
          onLoadEnd={moveLogin}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  backGround: {
    width: "100%",
    height: "100%",
  },
});
export default Splash;
