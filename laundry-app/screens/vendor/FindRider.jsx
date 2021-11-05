import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { API } from "../../global/constants";
import axios from "axios";

export default function FindRider({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Button title="cancel" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
