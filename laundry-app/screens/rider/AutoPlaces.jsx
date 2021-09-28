import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

function AutoPlaces({ places }) {
  return (
    <View style={styles.container}>
      {console.log(places)}
      <Text>Auto</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AutoPlaces;
