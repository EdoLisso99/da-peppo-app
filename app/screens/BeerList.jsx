import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import * as utilities from "../data/utilities";
import { auth, database } from "./firebase";
// import {
//   PurplePurse_400Regular,
//   GloriaHallelujah_400Regular,
// } from "@expo-google-fonts/dev";

export default function BeerList({ item }) {
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);
  const [heart, setHeart] = useState(false);
  const images = {
    starGray: require("../assets/starGray.png"),
    star: require("../assets/star.png"),
    heartGray: require("../assets/heartGray.png"),
    heart: require("../assets/heart.png"),
  };

  const showAll = () => {
    if (auth.currentUser !== null) {
      let dbRef = database.ref(
        "users/" + auth.currentUser.displayName + "/reviewed"
      );
      dbRef.once("value", (snapshot) => {
        let x = snapshot.val();
        if (x !== null) {
          if (utilities.isJustReviewed(x, item.key)) {
            setHeart(utilities.returnFavourite(x, item.key));
            setStar1(utilities.returnRating(x, item.key, 1));
            setStar2(utilities.returnRating(x, item.key, 2));
            setStar3(utilities.returnRating(x, item.key, 3));
            setStar4(utilities.returnRating(x, item.key, 4));
            setStar5(utilities.returnRating(x, item.key, 5));
          }
        }
      });
    } else {
    }
  };

  showAll();

  return (
    <View style={styles.list}>
      {utilities.showBottle(item.appearence, item.bottle33Price, true)}
      {utilities.showBottle(item.appearence, item.bottle75Price, false)}
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
          <Text style={styles.priceAndDegree}>{item.alcoholDegree}°</Text>
          <Image
            source={require("../assets/fullFlame.png")}
            style={styles.fullFlame}
          />
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

          {auth.currentUser && (
            <View style={styles.ratingsContainer}>
              <Image
                style={styles.heart}
                source={heart ? images.heart : images.heartGray}
              ></Image>
              <Image
                style={styles.star}
                source={star1 ? images.star : images.starGray}
              ></Image>
              <Image
                style={styles.star}
                source={star2 ? images.star : images.starGray}
              ></Image>
              <Image
                style={styles.star}
                source={star3 ? images.star : images.starGray}
              ></Image>
              <Image
                style={styles.star}
                source={star4 ? images.star : images.starGray}
              ></Image>
              <Image
                style={styles.star}
                source={star5 ? images.star : images.starGray}
              ></Image>
            </View>
          )}
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
    fontSize: Dimensions.get("screen").width * 0.055,
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
    justifyContent: "flex-start",
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
  ratingsContainer: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
  },
  fullFlame: {
    width: Dimensions.get("screen").width * 0.05,
    height: Dimensions.get("screen").width * 0.05,
    marginTop: "3%",
  },
});
