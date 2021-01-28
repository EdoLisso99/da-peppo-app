import React from "react";
import { lightBrown, cream } from "../data/utilities";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function Navbar({ beerPressHandler, searchPressHandler }) {
  return (
    <View>
      <StatusBar backgroundColor={lightBrown} barStyle="light-content" />
      <View style={styles.navbar}>
        <TouchableOpacity onPress={beerPressHandler}>
          <Image
            style={styles.beer}
            source={require("../assets/beerMenu.png")}
          />
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>Birre di Peppo</Text>
        <TouchableOpacity onPress={searchPressHandler}>
          <Image
            style={styles.search}
            source={require("../assets/searchIcon.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    display: "flex",
    flexDirection: "row",
    height: Dimensions.get("screen").height * 0.1,
    backgroundColor: lightBrown,
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
    color: cream,
    fontSize: Dimensions.get("screen").width * 0.088,
    fontWeight: "900",
    // fontFamily: "PurplePurse_400Regular",
  },
});
