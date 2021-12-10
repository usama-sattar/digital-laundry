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
} from "react-native";
import { categoryData, API } from "../../global/constants";
import { SearchBar } from "react-native-elements";
import { Image } from "react-native-elements";
import { colors } from "../../global/colors";
import { images } from "../../global/images.js";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

function MainScreen({ navigation }) {
  const [shops, setShops] = useState([]);
  const [search, setSearch] = useState("");
  const [searchShops, setSearchShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexCheck, setIndexCheck] = useState("0");
  const [shopIndexCheck, setShopIndexCheck] = useState("0");
  const [pics, setPics] = useState([]);
  const [region, setRegion] = useState();
  const [nearbyShops, setNearbyShops] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  useEffect(() => {
    setImages();
    getShops();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    getNearby();
  }, [region]);

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
  };

  const setImages = async () => {
    for (let i = 0; i < images.length; i++) {
      const pic = await images[Math.floor(Math.random() * images.length)];
      pics.push(pic);
    }
  };
  const getShops = () => {
    axios
      .get(`${API}/shop/`)
      .then((res) => setShops(res.data))
      .catch((err) => console.log(err));
  };
  const goSearch = async () => {
    shops.map((shop) => {
      if (shop.name === search) {
        searchShops.push(shop);
      }
    });
    await navigation.navigate("SearchScreen", {
      Shops: searchShops,
      word: search,
      pics: pics,
    });
    setSearchShops([]);
    setSearch("");
  };
  return loading === false ? (
    <View style={styles.conatiner}>
      <ScrollView showsVerticalScrollIndicator={true} stickyHeaderIndices={[0]}>
        <View>
          <SearchBar
            inputContainerStyle={{
              backgroundColor: colors.secondaryColor,
            }}
            containerStyle={{
              borderRadius: 5,
              padding: 0,
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            inputStyle={{
              backgroundColor: colors.tertiaryColor,
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
        <View style={{ marginTop: 20 }}>
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
                      <Text style={{ color: colors.textColor }}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
        <View style={{ marginTop: 30 }}>
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
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <View>
                        <Image
                          source={pics !== undefined ? pics[index] : null}
                          style={{
                            width: "100%",
                            height: 175,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "100%",
                          borderRadius: 0,
                          padding: 5,
                          backgroundColor: colors.tertiaryColor,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            flexWrap: "wrap",
                          }}
                        >
                          <Text style={{ color: "black", fontSize: 20 }}>
                            {item.name}
                          </Text>
                          {item.average && (
                            <Text
                              style={{
                                color: colors.primaryColor,
                                fontSize: 15,
                              }}
                            >
                              {item.average}
                              <Ionicons name="star" size={15} color="#FFC000" />
                            </Text>
                          )}
                          <Text
                            style={{ color: colors.primaryColor, fontSize: 15 }}
                          >
                            {item.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
        {/*nearby container*/}
        <View style={{ marginTop: 30 }}>
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
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <View>
                        <Image
                          source={pics !== undefined ? pics[index] : null}
                          style={{
                            width: "100%",
                            height: 175,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "100%",
                          borderRadius: 0,
                          padding: 5,
                          backgroundColor: colors.tertiaryColor,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            flexWrap: "wrap",
                          }}
                        >
                          <Text style={{ color: "black", fontSize: 20 }}>
                            {item.name}
                          </Text>
                          {item.average && (
                            <Text
                              style={{
                                color: colors.primaryColor,
                                fontSize: 15,
                              }}
                            >
                              {item.average}
                              <Ionicons name="star" size={15} color="#FFC000" />
                            </Text>
                          )}
                          <View>
                            <Text
                              style={{
                                color: colors.primaryColor,
                                fontSize: 15,
                              }}
                            >
                              {item.location}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>

        <View style={{ marginTop: 30 }}>
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
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <View>
                        <Image
                          source={pics !== undefined ? pics[index] : null}
                          style={{
                            width: "100%",
                            height: 175,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "100%",
                          borderRadius: 0,
                          padding: 5,
                          backgroundColor: colors.tertiaryColor,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            flexWrap: "wrap",
                          }}
                        >
                          <Text style={{ color: "black", fontSize: 20 }}>
                            {item.name}
                          </Text>
                          {item.average && (
                            <Text
                              style={{
                                color: colors.primaryColor,
                                fontSize: 15,
                              }}
                            >
                              {item.average}
                              <Ionicons name="star" size={15} color="#FFC000" />
                            </Text>
                          )}

                          <Text
                            style={{ color: colors.primaryColor, fontSize: 15 }}
                          >
                            {item.location}
                          </Text>
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
    <LottieView
      visible={loading}
      overlayColor="rgba(255,255,255,0.75)"
      source={require("../../loader.json")}
      animationStyle={styles.lottie}
      speed={1}
      autoPlay
      loop
    ></LottieView>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
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
    backgroundColor: colors.tertiaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.lightBlue,
  },
  largeCard: {
    width: windowWidth * 0.7,
    height: 250,
    backgroundColor: colors.tertiaryColor,
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
    backgroundColor: colors.tertiaryColor,
    borderRadius: 10,
    marginTop: 25,
  },
  headingText: {
    marginHorizontal: 10,
    fontSize: 20,
    color: colors.textColor,
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
export default MainScreen;
