import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Navigator from "./app/routes/homeStack";

export default function App() {
  return (
    <View style={styles.home}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    width: "100%",
    height: "100%",
  },
});
