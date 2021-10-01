import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { Rating, AirbnbRating, Avatar } from "react-native-elements";
import { images } from "../../global/images.js";
import { colors } from "../../global/colors";

function Searched({ route, navigation }, props) {
  const { Shops } = route.params;
  const [shopIndexCheck, setShopIndexCheck] = useState("0");
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(false);

  return loading === false ? (
    <View style={styles.container}>
      {Shops.length > 0 ? (
        <View>
          <Text style={{ color: "white", textAlign: "center", fontSize: 25 }}>
            Searched: {route.params.word}
          </Text>
          <View style={{ marginTop: 5 }}>
            <FlatList
              horizontal={false}
              data={Shops}
              keyExtractor={(_, index) => {
                index.toString();
              }}
              extraData={shopIndexCheck}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    key={index}
                    style={styles.verticallargeCard}
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
                          marginTop: 25,
                          justifyContent: "space-around",
                          flexDirection: "column",
                        }}
                      >
                        <View>
                          <View
                            style={{ marginHorizontal: 10, marginVertical: 5 }}
                          >
                            <Image
                              source={
                                images[
                                  Math.floor(Math.random() * images.length)
                                ]
                              }
                              style={{
                                width: "100%",
                                height: undefined,
                                aspectRatio: 1,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              width: "90%",
                              alignSelf: "center",
                              borderRadius: 0,
                              padding: 10,
                              backgroundColor: colors.pinkColor,
                              justifyContent: "center",
                            }}
                          >
                            <Text style={{ color: "white" }}>
                              Name: {item.name}
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
        </View>
      ) : (
        <Text>Nothing to Show</Text>
      )}
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  innercontainer: {
    flex: 1,
    marginTop: 20,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "33%",
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
    backgroundColor: "#3397e8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 5,
  },
  largeCard: {
    width: "70%",
    height: 200,
    backgroundColor: "#3397e8",
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "flex-start",
  },
  verticallargeCard: {
    width: "90%",
    height: 200,
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "flex-start",
    alignSelf: "center",
    flex: 1,
  },
  headingText: {
    marginHorizontal: 10,
    fontSize: 20,
  },
});
export default Searched;
