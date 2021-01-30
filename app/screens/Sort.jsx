import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { darkBrown, cream, lightBrown } from "../data/utilities";
import Navbar from "./Navbar";
import beerDB from "../data/beerDB.json";

// import { Oregano_400Regular } from "@expo-google-fonts/dev";
export default function Sort({ navigation }) {
  const [isAlcoholPressed, setIsAlcoholPressed] = useState(false);
  const [isCoinPressed, setIsCoinPressed] = useState(false);
  const [isRatingPressed, setIsRatingPressed] = useState(false);

  const beerPressHandler = () => {
    navigation.pop();
    navigation.navigate("SideMenu");
  };
  const searchPressHandler = () => {
    navigation.pop();
    navigation.navigate("Search");
  };

  const sortPerAlcoholAscend = () => {
    let beer = beerDB;
    for (let i = 0; i < beer.length - 1; i++) {
      for (let j = 0; j < beer.length - 1; j++) {
        if (beer[j].alcoholDegree > beer[j + 1].alcoholDegree) {
          let tmp = beer[j];
          beer[j] = beer[j + 1];
          beer[j + 1] = tmp;
        }
      }
    }
    //console.log("AlcoholAscend:", beer);
    return beer;
  };

  const sortPerAlcoholDesc = () => {
    let beer = beerDB;
    for (let i = 0; i < beer.length - 1; i++) {
      for (let j = 0; j < beer.length - 1; j++) {
        if (beer[j].alcoholDegree < beer[j + 1].alcoholDegree) {
          let tmp = beer[j];
          beer[j] = beer[j + 1];
          beer[j + 1] = tmp;
        }
      }
    }
    //console.log("AlcoholDescend:", beer);
    return beer;
  };

  const sortPerMoneyAscend = () => {
    let beer = beerDB;
    for (let i = 0; i < beer.length - 1; i++) {
      for (let j = 0; j < beer.length - 1; j++) {
        if (
          Math.max(beer[j].bottle33Price, beer[j].bottle75Price) >
          Math.max(beer[j + 1].bottle33Price, beer[j + 1].bottle75Price)
        ) {
          let tmp = beer[j];
          beer[j] = beer[j + 1];
          beer[j + 1] = tmp;
        }
      }
    }
    //console.log("MoneyAscend:", beer);
    return beer;
  };

  const sortPerMoneyDesc = () => {
    let beer = beerDB;
    for (let i = 0; i < beer.length - 1; i++) {
      for (let j = 0; j < beer.length - 1; j++) {
        if (
          Math.max(beer[j].bottle33Price, beer[j].bottle75Price) <
          Math.max(beer[j + 1].bottle33Price, beer[j + 1].bottle75Price)
        ) {
          let tmp = beer[j];
          beer[j] = beer[j + 1];
          beer[j + 1] = tmp;
        }
      }
    }
    //console.log("MoneyDescend:", beer);
    return beer;
  };

  const onAscendPressHandler = () => {
    if (isAlcoholPressed) {
      navigation.pop();
      let beers = sortPerAlcoholAscend();
      navigation.navigate("Home", { beers: beers });
    } else if (isCoinPressed) {
      navigation.pop();
      let beers = sortPerMoneyAscend();
      navigation.navigate("Home", { beers: beers });
    }
  };

  const onDescendPressHandler = () => {
    if (isAlcoholPressed) {
      navigation.pop();
      let beers = sortPerAlcoholDesc();
      navigation.navigate("Home", { beers: beers });
    } else if (isCoinPressed) {
      navigation.pop();
      let beers = sortPerMoneyDesc();
      navigation.navigate("Home", { beers: beers });
    }
  };

  return (
    <View>
      <Navbar
        beerPressHandler={beerPressHandler}
        searchPressHandler={searchPressHandler}
      />
      <View style={styles.sort}>
        <Text style={styles.text}>Ordina per:</Text>
        <View style={styles.line}>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsCoinPressed(true);
              setIsRatingPressed(false);
              setIsAlcoholPressed(false);
            }}
          >
            <Image
              source={require("../assets/money.png")}
              style={
                !isCoinPressed ? styles.squareIcon : styles.pressedItemSquare
              }
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsCoinPressed(false);
              setIsRatingPressed(true);
              setIsAlcoholPressed(false);
            }}
          >
            <Image
              source={require("../assets/ratingGrey.png")}
              style={
                !isRatingPressed ? styles.squareIcon : styles.pressedItemSquare
              }
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsCoinPressed(false);
              setIsRatingPressed(false);
              setIsAlcoholPressed(true);
            }}
          >
            <Image
              source={require("../assets/alcoholPercentage.png")}
              style={
                !isAlcoholPressed
                  ? styles.notSquareIcon
                  : styles.pressedItemNotSquare
              }
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.line}>
          {(isAlcoholPressed || isCoinPressed || isRatingPressed) && (
            <View style={styles.provax}>
              <TouchableWithoutFeedback onPress={onAscendPressHandler}>
                <Image
                  source={require("../assets/sortAscendingCream.png")}
                  style={styles.squareIcon}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={onDescendPressHandler}>
                <Image
                  source={require("../assets/sortDescendingCream.png")}
                  style={styles.squareIcon}
                />
              </TouchableWithoutFeedback>
            </View>
          )}
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
    justifyContent: "space-evenly",
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
    marginBottom: "20%",
  },
  pressedItemSquare: {
    height: Dimensions.get("screen").height * 0.1,
    width: Dimensions.get("screen").height * 0.1,
    backgroundColor: "#7C4E08",
  },
  pressedItemNotSquare: {
    height: Dimensions.get("screen").height * 0.1,
    width: Dimensions.get("screen").height * 0.1 * 0.606,
    backgroundColor: "#7C4E08",
  },
  provax: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    paddingVertical: "10%",
  },
});
