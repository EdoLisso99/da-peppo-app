import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

export const lightBrown = "#623D07";
export const darkBrown = "#4B2D00";
export const cream = "#EDEAA2";

export const showBottle = (appearence, bottle, is33) => {
  const images = {
    blonde33: require("../assets/blonde33.png"),
    blonde75: require("../assets/blonde75.png"),
    amber33: require("../assets/amber33.png"),
    amber75: require("../assets/amber75.png"),
    brown33: require("../assets/brown33.png"),
    brown75: require("../assets/brown75.png"),
    black33: require("../assets/black33.png"),
    black75: require("../assets/black75.png"),
    red33: require("../assets/red33.png"),
    red75: require("../assets/red75.png"),
    green33: require("../assets/green33.png"),
    green75: require("../assets/green75.png"),
  };

  if (bottle !== null) {
    switch (appearence) {
      case "blonde":
        return (
          <Image
            style={styles.beer}
            source={is33 === true ? images.blonde33 : images.blonde75}
          ></Image>
        );
      case "amber":
        return (
          <Image
            style={styles.beer}
            source={is33 === true ? images.amber33 : images.amber75}
          ></Image>
        );
      case "brown":
        return (
          <Image
            style={styles.beer}
            source={is33 === true ? images.brown33 : images.brown75}
          ></Image>
        );
      case "black":
        return (
          <Image
            style={styles.beer}
            source={is33 === true ? images.black33 : images.black75}
          ></Image>
        );
      case "red":
        return (
          <Image
            style={styles.beer}
            source={is33 === true ? images.red33 : images.red75}
          ></Image>
        );
      case "green":
        return (
          <Image
            style={styles.beer}
            source={is33 === true ? images.green33 : images.green75}
          ></Image>
        );
      default:
        break;
    }
  }
};

const styles = StyleSheet.create({
  beer: {
    height: Dimensions.get("screen").height * 0.1,
    width: Dimensions.get("screen").height * 0.036,
  },
});
