import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import { categoryData, API } from "../../global/constants";
import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import { Rating, AirbnbRating, Avatar } from "react-native-elements";
import { colors } from "../../global/colors";
import { images } from "../../global/images.js";
import AnimatedLoader from "react-native-animated-loader";
import * as Location from "expo-location";

const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

function MainScreen({ navigation }) {
  const [shops, setShops] = useState([]);
  const [search, setSearch] = useState("");
  const [searchShops, setSearchShops] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [indexCheck, setIndexCheck] = useState("0");
  const [shopIndexCheck, setShopIndexCheck] = useState("0");
  const [pics, setPics] = useState([]);
  const [region, setRegion] = useState();
  const [nearbyShops, setNearbyShops] = useState([]);

  useEffect(() => {
    setImages();
    getShops();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  const getNearby = async () => {
    if (region) {
      const result = await axios.get(
        `${API}/shop/nearby/${region.longitude}/${region.latitude}`
      );
      const data = await result.data;
      setNearbyShops(data);
    }
  };
  const getLocation = async () => {
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      (error) => {
        alert(JSON.stringify(error));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
    getNearby();
  };

  const setImages = async () => {
    for (let i = 0; i < images.length; i++) {
      const pic = await images[Math.floor(Math.random() * images.length)];
      pics.push(pic);
    }
    setLoading(false);
  };
  const getShops = () => {
    axios
      .get(`${API}/shop/`)
      .then((res) => setShops(res.data))
      .catch((err) => console.log(err));
  };
  // const goSearch = () => {
  //   axios
  //     .get(`${API}/shop/find/${search}`)
  //     .then((res) => setSearchShops(res.data))
  //     .catch((err) => console.log(err));
  //   navigation.navigate("SearchScreen", { Shops: searchShops, word: search });
  //   setSearchShops([]);
  //   setSearch("");
  // };
  const goSearch = async () => {
    shops.map((shop) => {
      if (shop.name === search) {
        searchShops.push(shop);
      }
    });
    await navigation.navigate("SearchScreen", {
      Shops: searchShops,
      word: search,
    });
    setSearchShops([]);
    setSearch("");
  };
  return loading === false ? (
    <View style={styles.conatiner}>
      <ScrollView showsVerticalScrollIndicator={true} stickyHeaderIndices={[0]}>
        <View style={{ marginTop: 10 }}>
          <SearchBar
            inputContainerStyle={{
              backgroundColor: colors.darkBlue,
            }}
            containerStyle={{
              borderRadius: 5,
              padding: 0,
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            inputStyle={{
              backgroundColor: "#bbc2cb",
              borderRadius: 5,
              padding: 2,
            }}
            placeholder="Search Vendor"
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholderTextColor={"gray"}
            onSubmitEditing={() => goSearch()}
            returnKeyType="search"
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.headingText}>Our Categories</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <FlatList
            horizontal={true}
            data={categoryData}
            keyExtractor={(_, index) => {
              index.toString();
            }}
            extraData={indexCheck}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setIndexCheck(item._id);
                  }}
                >
                  <View style={styles.smallCard}>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Image
                        source={item.image}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      />
                    </View>
                    <View>
                      <Text style={{ color: "white" }}>{item.name}</Text>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.headingText}>Top Rated</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={shops.filter((value) => value.average > 2)}
            keyExtractor={(_, index) => {
              index.toString();
            }}
            extraData={shopIndexCheck}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={styles.largeCard}
                  key={index}
                  onPress={() => setShopIndexCheck(item._id)}
                >
                  <Pressable
                    onPress={() => {
                      navigation.navigate("SelectedVendorScreen", {
                        data: item,
                      });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                        <Image
                          source={pics !== undefined ? pics[index] : null}
                          style={{
                            width: "100%",
                            height: undefined,
                            aspectRatio: 1,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "90%",
                          alignSelf: "center",
                          borderRadius: 0,
                          padding: 5,
                          backgroundColor: colors.pinkColor,
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          Name: {item.name}
                        </Text>
                        <Text style={{ color: "white" }}>
                          Rating: {item.average}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
        {/*nearby container*/}
        <View style={{ marginTop: 5 }}>
          <Text style={styles.headingText}>Nearby </Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={nearbyShops}
            keyExtractor={(_, index) => {
              index.toString();
            }}
            extraData={shopIndexCheck}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  style={styles.largeCard}
                  onPress={() => setShopIndexCheck(item._id)}
                >
                  <Pressable
                    onPress={() => {
                      navigation.navigate("SelectedVendorScreen", {
                        data: item,
                      });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                        <Image
                          source={pics !== undefined ? pics[index] : null}
                          style={{
                            width: "100%",
                            height: undefined,
                            aspectRatio: 1,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "90%",
                          alignSelf: "center",
                          borderRadius: 0,
                          padding: 5,
                          backgroundColor: colors.pinkColor,
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          Name: {item.name}
                        </Text>
                        <Text style={{ color: "white" }}>
                          Rating: {item.average}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={styles.headingText}>All vendors</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={shops}
            keyExtractor={(_, index) => {
              index.toString();
            }}
            extraData={shopIndexCheck}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  style={styles.largeCard}
                  onPress={() => setShopIndexCheck(item._id)}
                >
                  <Pressable
                    onPress={() => {
                      navigation.navigate("SelectedVendorScreen", {
                        data: item,
                      });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                        <Image
                          source={pics !== undefined ? pics[index] : null}
                          style={{
                            width: "100%",
                            height: undefined,
                            aspectRatio: 1,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "90%",
                          alignSelf: "center",
                          borderRadius: 0,
                          padding: 5,
                          backgroundColor: colors.pinkColor,
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          Name: {item.name}
                        </Text>
                        <Text style={{ color: "white" }}>
                          Rating: {item.average}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
        {/*all large container*/}
        <View>
          <FlatList
            data={shops}
            keyExtractor={(_, index) => {
              index.toString();
            }}
            extraData={shopIndexCheck}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  style={styles.verticallargeCard}
                  onPress={() => setShopIndexCheck(item._id)}
                >
                  <Pressable
                    style={{ flexDirection: "row", width: "100%" }}
                    onPress={() => {
                      navigation.navigate("SelectedVendorScreen", {
                        data: item,
                      });
                    }}
                  >
                    <View style={{ marginTop: 25 }}>
                      <View
                        style={{
                          justifyContent: "space-around",
                          flexDirection: "column",
                        }}
                      >
                        <View
                          style={{ marginHorizontal: 10, marginVertical: 5 }}
                        >
                          <Image
                            source={pics !== undefined ? pics[index] : null}
                            style={{
                              width: "100%",
                              height: undefined,
                              aspectRatio: 1,
                              borderRadius: 10,
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  ) : (
    <AnimatedLoader
      visible={loading}
      overlayColor="rgba(255,255,255,0.75)"
      source={require("../../loader.json")}
      animationStyle={styles.lottie}
      speed={1}
    >
      <Text>Doing something...</Text>
    </AnimatedLoader>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: 5,
  },
  smallCard: {
    width: 100,
    height: 100,
    backgroundColor: colors.pinkColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  largeCard: {
    width: windowWidth * 0.7,
    height: 200,
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "flex-start",
    borderRadius: 10,
  },
  verticallargeCard: {
    width: "90%",
    height: 200,
    marginLeft: "5%",
    marginRight: "5%",
    alignSelf: "flex-start",
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    marginTop: 25,
  },
  headingText: {
    marginHorizontal: 10,
    fontSize: 20,
    color: "white",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
export default MainScreen;
