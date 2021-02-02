import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Navbar from "./Navbar";
import {
  cream,
  darkBrown,
  lightBrown,
  returnFavourite,
  returnRating,
  isJustReviewed,
} from "../data/utilities";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { auth, database } from "./firebase";
import breweryDB from "../data/breweryDB.json";

export default function BeerDetails({ navigation, route }) {
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);
  const [heart, setHeart] = useState(false);
  const [starPressedOnce, setStarPressedOnce] = useState(false);
  const [heartPressedOnce, setHeartPressedOnce] = useState(false);

  const [starDB1, setStarDB1] = useState(false);
  const [starDB2, setStarDB2] = useState(false);
  const [starDB3, setStarDB3] = useState(false);
  const [starDB4, setStarDB4] = useState(false);
  const [starDB5, setStarDB5] = useState(false);
  const [heartDB, setHeartDB] = useState(false);

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
    starGray: require("../assets/starGray.png"),
    star: require("../assets/star.png"),
    heartGray: require("../assets/heartGray.png"),
    heart: require("../assets/heart.png"),
    checkGray: require("../assets/checkGray.png"),
    check: require("../assets/check.png"),
    remove: require("../assets/remove.png"),
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

  const checkRecentDuplicates = (array, element) => {
    let duplicate = false;
    array.map((genericElement) => {
      if (genericElement === element) {
        duplicate = true;
      }
    });
    return duplicate;
  };

  const addRecent = () => {
    if (auth.currentUser !== null) {
      let dbRef = database.ref("users/" + auth.currentUser.displayName);
      dbRef.once("value", (snapshot) => {
        let x = snapshot.child("recent").val();
        //X non è vuoto
        if (x !== null) {
          //Controllo di non star aggiungendo un duplicato
          if (!checkRecentDuplicates(x, item.key)) {
            //X è composto da un solo elemento
            if (typeof x === "number") {
              dbRef.update({ recent: [x, item.key] });
            } //X è composto da più elementi
            else {
              //Lunghezza di x sfora il limite
              if (x.length >= 30) {
                x.shift();
                let y = [...x, item.key];
                dbRef.update({ recent: y });
              }
              //Lunghezza di x non sfora il limite
              else {
                let y = [...x, item.key];
                dbRef.update({ recent: y });
              }
            }
          }
        }
        //X è vuoto
        else {
          dbRef.update({ recent: { 0: item.key } });
        }
      });
    }
  };

  addRecent();

  const starPressHandler = (starNum) => {
    setStarPressedOnce(true);
    switch (starNum) {
      case 1:
        setStar1(true);
        setStar2(false);
        setStar3(false);
        setStar4(false);
        setStar5(false);
        break;
      case 2:
        setStar1(true);
        setStar2(true);
        setStar3(false);
        setStar4(false);
        setStar5(false);
        break;
      case 3:
        setStar1(true);
        setStar2(true);
        setStar3(true);
        setStar4(false);
        setStar5(false);
        break;
      case 4:
        setStar1(true);
        setStar2(true);
        setStar3(true);
        setStar4(true);
        setStar5(false);
        break;
      case 5:
        setStar1(true);
        setStar2(true);
        setStar3(true);
        setStar4(true);
        setStar5(true);
        break;
      case 6:
        setStar1(false);
        setStar2(false);
        setStar3(false);
        setStar4(false);
        setStar5(false);
        setHeart(false);
        break;
      default:
        setStar1(false);
        setStar2(false);
        setStar3(false);
        setStar4(false);
        setStar5(false);
        break;
    }
  };

  const heartPressHandler = () => {
    setHeartPressedOnce(true);
    setHeart(!heart);
  };

  const getTotalRating = () => {
    if (star5) {
      return 5;
    } else if (star4) {
      return 4;
    } else if (star3) {
      return 3;
    } else if (star2) {
      return 2;
    } else if (star1) {
      return 1;
    } else {
      return 0;
    }
  };

  const checkReviewedDuplicates = (array, element) => {
    let duplicate = false;
    array.map((genericElement) => {
      if (genericElement.key === element) {
        duplicate = true;
      }
    });
    return duplicate;
  };

  const getReviewedDuplicateIndex = (array, element) => {
    let duplicate = -1;
    let i = 0;
    array.map((genericElement) => {
      if (genericElement.key === element) {
        duplicate = i;
      }
      i++;
    });
    return duplicate;
  };

  const confirmPressHandler = () => {
    if (auth.currentUser !== null && (heart || getTotalRating() !== 0)) {
      //Controllo di aver effettivamente selezionato qualcosa
      let dbRef = database.ref("users/" + auth.currentUser.displayName);
      dbRef.once("value", (snapshot) => {
        let x = snapshot.child("reviewed").val();
        //X non è vuoto
        if (x !== null) {
          //Controllo di non star aggiungendo un duplicato
          if (!checkReviewedDuplicates(x, item.key)) {
            //X è composto da più elementi
            //Lunghezza di x sfora il limite
            if (x.length >= 30) {
              x.shift();
              let y = [
                ...x,
                { favourite: heart, rating: getTotalRating(), key: item.key },
              ];
              dbRef.update({ reviewed: y });
            }
            //Lunghezza di x non sfora il limite
            else {
              let y = [
                ...x,
                { favourite: heart, rating: getTotalRating(), key: item.key },
              ];
              dbRef.update({ reviewed: y });
            }
          } else {
            let tmp = database.ref(
              "users/" +
                auth.currentUser.displayName +
                "/reviewed/" +
                getReviewedDuplicateIndex(x, item.key)
            );
            tmp.update({
              favourite: heart,
              rating: getTotalRating(),
              key: item.key,
            });
          }
        }
        //X è vuoto
        else {
          dbRef.update({
            reviewed: {
              0: { favourite: heart, rating: getTotalRating(), key: item.key },
            },
          });
        }
      });
    }
    navigation.goBack();
  };

  const showAll = () => {
    if (auth.currentUser !== null) {
      let dbRef = database.ref(
        "users/" + auth.currentUser.displayName + "/reviewed"
      );
      dbRef.once("value", (snapshot) => {
        let x = snapshot.val();
        if (x !== null) {
          if (isJustReviewed(x, item.key)) {
            setHeartDB(returnFavourite(x, item.key));
            setStarDB1(returnRating(x, item.key, 1));
            setStarDB2(returnRating(x, item.key, 2));
            setStarDB3(returnRating(x, item.key, 3));
            setStarDB4(returnRating(x, item.key, 4));
            setStarDB5(returnRating(x, item.key, 5));
          }
        }
      });
    }
  };

  showAll();

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
                item.beerName.length < 17
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
                <Text style={styles.brewery}>
                  Birra {item.beerName.replace("\n", "")}:{" "}
                </Text>
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
        {auth.currentUser && (
          <View style={styles.ratings}>
            <TouchableWithoutFeedback onPress={() => starPressHandler(1)}>
              <Image
                source={
                  !starPressedOnce && starDB1
                    ? images.star
                    : !starPressedOnce && !starDB1
                    ? images.starGray
                    : starPressedOnce && star1
                    ? images.star
                    : starPressedOnce && star1
                    ? images.starGray
                    : images.starGray
                }
                style={styles.star}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => starPressHandler(2)}>
              <Image
                source={
                  !starPressedOnce && starDB2
                    ? images.star
                    : !starPressedOnce && !starDB2
                    ? images.starGray
                    : starPressedOnce && star2
                    ? images.star
                    : starPressedOnce && star2
                    ? images.starGray
                    : images.starGray
                }
                style={styles.star}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => starPressHandler(3)}>
              <Image
                source={
                  !starPressedOnce && starDB3
                    ? images.star
                    : !starPressedOnce && !starDB3
                    ? images.starGray
                    : starPressedOnce && star3
                    ? images.star
                    : starPressedOnce && star3
                    ? images.starGray
                    : images.starGray
                }
                style={styles.star}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => starPressHandler(4)}>
              <Image
                source={
                  !starPressedOnce && starDB4
                    ? images.star
                    : !starPressedOnce && !starDB4
                    ? images.starGray
                    : starPressedOnce && star4
                    ? images.star
                    : starPressedOnce && star4
                    ? images.starGray
                    : images.starGray
                }
                style={styles.star}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => starPressHandler(5)}>
              <Image
                source={
                  !starPressedOnce && starDB5
                    ? images.star
                    : !starPressedOnce && !starDB5
                    ? images.starGray
                    : starPressedOnce && star5
                    ? images.star
                    : starPressedOnce && star5
                    ? images.starGray
                    : images.starGray
                }
                style={styles.star}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={heartPressHandler}>
              <Image
                source={
                  !heartPressedOnce && heartDB
                    ? images.heart
                    : !heartPressedOnce && !heartDB
                    ? images.heartGray
                    : heartPressedOnce && heart
                    ? images.heart
                    : heartPressedOnce && heart
                    ? images.heartGray
                    : images.heartGray
                }
                style={styles.heart}
              />
            </TouchableWithoutFeedback>
          </View>
        )}

        {!auth.currentUser && (
          <View style={styles.ratings}>
            <Image source={images.starGray} style={styles.star} />
            <Image source={images.starGray} style={styles.star} />
            <Image source={images.starGray} style={styles.star} />
            <Image source={images.starGray} style={styles.star} />
            <Image source={images.starGray} style={styles.star} />
            <Image source={images.heartGray} style={styles.heart} />
          </View>
        )}
        <View style={styles.ratings}>
          <TouchableWithoutFeedback onPress={confirmPressHandler}>
            <Image
              source={
                auth.currentUser !== null ? images.check : images.checkGray
              }
              style={styles.confirmAndRefuse}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => starPressHandler(6)}>
            <Image source={images.remove} style={styles.confirmAndRefuse} />
          </TouchableWithoutFeedback>
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
    height: Dimensions.get("screen").width * 0.1 * 0.9,
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
