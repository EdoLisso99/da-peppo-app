import React from "react";
import {
  Dimensions,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import * as projectColor from "./app/assets/utilities";

export default function App() {
  return (
    <SafeAreaView style={styles.parent}>
      <StatusBar
        backgroundColor={projectColor.lightBrown}
        barStyle="light-content"
      />
      <View style={styles.navbar}>
        <Image
          style={styles.beerMenu}
          source={require("./app/assets/beerMenu.png")}
        ></Image>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: projectColor.cream,
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    height: Dimensions.get("screen").height * 0.1,
    backgroundColor: projectColor.lightBrown,
  },
  beerMenu: {
    height: Dimensions.get("screen").height * 0.07,
    width: Dimensions.get("screen").height * 0.07,
    zIndex: 2,
  },
});
