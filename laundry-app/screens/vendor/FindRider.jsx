import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { API } from "../../global/constants";
import axios from "axios";
import LottieView from "lottie-react-native";
import {
  BottomSheet,
  ListItem,
} from "react-native-elements/dist/bottomSheet/BottomSheet";

export default function FindRider({ navigation, route }) {
  const [details, setDetails] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const { socket } = route.params;
  useEffect(() => {
    if (socket === null) {
      return;
    }
    socket.current.on("ride-details", (data) => {
      setDetails(data);
    });
  }, []);
  return (
    <View style={styles.container}>
      {details === null ? (
        <View style={{ flex: 1, alignItems: "center" }}>
          <LottieView
            visible={true}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../../finding-rider.json")}
            animationStyle={{ width: 200, height: 200 }}
            speed={1}
            autoPlay
            loop
          ></LottieView>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
