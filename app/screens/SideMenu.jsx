import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { darkBrown, cream } from "../data/utilities";
import Navbar from "./Navbar";
// import { Oregano_400Regular } from "@expo-google-fonts/dev";

export default function SideMenu({ navigation }) {
  const beerPressHandler = () => {
    navigation.pop();
    navigation.navigate("SideMenu");
  };

  const signInPressHandler = () => {
    navigation.pop();
    navigation.navigate("SignIn");
  };

  return (
    <View>
      <Navbar beerPressHandler={beerPressHandler} />
      <View style={styles.sort}>
        <Text style={styles.text}>Birre recenti</Text>
        <Text style={styles.text} onPress={signInPressHandler}>
          Sign in
        </Text>
        <Text style={styles.text}>Log in</Text>
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  peppoLogo: {
    marginTop: "20%",
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").height * 0.2,
  },
  text: {
    fontSize: Dimensions.get("screen").width * 0.1,
    color: cream,
    fontWeight: "800",
    paddingTop: "10%",
    paddingBottom: "5%",
  },
});
