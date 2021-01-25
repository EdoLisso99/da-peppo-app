import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Sort() {
  return (
    <View>
      <Text style={styles.sort}>I AM SORT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sort: {
    backgroundColor: "red",
    height: "100%",
  },
});
