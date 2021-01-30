import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Navbar from "./Navbar";
import { cream, darkBrown, lightBrown } from "../data/utilities";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import breweryDB from "../data/breweryDB.json";

export default function BeerDetails({ navigation }) {
  let [flag, setFlag] = useState(false);
  let brewery = breweryDB;
  const { item } = route.params;
  const degrees = item.alcoholDegree;
  let secondLine = degrees > 7 ? true : false;
  let fullFlames = degrees % 7;
  let halfFlame = Math.round((fullFlames % 1) * 10) / 10 === 0 ? false : true;
  fullFlames = Math.floor(fullFlames);
  if (degrees == 14) {
    secondLine = true;
    fullFlames = 7;
    halfFlame = false;
  }
  if (degrees == 7) {
    secondLine = false;
    fullFlames = 7;
    halfFlame = false;
  }

  const images = {
    blonde: require("../assets/blondeBig.png"),
    amber: require("../assets/amberBig.png"),
    brown: require("../assets/brownBig.png"),
    black: require("../assets/blackBig.png"),
    red: require("../assets/redBig.png"),
    green: require("../assets/greenBig.png"),
  };

  const getBreweryDescription = (breweryRef) => {
    let x = "";
    brewery.map((brew) => {
      if (brew.breweryName === breweryRef) {
        x = brew.breweryDescription;
      }
    });
    return x;
  };

  const beerPressHandler = () => {
    navigation.pop();
    navigation.navigate("SideMenu");
  };

  const searchPressHandler = () => {
    navigation.pop();
    navigation.navigate("Search");
  };

  return (
    <View>
      <Navbar
        beerPressHandler={beerPressHandler}
        searchPressHandler={searchPressHandler}
      />
      <View style={styles.container}>
        <View style={styles.imageAndText}>
          <Image
            source={
              item.appearence === "blonde"
                ? images.blonde
                : item.appearence === "amber"
                ? images.amber
                : item.appearence === "brown"
                ? images.brown
                : item.appearence === "black"
                ? images.black
                : item.appearence === "red"
                ? images.red
                : item.appearence === "green"
                ? images.green
                : images.blonde
            }
            style={styles.beer}
          />
          <View style={styles.textAndRating}>
            <Text
              style={
                item.beerName.length <= 17
                  ? styles.beerTitle
                  : styles.beerTitleSmall
              }
            >
              {item.beerName}
            </Text>
            {/* row 1 flames */}
            <View style={styles.flames}>
              {/* row 1 Full flames */}
              <View style={styles.flames}>
                {!secondLine &&
                  [...Array(fullFlames)].map((elementInArray, index) => (
                    <Image
                      source={require("../assets/fullFlame.png")}
                      style={styles.fullFlame}
                      key={index}
                    />
                  ))}
                {secondLine &&
                  [...Array(7)].map((elementInArray, index) => (
                    <Image
                      source={require("../assets/fullFlame.png")}
                      style={styles.fullFlame}
                      key={index}
                    />
                  ))}
              </View>
              {/* row 1 half flames */}
              {!secondLine && halfFlame && (
                <View style={styles.flames}>
                  <Image
                    source={require("../assets/halfFlame.png")}
                    style={styles.halfFlame}
                  />
                </View>
              )}
            </View>
            {/* row 2 flames */}
            <View style={styles.flames}>
              {/* row 2 Full flames */}
              {secondLine && (
                <View style={styles.flames}>
                  {[...Array(fullFlames)].map((elementInArray, index) => (
                    <Image
                      source={require("../assets/fullFlame.png")}
                      style={styles.fullFlame}
                      key={index}
                    />
                  ))}
                </View>
              )}
              {/* row 2 half flames */}
              {secondLine && halfFlame && (
                <View style={styles.flames}>
                  <Image
                    source={require("../assets/halfFlame.png")}
                    style={styles.halfFlame}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        <Text style={styles.price}>
          Prezzo:<Text> </Text>
          <Text style={styles.priceSmall}>
            {item.bottle33Price !== null ? "33" : ""}
            {item.bottle33Price !== null && item.bottle75Price !== null
              ? "/"
              : ""}
            {item.bottle75Price !== null ? "75" : ""} Cl
          </Text>
          <Text> </Text>
          {item.bottle33Price !== null ? `${item.bottle33Price}€` : ""}
          {item.bottle33Price !== null && item.bottle75Price !== null
            ? "-"
            : ""}
          {item.bottle75Price !== null ? `${item.bottle75Price}€` : ""}
        </Text>
        <View style={styles.descriptionContainer}>
          {!flag && (
            <ScrollView>
              <Text style={styles.beerDescription}>
                <Text style={styles.brewery}>Birra: </Text>
                {item.beerDescription}
                <TouchableOpacity onPress={() => setFlag(true)}>
                  <Image
                    source={require("../assets/infoPoint.png")}
                    style={styles.infoPoint}
                  />
                </TouchableOpacity>
              </Text>
            </ScrollView>
          )}
          {flag && (
            <ScrollView>
              <Text style={styles.beerDescription}>
                <Text style={styles.brewery}>
                  Birreria {item.breweryName}:{" "}
                </Text>
                {getBreweryDescription(item.breweryName)}
                <TouchableOpacity onPress={() => setFlag(false)}>
                  <Image
                    source={require("../assets/returnArrow.png")}
                    style={styles.returnArrow}
                  />
                </TouchableOpacity>
              </Text>
            </ScrollView>
          )}
        </View>
        <View style={styles.ratings}>
          <Image
            source={require("../assets/starGray.png")}
            style={styles.star}
          />
          <Image
            source={require("../assets/starGray.png")}
            style={styles.star}
          />
          <Image
            source={require("../assets/starGray.png")}
            style={styles.star}
          />
          <Image
            source={require("../assets/starGray.png")}
            style={styles.star}
          />
          <Image
            source={require("../assets/starGray.png")}
            style={styles.star}
          />
          <Image
            source={require("../assets/heartGray.png")}
            style={styles.heart}
          />
        </View>
        <View style={styles.ratings}>
          <Image
            source={require("../assets/checkGray.png")}
            style={styles.confirmAndRefuse}
          />
          <Image
            source={require("../assets/removeGray.png")}
            style={styles.confirmAndRefuse}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: cream,
    color: lightBrown,
    height: "88.85%",
    paddingBottom: "10%",
  },
  beer: {
    width: Dimensions.get("screen").width * 0.3,
    height: Dimensions.get("screen").width * 0.3,
  },
  imageAndText: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5%",
  },
  flames: {
    display: "flex",
    flexDirection: "row",
  },
  textAndRating: {
    display: "flex",
    flexDirection: "column",
  },
  fullFlame: {
    width: Dimensions.get("screen").width * 0.095,
    height: Dimensions.get("screen").width * 0.095,
  },
  halfFlame: {
    width: Dimensions.get("screen").width * 0.095 * 0.6835,
    height: Dimensions.get("screen").width * 0.095,
  },
  beerTitle: {
    color: lightBrown,
    fontSize: Dimensions.get("screen").width * 0.08,
    fontWeight: "700",
  },
  beerTitleSmall: {
    color: lightBrown,
    fontSize: Dimensions.get("screen").width * 0.065,
    fontWeight: "700",
  },
  price: {
    fontSize: Dimensions.get("screen").width * 0.065,
    color: lightBrown,
    fontWeight: "700",
    textAlign: "center",
  },
  priceSmall: {
    fontSize: Dimensions.get("screen").width * 0.035,
    color: lightBrown,
    fontWeight: "600",
  },
  beerDescription: {
    fontSize: Dimensions.get("screen").width * 0.045,
    color: darkBrown,
    fontWeight: "600",
    padding: "3%",
  },
  infoPoint: {
    width: Dimensions.get("screen").width * 0.045,
    height: Dimensions.get("screen").width * 0.045,
  },
  returnArrow: {
    width: (Dimensions.get("screen").width * 0.05) / 1.162,
    height: Dimensions.get("screen").width * 0.05,
  },
  brewery: {
    color: darkBrown,
    fontWeight: "700",
  },
  ratings: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: "5%",
  },
  star: {
    width: Dimensions.get("screen").width * 0.1,
    height: Dimensions.get("screen").width * 0.1,
  },
  heart: {
    width: Dimensions.get("screen").width * 0.1,
    height: Dimensions.get("screen").width * 0.1 * 0.89,
  },
  confirmAndRefuse: {
    width: Dimensions.get("screen").width * 0.15,
    height: Dimensions.get("screen").width * 0.15,
  },
  descriptionContainer: {
    height: "50%",
    padding: "3%",
    paddingBottom: "-2%",
    // borderWidth: 2,
    // borderColor: "red",
  },
});
