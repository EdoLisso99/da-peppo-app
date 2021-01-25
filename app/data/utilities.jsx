import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

export const lightBrown = "#623D07";
export const cream = "#EDEAA2";

export const showBottle75 = (appearence, bottle) => {
  if (bottle !== null) {
    switch (appearence) {
      case "blonde":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/blonde75.png`)}
          ></Image>
        );
      case "amber":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/amber75.png`)}
          ></Image>
        );
      case "brown":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/brown75.png`)}
          ></Image>
        );
      case "black":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/black75.png`)}
          ></Image>
        );
      case "red":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/red75.png`)}
          ></Image>
        );
      case "green":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/green75.png`)}
          ></Image>
        );
      default:
        break;
    }
  }
};

export const showBottle33 = (appearence, bottle) => {
  if (bottle !== null) {
    switch (appearence) {
      case "blonde":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/blonde33.png`)}
          ></Image>
        );
      case "amber":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/amber33.png`)}
          ></Image>
        );
      case "brown":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/brown33.png`)}
          ></Image>
        );
      case "black":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/black33.png`)}
          ></Image>
        );
      case "red":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/red33.png`)}
          ></Image>
        );
      case "green":
        return (
          <Image
            style={styles.beer}
            source={require(`../assets/green33.png`)}
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
