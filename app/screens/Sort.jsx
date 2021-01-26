import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { darkBrown, cream } from "../data/utilities";
import Navbar from "./Navbar";
// import { Oregano_400Regular } from "@expo-google-fonts/dev";

export default function Sort({ navigation }) {
  const beerPressHandler = () => {
    navigation.pop();
    navigation.navigate("SideMenu");
  };
  return (
    <View>
      <Navbar beerPressHandler={beerPressHandler} />
      <View style={styles.sort}>
        <Text style={styles.text}>Ordina per:</Text>
        <View style={styles.line}>
          <Image
            source={require("../assets/money.png")}
            style={styles.squareIcon}
          />
          <Image
            source={require("../assets/ratingGrey.png")}
            style={styles.squareIcon}
          />
          <Image
            source={require("../assets/alcoholPercentage.png")}
            style={styles.notSquareIcon}
          />
        </View>
        <View style={styles.line}>
          <Image
            source={require("../assets/sortAscendingCream.png")}
            style={styles.squareIcon}
          />
          <Image
            source={require("../assets/sortDescendingCream.png")}
            style={styles.squareIcon}
          />
        </View>
        <Image
          source={require("../assets/daPeppoWhite.png")}
          style={styles.peppoLogo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sort: {
    backgroundColor: darkBrown,
    height: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  line: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    paddingVertical: "10%",
  },
  squareIcon: {
    height: Dimensions.get("screen").height * 0.1,
    width: Dimensions.get("screen").height * 0.1,
  },
  notSquareIcon: {
    height: Dimensions.get("screen").height * 0.1,
    width: Dimensions.get("screen").height * 0.1 * 0.606,
  },
  text: {
    fontSize: Dimensions.get("screen").width * 0.1,
    color: cream,
    fontWeight: "800",
    paddingTop: "10%",
    paddingBottom: "5%",
  },
  peppoLogo: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").height * 0.2,
  },
});
