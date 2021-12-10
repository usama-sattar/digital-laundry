import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import axios from "axios";
import { API } from "../../global/constants";

function RideDetails({ route }) {
  const { fullSocket, socket, rider } = route.params;
  const [rideData, setRideData] = useState(null);

  const updateBooking = () => {
    axios.post(`${API}/booking/update/booking`, {
      _id: rideData._id,
      riderId: rider,
      coordinate: rideData.coordinate,
      status: "assigned",
    });
    fullSocket.emit("accept-ride", "ride-accepted");
  };
  useEffect(() => {
    if (fullSocket === null) {
      return;
    }
    const riderRequest = socket + "riderRequest";
    fullSocket.on(riderRequest, (rideData) => {
      setRideData(rideData);
    });
  }, [fullSocket]);

  return (
    <View style={styles.container}>
      <View>
        <Text>Ride Detail</Text>
        {rideData === null ? (
          <Text>{JSON.stringify(rideData)}</Text>
        ) : (
          <View>
            <Button title="confirm" onPress={() => updateBooking()} />
            <Text>{JSON.stringify(rideData)}</Text>
          </View>
        )}
      </View>
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
export default RideDetails;
