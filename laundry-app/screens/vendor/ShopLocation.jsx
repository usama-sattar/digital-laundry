import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { colors } from "../../global/colors";
import axios from "axios";
import { API } from "../../global/constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ShopLocation({ navigation }) {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [shop, setShop] = useState(null);
  useEffect(() => {
    getStorage();
  }, []);

  const getStorage = async () => {
    const vendor = await AsyncStorage.getItem("vendorId");
    if (vendor) {
      const vendorId = await JSON.parse(vendor);
      await getData(vendorId);
    }
  };
  const getData = async (vendorId) => {
    const result = await axios.get(`${API}/shop/${vendorId}`);
    const data = await result.data;
    setShop(data);
  };
  const setValues = (data, details) => {
    setCoordinates({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    setLocation(data.description);
    navigation.navigate("ShopName", {
      coordinates: coordinates,
      location: location,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      {shop !== null ? (
        <View>
          <Text>you already have shop</Text>
        </View>
      ) : (
        <GooglePlacesAutocomplete
          placeholder="Shop Location"
          minLength={3}
          autoFocus={false}
          fetchDetails={true}
          listViewDisplayed="auto"
          renderDescription={(row) => row.description}
          returnKeyType={"search"}
          onPress={(data, details = null) => {
            setValues(data, details);
          }}
          query={{
            key: "AIzaSyCSCRz0dn9b8tujCwtYNcgS--DSZ-cDBN0",
            language: "en",
          }}
          GooglePlacesDetailsQuery={{
            fields: ["formatted_address", "geometry"],
          }}
        />
      )}
    </View>
  );
}
