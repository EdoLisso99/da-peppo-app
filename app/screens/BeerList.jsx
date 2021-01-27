import React from "react";
import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import * as utilities from "../data/utilities";
// import {
//   PurplePurse_400Regular,
//   GloriaHallelujah_400Regular,
// } from "@expo-google-fonts/dev";

export default function BeerList({ item, titlePressHandler }) {
  return (
    <View style={styles.list}>
      {utilities.showBottle(item.appearence, item.bottle33Price, true)}
      {utilities.showBottle(item.appearence, item.bottle75Price, false)}
      {/* Separate text and others */}
      {/* First Line */}
      <View style={styles.previewInfo}>
        <View style={styles.firstLine}>
          <Text
            onPress={titlePressHandler}
            style={
              item.beerName.length <= 17
                ? styles.beerTitle
                : styles.beerTitleSmall
            }
          >
            {item.beerName}
          </Text>
          <Text style={styles.priceAndDegree}>{item.alcoholDegree}°</Text>
        </View>
        {/* Second Line */}
        <View style={styles.secondLine}>
          <Text style={styles.priceAndDegree}>
            {item.bottle33Price !== null ? `${item.bottle33Price}€` : ""}
            {item.bottle33Price !== null && item.bottle75Price !== null
              ? "-"
              : ""}
            {item.bottle75Price !== null ? `${item.bottle75Price}€` : ""}
          </Text>
          <Image
            style={styles.heart}
            source={require("../assets/heartGray.png")}
          ></Image>
          <Image
            style={styles.star}
            source={require("../assets/starGray.png")}
          ></Image>
          <Image
            style={styles.star}
            source={require("../assets/starGray.png")}
          ></Image>
          <Image
            style={styles.star}
            source={require("../assets/starGray.png")}
          ></Image>
          <Image
            style={styles.star}
            source={require("../assets/starGray.png")}
          ></Image>
          <Image
            style={styles.star}
            source={require("../assets/starGray.png")}
          ></Image>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: Dimensions.get("screen").height * 0.03,
    height: Dimensions.get("screen").height * 0.03 * 0.96,
  },
  heart: {
    width: Dimensions.get("screen").height * 0.03,
    height: Dimensions.get("screen").height * 0.03 * 0.89,
  },
  priceAndDegree: {
    fontSize: Dimensions.get("screen").width * 0.05,
    color: utilities.lightBrown,
    marginLeft: 15,
    marginTop: 7,
    justifyContent: "space-evenly",
    // fontFamily: "GloriaHallelujah_400Regular",
  },
  previewInfo: {
    display: "flex",
    flexGrow: 1,
  },
});
