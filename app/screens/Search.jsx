import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { darkBrown, cream } from "../data/utilities";
import Navbar from "./Navbar";
import CheckBox from "@react-native-community/checkbox";

// import { Oregano_400Regular } from "@expo-google-fonts/dev";

export default function Search({ navigation }) {
  const [checkBox33, setCheckBox33] = useState(false);
  const [checkBox75, setCheckBox75] = useState(false);
  const [blonde, setBlonde] = useState(false);
  const [amber, setAmber] = useState(false);
  const [brown, setBrown] = useState(false);
  const [black, setBlack] = useState(false);
  const [red, setRed] = useState(false);
  const [green, setGreen] = useState(false);

  const beerPressHandler = () => {
    navigation.pop();
    navigation.navigate("SideMenu");
  };
  const searchPressHandler = () => {
    navigation.pop();
    navigation.navigate("Search");
  };
  return (
    <View style={styles.container}>
      <Navbar
        beerPressHandler={beerPressHandler}
        searchPressHandler={searchPressHandler}
      />
      <View style={styles.sort}>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.text}
            autoCompleteType="name"
            blurOnSubmit={true}
            clearButtonMode="unless-editing"
            clearTextOnFocus={true}
            placeholder="Nome Birra"
          ></TextInput>
          <TextInput
            style={styles.text}
            autoCompleteType="name"
            blurOnSubmit={true}
            clearButtonMode="unless-editing"
            clearTextOnFocus={true}
            placeholder="Nome Birrificio"
          ></TextInput>
          <TextInput
            style={styles.text}
            autoCompleteType="tel"
            blurOnSubmit={true}
            clearButtonMode="unless-editing"
            clearTextOnFocus={true}
            placeholder="Gradazione Alcolica"
          ></TextInput>
          <Text style={styles.text}>Colore</Text>
          <View style={styles.colorCheckBox}>
            <CheckBox
              disabled={false}
              value={blonde}
              onValueChange={(newValue) => setBlonde(newValue)}
            />
            <CheckBox
              disabled={false}
              value={amber}
              onValueChange={(newValue) => setAmber(newValue)}
            />
            <CheckBox
              disabled={false}
              value={brown}
              onValueChange={(newValue) => setBrown(newValue)}
            />
            <CheckBox
              disabled={false}
              value={black}
              onValueChange={(newValue) => setBlack(newValue)}
            />
            <CheckBox
              disabled={false}
              value={red}
              onValueChange={(newValue) => setRed(newValue)}
            />
            <CheckBox
              disabled={false}
              value={green}
              onValueChange={(newValue) => setGreen(newValue)}
            />
          </View>
          <Text style={styles.text}>Bottiglia 33Cl 75Cl</Text>
          <View style={styles.bottleCheckBox}>
            <CheckBox
              disabled={false}
              value={checkBox33}
              onValueChange={(newValue) => setCheckBox33(newValue)}
            />
            <CheckBox
              disabled={false}
              value={checkBox75}
              onValueChange={(newValue) => setCheckBox75(newValue)}
            />
          </View>
        </View>
        <View style={styles.confirmOrDeny}>
          <Button title="Applica"></Button>
          <Button title="Reset Filtri" color="red"></Button>
        </View>
        <Image
          source={require("../assets/daPeppoBlack.png")}
          style={styles.peppoLogo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sort: {
    backgroundColor: cream,
    height: "88.85%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "60%",
  },
  text: {
    color: darkBrown,
    fontSize: Dimensions.get("screen").width * 0.05,
    width: "100%",
    height: Dimensions.get("screen").width * 0.12,
    padding: 10,
    borderWidth: 1.3,
    borderColor: darkBrown,
    marginBottom: 10,
  },
  confirmOrDeny: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  colorCheckBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  bottleCheckBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  peppoLogo: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").height * 0.2,
    borderRadius: 30,
  },
});
