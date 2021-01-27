import React from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Navbar from "./Navbar";
import { cream, lightBrown, darkBrown } from "../data/utilities";
import { TextInput } from "react-native-gesture-handler";

export default function SignIn({ navigation }) {
  // PROBLEMA CON LA TASTIERA, DA TENERE CONTO SE FACCIO UN EVENTUALE PASSAGGIO DA EXPO A CODICE NATIVO:
  // https://stackoverflow.com/questions/42840555/how-to-avoid-keyboard-pushing-layout-up-on-android-react-native
  // The problem here is that you have in your AndroidManifest.xml:
  // windowSoftInputMode="adjustResize";
  // Change it to:
  // windowSoftInputMode="adjustPan"

  const beerPressHandler = () => {
    navigation.pop();
    navigation.navigate("SideMenu");
  };
  return (
    <View>
      <Navbar beerPressHandler={beerPressHandler} />
      <View style={styles.container}>
        <Text style={styles.title}>SignIn</Text>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.text}
            autoCompleteType="username"
            blurOnSubmit={true}
            clearButtonMode="unless-editing"
            clearTextOnFocus={true}
            placeholder="Username"
          ></TextInput>
          <TextInput
            style={styles.text}
            autoCompleteType="email"
            blurOnSubmit={true}
            clearButtonMode="unless-editing"
            clearTextOnFocus={true}
            placeholder="Email"
          ></TextInput>
          <TextInput
            style={styles.text}
            autoCompleteType="password"
            blurOnSubmit={true}
            clearButtonMode="unless-editing"
            clearTextOnFocus={true}
            placeholder="Password"
            secureTextEntry={true}
          ></TextInput>
          <TextInput
            style={styles.text}
            autoCompleteType="password"
            blurOnSubmit={true}
            clearButtonMode="unless-editing"
            clearTextOnFocus={true}
            placeholder="Confirm Password"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => Alert.alert("Premuto il pulsante dio merda!")}
        >
          <Text style={styles.confirmText}>Conferma</Text>
        </TouchableOpacity>
        <Image
          source={require("../assets/daPeppoBlack.png")}
          style={styles.peppoLogo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: cream,
    color: lightBrown,
    height: "88.85%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: Dimensions.get("screen").width * 0.05,
    width: "100%",
    height: Dimensions.get("screen").width * 0.12,
    padding: 10,
    borderWidth: 1.3,
    borderColor: darkBrown,
    marginBottom: 10,
  },
  title: {
    fontSize: Dimensions.get("screen").width * 0.1,
  },
  peppoLogo: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").height * 0.2,
    borderRadius: 30,
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "60%",
  },
  confirmButton: {
    // width: "100%",
    // height: Dimensions.get("screen").width * 0.12,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: darkBrown,
    borderRadius: 15,
  },
  confirmText: {
    fontSize: Dimensions.get("screen").width * 0.05,
    color: "white",
  },
});
