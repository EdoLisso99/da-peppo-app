import React from "react";
import {
  Dimensions,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import * as utilities from "./app/data/utilities";
import {
  useFonts,
  PurplePurse_400Regular,
  GloriaHallelujah_400Regular,
} from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import beerDB from "./app/data/beerDB.json";

export default function App() {
  let beer = beerDB;
  let [fontsLoaded] = useFonts({
    PurplePurse_400Regular,
    GloriaHallelujah_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      // SafeAreaView avoid the notch on the top
      <SafeAreaView style={styles.parent}>
        <StatusBar
          backgroundColor={utilities.lightBrown}
          barStyle="light-content"
        />
        <View style={styles.navbar}>
          <Image
            style={styles.beer}
            source={require("./app/assets/beerMenu.png")}
          ></Image>
          <Text style={styles.navbarTitle}>Birre di Peppo</Text>
          <Image
            style={styles.search}
            source={require("./app/assets/searchIcon.png")}
          ></Image>
        </View>
        <Image
          source={require("./app/assets/descendingSort.png")}
          style={styles.sort}
        ></Image>
        {/* Display all beers */}
        <FlatList
          data={beer}
          renderItem={({ item }) => (
            <View style={styles.list}>
              {utilities.showBottle33(item.appearence, item.bottle33Price)}
              {utilities.showBottle75(item.appearence, item.bottle75Price)}
              {/* Separate text and others */}
              {/* First Line */}
              <View style={styles.previewInfo}>
                <View style={styles.firstLine}>
                  <Text
                    style={
                      item.beerName.length <= 17
                        ? styles.beerTitle
                        : styles.beerTitleSmall
                    }
                  >
                    {item.beerName}
                  </Text>
                  <Text style={styles.priceAndDegree}>
                    {item.alcoholDegree}°
                  </Text>
                </View>
                {/* Second Line */}
                <View style={styles.secondLine}>
                  <Text style={styles.priceAndDegree}>
                    {item.bottle33Price !== null
                      ? `${item.bottle33Price}€`
                      : ""}
                    {item.bottle33Price !== null && item.bottle75Price !== null
                      ? "-"
                      : ""}
                    {item.bottle75Price !== null
                      ? `${item.bottle75Price}€`
                      : ""}
                  </Text>
                  <Image
                    style={styles.heart}
                    source={require("./app/assets/heartGray.png")}
                  ></Image>
                  <Image
                    style={styles.star}
                    source={require("./app/assets/starGray.png")}
                  ></Image>
                  <Image
                    style={styles.star}
                    source={require("./app/assets/starGray.png")}
                  ></Image>
                  <Image
                    style={styles.star}
                    source={require("./app/assets/starGray.png")}
                  ></Image>
                  <Image
                    style={styles.star}
                    source={require("./app/assets/starGray.png")}
                  ></Image>
                  <Image
                    style={styles.star}
                    source={require("./app/assets/starGray.png")}
                  ></Image>
                </View>
              </View>
            </View>
          )}
          // The toString() function is needet to avoid an uncomfortable bug
          keyExtractor={(item) => item.key.toString()}
        ></FlatList>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: utilities.cream,
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    height: Dimensions.get("screen").height * 0.1,
    backgroundColor: utilities.lightBrown,
    justifyContent: "space-between",
    paddingLeft: "4%",
    paddingRight: "4%",
    alignItems: "center",
  },
  beer: {
    height: Dimensions.get("screen").height * 0.065,
    width: Dimensions.get("screen").height * 0.065,
  },
  search: {
    height: Dimensions.get("screen").height * 0.035,
    width: Dimensions.get("screen").height * 0.035,
  },
  navbarTitle: {
    color: utilities.cream,
    fontSize: Dimensions.get("screen").width * 0.088,
    fontWeight: "900",
    fontFamily: "PurplePurse_400Regular",
  },
  beerTitle: {
    color: utilities.lightBrown,
    fontSize: Dimensions.get("screen").width * 0.07,
    fontWeight: "700",
  },
  beerTitleSmall: {
    color: utilities.lightBrown,
    fontSize: Dimensions.get("screen").width * 0.06,
    fontWeight: "700",
    flexShrink: 1,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "3.5%",
    borderBottomColor: utilities.lightBrown,
    borderBottomWidth: 3,
  },
  secondLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "justify",
    flexGrow: 1,
  },
  firstLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    marginLeft: 20,
  },
  star: {
    width: Dimensions.get("screen").height * 0.035,
    height: Dimensions.get("screen").height * 0.035 * 0.96,
  },
  heart: {
    width: Dimensions.get("screen").height * 0.035,
    height: Dimensions.get("screen").height * 0.035 * 0.89,
  },
  priceAndDegree: {
    fontSize: Dimensions.get("screen").width * 0.05,
    color: utilities.lightBrown,
    marginLeft: 15,
    marginTop: 7,
    justifyContent: "space-evenly",
    fontFamily: "GloriaHallelujah_400Regular",
  },
  previewInfo: {
    display: "flex",
    flexGrow: 1,
  },
  sort: {
    position: "absolute",
    top: Dimensions.get("screen").height * 0.1 + 7,
    right: 7,
    width: Dimensions.get("screen").height * 0.05,
    height: Dimensions.get("screen").height * 0.05,
    zIndex: 2,
  },
});
