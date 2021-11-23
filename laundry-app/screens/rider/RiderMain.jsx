import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import "./socket";
import { Button } from "react-native-elements";
import io from "socket.io-client/dist/socket.io";
import { API } from "../../global/constants";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function RiderMain({ navigation }) {
  const [rider, setRider] = useState("");
  const [socket, setSocket] = useState(null);
  const [fullSocket, setFullSocket] = useState(null);
  const [region, setRegion] = useState();
  const [rideData, setRideData] = useState(null);
  const LatitudeDelta = 0.0922;
  const AspectRatio = width / height;
  const LongitudeDelta = AspectRatio * LatitudeDelta;

  useEffect(() => {
    getLocation();
    getData();
    getSocket();
  }, []);

  const getSocket = async () => {
    const s = await io(`${API}`, { jsonp: false });
    s.on("connect", async () => {
      await setSocket(s.id);
      await setFullSocket(s);
    });
    return () => {
      s.disconnect();
    };
  };
  const getLocation = async () => {
    await Location.installWebGeolocationPolyfill();
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          latitudeDelta: 0.0922,
          longitudeDelta: LongitudeDelta,
        });
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };
  const getData = async () => {
    const rider = await AsyncStorage.getItem("riderId");
    if (rider) {
      const riderId = await JSON.parse(rider);
      setRider(riderId);
    }
    console.log(rider);
  };
  const setLocation = async () => {
    if (socket === null || rider === null || region === null) {
      return;
    }
    const response = await axios.post(`${API}/booking/update/location`, {
      riderId: rider,
      socketId: socket,
      coordinate: {
        type: "Point",
        coordinates: [region.longitude, region.latitude],
      },
    });
    const result = await response.data;
    console.log(result);
    navigation.navigate("RideDetailScreen", {
      fullSocket: fullSocket,
      socket: socket,
      rider: rider,
    });
  };
  return (
    <View style={styles.container}>
      <Text>Rider</Text>
      <Button title="Go" onPress={setLocation} />

      {region && (
        <MapView
          loadingEnabled={true}
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
        >
          <MapView.Marker secondaryColor="red" coordinate={region} />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    height,
  },
});
export default RiderMain;
