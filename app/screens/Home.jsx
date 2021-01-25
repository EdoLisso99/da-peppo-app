import {
  Dimensions,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  useFonts,
  PurplePurse_400Regular,
  GloriaHallelujah_400Regular,
} from "@expo-google-fonts/dev";
import React from "react";
import * as utilities from "../data/utilities";
import AppLoading from "expo-app-loading";
import beerDB from "../data/beerDB.json";
import BeerList from "./BeerList";

export default function Home({ navigation }) {
  const sortPressHandler = () => {
    navigation.navigate("SortPage");
  };

  let beer = beerDB;
  let [fontsLoaded] = useFonts({
    PurplePurse_400Regular,
    GloriaHallelujah_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      // SafeAreaView avoid the notch on the top
      <SafeAreaView style={styles.parent}>
        <StatusBar
          backgroundColor={utilities.lightBrown}
          barStyle="light-content"
        />
        <View style={styles.navbar}>
          <Image
            style={styles.beer}
            source={require("../assets/beerMenu.png")}
          ></Image>
          <Text style={styles.navbarTitle}>Birre di Peppo</Text>
          <Image
            style={styles.search}
            source={require("../assets/searchIcon.png")}
          ></Image>
        </View>
        <TouchableOpacity
          onPress={sortPressHandler}
          style={styles.containerSort}
        >
          <Image
            source={require("../assets/descendingSort.png")}
            style={styles.sort}
            // onPress={sortPressHandler}
          ></Image>
        </TouchableOpacity>
        {/* Display all beers */}
        <FlatList
          data={beer}
          renderItem={({ item }) => <BeerList item={item} />}
          // The toString() function is needet to avoid an uncomfortable bug
          keyExtractor={(item) => item.key.toString()}
        ></FlatList>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: utilities.cream,
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    height: Dimensions.get("screen").height * 0.1,
    backgroundColor: utilities.lightBrown,
    justifyContent: "space-between",
    paddingLeft: "4%",
    paddingRight: "4%",
    alignItems: "center",
  },
  beer: {
    height: Dimensions.get("screen").height * 0.065,
    width: Dimensions.get("screen").height * 0.065,
  },
  search: {
    height: Dimensions.get("screen").height * 0.035,
    width: Dimensions.get("screen").height * 0.035,
  },
  navbarTitle: {
    color: utilities.cream,
    fontSize: Dimensions.get("screen").width * 0.088,
    fontWeight: "900",
    fontFamily: "PurplePurse_400Regular",
  },
  sort: {
    width: Dimensions.get("screen").height * 0.05,
    height: Dimensions.get("screen").height * 0.05,
  },
  containerSort: {
    // display: "flex",
    // justifyContent: "flex-end",
    position: "absolute",
    top: Dimensions.get("screen").height * 0.1 + 7,
    right: 7,
    zIndex: 3,
  },
});
