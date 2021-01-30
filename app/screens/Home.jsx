import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import {
  useFonts,
  PurplePurse_400Regular,
  GloriaHallelujah_400Regular,
} from "@expo-google-fonts/dev";
import React, { useState } from "react";
import { cream } from "../data/utilities";
import AppLoading from "expo-app-loading";
import beerDB from "../data/beerDB.json";
import BeerList from "./BeerList";
import Navbar from "./Navbar";

export default function Home({ navigation }) {
  let beer =
    navigation.getParam("beers") === undefined
      ? beerDB
      : navigation.getParam("beers");

  // console.log(navigation.getParam("beers"));

  const beerPressHandler = () => {
    navigation.pop();
    navigation.navigate("SideMenu");
  };

  const titlePressHandler = (item) => {
    navigation.pop();
    navigation.navigate("BeerDetails", {
      item: item,
    });
  };

  const searchPressHandler = () => {
    navigation.pop();
    navigation.navigate("Search");
  };

  const sortPressHandler = () => {
    navigation.pop();
    navigation.navigate("SortPage");
  };

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
        <Navbar
          beerPressHandler={beerPressHandler}
          searchPressHandler={searchPressHandler}
        />
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
          removeClippedSubviews={false}
          extraData={Math.random()}
          updateCellsBatchingPeriod={3750}
          initialNumToRender={1}
          maxToRenderPerBatch={3}
          renderItem={({ item }) => (
            <BeerList
              item={item}
              titlePressHandler={() => titlePressHandler(item)}
            />
          )}
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
    backgroundColor: cream,
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
