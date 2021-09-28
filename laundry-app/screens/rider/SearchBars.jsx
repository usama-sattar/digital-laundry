// import React, { useEffect, useState } from "react";
// import { View, Image, StyleSheet, Text } from "react-native";
// import { SearchBar } from "react-native-elements";
// import RNGooglePlaces from "react-native-google-places";
// import AutoPlaces from "./autoPlaces";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// function SearchBars() {
//   const [pickUp, setPickUp] = useState("");
//   const [dropOff, setDropOff] = useState("");
//   const [predictPlace, setPredictPlace] = useState(null);

//   const predictions = (val, key) => {
//     console.log(val);
//     if (key === "p") {
//       setPickUp(val);
//     } else if (key === "d") {
//       setDropOff(val);
//     }
//   };
//   const goSearch = () => {
//     RNGooglePlaces.getAutocompletePredictions("facebook")
//       .then((results) => console.log(results))
//       .catch((error) => console.log(error.message));
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.search}>
//         <SearchBar
//           inputContainerStyle={{
//             backgroundColor: "white",
//           }}
//           containerStyle={{
//             borderRadius: 5,
//             padding: 0,
//           }}
//           inputStyle={{
//             backgroundColor: "white",
//             borderRadius: 5,
//             padding: 2,
//           }}
//           placeholder="Pick Up"
//           placeholderTextColor={"gray"}
//           value={pickUp}
//           onChangeText={(text) => predictions(text, "p")}
//           onSubmitEditing={() => goSearch()}
//           returnKeyType="search"
//         />
//       </View>
//       <View style={styles.search}>
//         <SearchBar
//           inputContainerStyle={{
//             backgroundColor: "white",
//           }}
//           containerStyle={{
//             borderRadius: 5,
//             padding: 0,
//           }}
//           inputStyle={{
//             backgroundColor: "white",
//             borderRadius: 5,
//             padding: 2,
//           }}
//           placeholder="Drop Off"
//           placeholderTextColor={"gray"}
//           value={dropOff}
//           onChangeText={(text) => predictions(text, "d")}
//           returnKeyType="search"
//         />
//         <GooglePlacesAutocomplete
//           placeholder="Search"
//           onPress={(data, details = null) => {
//             // 'details' is provided when fetchDetails = true
//             console.log(data, details);
//           }}
//           query={{
//             key: "AIzaSyCm5jQqdGW5nEX9QvXVvvIl3rBd08dZKnI",
//             language: "en",
//           }}
//         />
//         <AutoPlaces places={predictPlace} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
//   search: {
//     width: "100%",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
// });
// export default SearchBars;
