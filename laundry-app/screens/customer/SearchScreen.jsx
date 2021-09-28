import React, { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Rating, AirbnbRating, Avatar } from "react-native-elements";

function Searched({ route, navigation }, props) {
  const { shops } = route.params.Shops;
  const [shopIndexCheck, setShopIndexCheck] = useState("0");

  return (
    <View style={styles.container}>
      {shops.length > 0 ? (
        <View>
          <Text style={{ color: "purple", textAlign: "center", fontSize: 25 }}>
            Searched: {route.params.word}
          </Text>
          <View style={{ marginTop: 5 }}>
            <FlatList
              horizontal={false}
              data={shops}
              keyExtractor={(item) => item._id}
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
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{ marginHorizontal: 10, marginVertical: 5 }}
                        >
                          <Avatar
                            size="large"
                            overlayContainerStyle={{
                              backgroundColor: "#fff",
                              borderRadius: 50,
                            }}
                            title={item.title[0]}
                            titleStyle={{ color: "black" }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                          />
                        </View>
                        <View
                          style={{ marginHorizontal: 10, marginVertical: 5 }}
                        >
                          <Text>{item.title}</Text>
                        </View>
                      </View>
                      <View>
                        <AirbnbRating
                          count={5}
                          reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
                          defaultRating={4}
                          size={10}
                        />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#3397e8",
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "flex-start",
  },
  headingText: {
    marginHorizontal: 10,
    fontSize: 20,
  },
});
export default Searched;
