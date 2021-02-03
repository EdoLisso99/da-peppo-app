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
import BeerList from "./BeerList";
import Navbar from "./Navbar";

export default function Home({ route, navigation }) {
  const { beers } = route.params;

  const beerPressHandler = () => {
    navigation.navigate("SideMenu");
  };

  const titlePressHandler = (item) => {
    navigation.navigate("BeerDetails", {
      item: item,
    });
  };

  const searchPressHandler = () => {
    navigation.navigate("Search");
  };

  const sortPressHandler = () => {
    navigation.navigate("Sort", { beer: beers });
  };

  const logoHandler = () => {
    navigation.navigate("Home");
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
          logoHandler={logoHandler}
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
          data={beers}
          removeClippedSubviews={false}
          extraData={Math.random()}
          updateCellsBatchingPeriod={1750}
          initialNumToRender={7}
          maxToRenderPerBatch={15}
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
