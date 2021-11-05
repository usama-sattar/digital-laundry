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
  };
  useEffect(() => {
    if (fullSocket === null) {
      return;
    }
    const riderRequest = socket + "riderRequest";
    fullSocket.on(riderRequest, (rideData) => {
      console.log(rideData);
      setRideData(rideData);
    });
  }, [fullSocket]);

  return (
    <View style={styles.container}>
      <View>
        <Text>Ride Detail</Text>
        <Text>{JSON.stringify(rideData)}</Text>
        {rideData !== null ? null : (
          <Button title="confirm" onPress={() => updateBooking()} />
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
