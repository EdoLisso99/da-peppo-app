import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { cream, lightBrown, darkBrown } from "../data/utilities";
import beerDB from "../data/beerDB.json";
import Navbar from "./Navbar";

export default function Account({ navigation }) {
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [emailFlag, setEmailFlag] = useState(false);
  const [username, setUsername] = useState("");
  const [username1, setUsername1] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const usernameRef = React.createRef();
  const usernameRef1 = React.createRef();
  const passwordRef = React.createRef();
  const emailRef = React.createRef();

  const beerPressHandler = () => {
    navigation.goBack();
  };

  const searchPressHandler = () => {
    navigation.pop();
    navigation.navigate("Search");
  };

  const passwordSubtitleHandler = () => {
    setPasswordFlag(!passwordFlag);
    setEmailFlag(false);
  };

  const emailSubtitleHandler = () => {
    setEmailFlag(!emailFlag);
    setPasswordFlag(false);
  };

  const confirmHandler = () => {};

  const logoHandler = () => {
    navigation.pop();
    navigation.navigate("Home", { beers: beerDB });
  };

  return (
    <View>
      <Navbar
        beerPressHandler={beerPressHandler}
        searchPressHandler={searchPressHandler}
        logoHandler={logoHandler}
      />
      <View style={styles.sort}>
        <ScrollView>
          <View style={styles.dataContainer}>
            <View style={styles.titleAndIcon}>
              <Image
                style={styles.settings}
                source={require("../assets/settings.png")}
              />
              <Text style={styles.title}>Account</Text>
            </View>
            <View style={styles.paragraph}>
              <Text style={styles.delete}>Elimina account</Text>
              <Text style={styles.reset}>Reset dati</Text>
              <Text style={styles.subtitle} onPress={passwordSubtitleHandler}>
                Ho dimenticato la password
              </Text>
              {passwordFlag && (
                <View style={styles.containers}>
                  <TextInput
                    style={styles.text}
                    autoCompleteType="off"
                    blurOnSubmit={true}
                    clearButtonMode="unless-editing"
                    clearTextOnFocus={true}
                    maxLength={40}
                    onChangeText={(newUsername) => setUsername(newUsername)}
                    ref={usernameRef}
                    placeholder="Username"
                  ></TextInput>
                  <TextInput
                    style={styles.text}
                    autoCompleteType="off"
                    blurOnSubmit={true}
                    clearButtonMode="unless-editing"
                    clearTextOnFocus={true}
                    maxLength={40}
                    onChangeText={(newEmail) => setEmail(newEmail)}
                    ref={emailRef}
                    placeholder="Email"
                  ></TextInput>
                </View>
              )}
            </View>
            <View style={styles.paragraph}>
              <Text style={styles.subtitle} onPress={emailSubtitleHandler}>
                Voglio cambiare l'indirizzo email
              </Text>
              {emailFlag && (
                <View style={styles.containers}>
                  <TextInput
                    style={styles.text}
                    autoCompleteType="off"
                    blurOnSubmit={true}
                    clearButtonMode="unless-editing"
                    clearTextOnFocus={true}
                    maxLength={40}
                    onChangeText={(newUsername) => setUsername1(newUsername)}
                    ref={usernameRef1}
                    placeholder="Username"
                  ></TextInput>
                  <TextInput
                    style={styles.text}
                    autoCompleteType="off"
                    blurOnSubmit={true}
                    clearButtonMode="unless-editing"
                    clearTextOnFocus={true}
                    maxLength={40}
                    onChangeText={(newPassword) => setPassword(newPassword)}
                    ref={passwordRef}
                    placeholder="Password"
                    secureTextEntry={true}
                  ></TextInput>
                </View>
              )}
            </View>
            <View style={styles.paragraph}>
              <TouchableHighlight
                style={styles.confirmButton}
                onPress={confirmHandler}
              >
                <Text style={styles.confirmText}>Conferma</Text>
              </TouchableHighlight>
            </View>
            <TouchableWithoutFeedback onPress={logoHandler}>
              <Image
                source={require("../assets/daPeppoBlack.png")}
                style={styles.peppoLogo}
              />
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dataContainer: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: "10%",
  },
  sort: {
    backgroundColor: cream,
    height: "88.85%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  settings: {
    width: Dimensions.get("screen").width * 0.1,
    height: Dimensions.get("screen").width * 0.1,
  },
  titleAndIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
  },
  title: {
    fontSize: Dimensions.get("screen").width * 0.1,
    fontWeight: "700",
    color: darkBrown,
  },
  paragraph: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  subtitle: {
    fontSize: Dimensions.get("screen").width * 0.062,
    fontWeight: "700",
    color: darkBrown,
    marginTop: "3%",
    textAlign: "center",
  },
  reset: {
    fontSize: Dimensions.get("screen").width * 0.055,
    fontWeight: "700",
    color: "#FF9900",
    marginTop: "3%",
    textAlign: "center",
  },
  delete: {
    fontSize: Dimensions.get("screen").width * 0.055,
    fontWeight: "700",
    color: "#FF1100",
    marginTop: "3%",
    textAlign: "center",
  },
  text: {
    color: darkBrown,
    fontSize: Dimensions.get("screen").width * 0.05,
    borderWidth: 1.3,
    borderColor: "black",
    height: Dimensions.get("screen").width * 0.12,
    padding: 10,
    borderWidth: 1.3,
    borderColor: darkBrown,
    marginBottom: 10,
    textAlign: "center",
  },
  confirmButton: {
    marginTop: "7%",
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
  containers: {
    marginTop: 10,
  },
  peppoLogo: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").height * 0.2,
    borderRadius: 30,
    marginTop: "8%",
    marginBottom: "2%",
  },
});
