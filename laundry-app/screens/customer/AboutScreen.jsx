import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Avatar, Button, Overlay, AirbnbRating } from "react-native-elements";
import { colors } from "../../global/colors";
export default function AboutScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const customer = await AsyncStorage.getItem("customerId");
    if (customer) {
      const customerId = await JSON.parse(customer);
      setUser(customerId);
    }
  };
  const sendRating = async () => {
    if (rating > 0) {
      const result = await axios.get(`${API}/customers/rating/${user}`);
      const data = await result.data;
    }
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.8 }}>
        <Button
          title="Rate Us"
          onPress={toggleOverlay}
          buttonStyle={{
            backgroundColor: colors.pinkColor,
            width: 100,
            alignSelf: "center",
            marginVertical: 10,
          }}
        />

        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{
            width: 250,
            height: 250,
            borderRadius: 20,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text>Rate Our App</Text>
          <AirbnbRating size={20} onFinishRating={(rate) => setRating(rate)} />
          <Button
            title="Submit"
            onPress={sendRating}
            buttonStyle={{
              backgroundColor: colors.pinkColor,
              width: 100,
              alignSelf: "center",
              marginVertical: 10,
            }}
          />
        </Overlay>
      </View>
      <View style={{ flex: 0.2 }}>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginHorizontal: 20,
          }}
        >
          <Avatar
            rounded
            size="large"
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1698/1698535.png",
            }}
            onPress={() => navigation.navigate("ChatBotScreen")}
          />
        </View>
      </View>
    </View>
  );
}