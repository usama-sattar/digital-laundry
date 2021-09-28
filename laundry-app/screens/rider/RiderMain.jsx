import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
// import MapView from "react-native-maps";
// import { Dimensions } from "react-native";
// import SearchBars from "./searchBars";

// const { width, height } = Dimensions.get("window");
// const aspectRation = width / height;

function RiderMain({ navigation }) {
  //   const [currentRegion, setCurrentRegion] = useState(null);
  //   useEffect(() => {
  //     console.log("useEffect called");
  //     currentLocation();
  //   }, []);

  //   const currentLocation = () => {
  //     return navigator.geolocation.getCurrentPosition((position) => {
  //       console.log(position);
  //       setCurrentRegion({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       });
  //     });
  //   };

  return (
    <View style={styles.container}>
      {/* {currentRegion !== null ? (
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={currentRegion}
        >
          <MapView.Marker pinColor="red" coordinate={currentRegion} />
        </MapView>
      ) : null}
      <SearchBars /> */}
      <Tex>Rider</Tex>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default RiderMain;
