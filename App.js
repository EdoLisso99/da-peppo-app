import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./app/screens/Home";
import Sort from "./app/screens/Sort";
import SideMenu from "./app/screens/SideMenu";
import SignIn from "./app/screens/SignIn";
import BeerDetails from "./app/screens/BeerDetails";
import Search from "./app/screens/Search";
import LogIn from "./app/screens/LogIn";
import Settings from "./app/screens/Settings";
import beerDB from "./app/data/beerDB.json";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.home}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
            initialParams={{ beers: beerDB }}
          />
          <Stack.Screen
            name="Sort"
            component={Sort}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SideMenu"
            component={SideMenu}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BeerDetails"
            component={BeerDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    width: "100%",
    height: "100%",
  },
});
