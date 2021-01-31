import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { darkBrown, cream } from "../data/utilities";
import Navbar from "./Navbar";

// import { Oregano_400Regular } from "@expo-google-fonts/dev";

export default function SideMenu({ navigation }) {
  const [isLogged, setIsLogged] = useState(false);
  const beerPressHandler = () => {
    navigation.goBack();
  };

  const signInPressHandler = () => {
    // navigation.pop();
    navigation.navigate("SignIn");
  };

  const searchPressHandler = () => {
    navigation.pop();
    navigation.navigate("Search");
  };

  const logInPressHandler = () => {
    // navigation.pop();
    navigation.navigate("LogIn");
  };

  return (
    <View>
      <Navbar
        beerPressHandler={beerPressHandler}
        searchPressHandler={searchPressHandler}
      />
      <View style={styles.sort}>
        {isLogged && (
          <View style={styles.textContainer}>
            <Text style={styles.text}>Preferiti</Text>
            <Text style={styles.text}>Già Valutate</Text>
            <Text style={styles.text}>Recenti</Text>
            <Text style={styles.text}>Account</Text>
            <Text style={styles.text}>Sign Out</Text>
          </View>
        )}
        {!isLogged && (
          <View style={styles.textContainer}>
            <Text style={styles.text} onPress={signInPressHandler}>
              Sign in
            </Text>
            <Text style={styles.text} onPress={logInPressHandler}>
              Log in
            </Text>
          </View>
        )}
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
