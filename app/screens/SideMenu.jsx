import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { darkBrown, cream } from "../data/utilities";
import Navbar from "./Navbar";
import { auth, database } from "./firebase";
import beerDB from "../data/beerDB.json";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// import { Oregano_400Regular } from "@expo-google-fonts/dev";

export default function SideMenu({ navigation }) {
  const signInPressHandler = () => {
    // navigation.pop();
    navigation.navigate("SignIn");
  };

  const beerPressHandler = () => {
    navigation.goBack();
  };

  const searchPressHandler = () => {
    navigation.pop();
    navigation.navigate("Search");
  };

  const logInPressHandler = () => {
    // navigation.pop();
    navigation.navigate("LogIn");
  };

  const signOutPress = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigation.navigate("Home", { beers: beerDB });
        alert("Logout effettuato con successo!");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        alert(error);
      });
  };

  const accountPress = () => {
    navigation.navigate("Account");
  };

  const recentPressHandler = () => {
    let tmp = [];
    if (auth.currentUser !== null) {
      let dbRef = database.ref(
        "users/" + auth.currentUser.displayName + "/recent"
      );
      dbRef.once("value", (snapshot) => {
        let x = snapshot.val();
        if (x !== null) {
          x.map((num) => {
            tmp = [...tmp, beerDB[num - 1]];
          });
        }
        navigation.pop();
        navigation.navigate("Home", { beers: tmp });
      });
    }
  };

  const alreadyEvaluatedHandler = () => {
    let tmp = [];
    if (auth.currentUser !== null) {
      let dbRef = database.ref(
        "users/" + auth.currentUser.displayName + "/reviewed"
      );
      dbRef.once("value", (snapshot) => {
        let x = snapshot.val();
        if (x !== null) {
          x.map((num) => {
            if (num.rating !== 0 && !num.heart) {
              tmp = [...tmp, beerDB[num.key - 1]];
            }
          });
        }

        navigation.pop();
        navigation.navigate("Home", { beers: tmp });
      });
    }
  };

  const favouritesHandler = () => {
    let tmp = [];
    if (auth.currentUser !== null) {
      let dbRef = database.ref(
        "users/" + auth.currentUser.displayName + "/reviewed"
      );
      dbRef.once("value", (snapshot) => {
        let x = snapshot.val();
        if (x !== null) {
          x.map((num) => {
            if (num.favourite) {
              tmp = [...tmp, beerDB[num.key - 1]];
            }
          });
        }
        navigation.navigate("Home", { beers: tmp });
      });
    }
  };

  const logoHandler = () => {
    navigation.pop();
    navigation.navigate("Home", { beers: beerDB });
  };

  return (
    <View>
      <Navbar
        beerPressHandler={beerPressHandler}
        searchPressHandler={searchPressHandler}
        logoHandler={logoHandler}
      />
      <View style={styles.sort}>
        {auth.currentUser && (
          <View style={styles.textContainer}>
            <Text style={styles.text} onPress={favouritesHandler}>
              Preferiti
            </Text>
            <Text style={styles.text} onPress={alreadyEvaluatedHandler}>
              Già Valutate
            </Text>
            <Text style={styles.text} onPress={recentPressHandler}>
              Recenti
            </Text>
            <Text style={styles.text} onPress={accountPress}>
              Account
            </Text>
            <Text style={styles.text} onPress={signOutPress}>
              Sign Out
            </Text>
          </View>
        )}
        {!auth.currentUser && (
          <View style={styles.textContainer}>
            <Text style={styles.text} onPress={signInPressHandler}>
              Sign in
            </Text>
            <Text style={styles.text} onPress={accountPress}>
              Account
            </Text>
            <Text style={styles.text} onPress={logInPressHandler}>
              Log in
            </Text>
          </View>
        )}
        <TouchableWithoutFeedback onPress={logoHandler}>
          <Image
            source={require("../assets/daPeppoWhite.png")}
            style={styles.peppoLogo}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sort: {
    backgroundColor: darkBrown,
    height: "88.85%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "60%",
  },
  peppoLogo: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").height * 0.2,
    marginBottom: "5%",
  },
  text: {
    fontSize: Dimensions.get("screen").width * 0.1,
    color: cream,
    fontWeight: "800",
  },
});
