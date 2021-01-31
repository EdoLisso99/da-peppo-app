import React, { useState } from "react";
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
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CheckBox from "@react-native-community/checkbox";

export default function LogIn({ navigation }) {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const setDefaultValues = () => {
    setUsername("");
    setPassword("");
    setRememberMe(false);
    usernameRef.current.clear();
    passwordRef.current.clear();
  };

  const beerPressHandler = () => {
    navigation.pop();
    navigation.navigate("SideMenu");
  };

  const searchPressHandler = () => {
    navigation.pop();
    navigation.navigate("Search");
  };

  const signInPressHandler = () => {
    navigation.pop();
    navigation.navigate("SignIn");
  };

  const confirmHandler = () => {
    let flag = true;
    const usernameRegexp = /^[a-zA-Z0-9]+[a-zA-Z0-9]+[a-zA-Z0-9]+$/;
    const passwordRegexp = /^[!-~]+[!-~]+[!-~]+$/;
    if (username !== "" && !usernameRegexp.test(username)) {
      Alert.alert("ERRORE! \nUsername non valido!");
      flag = false;
      setDefaultValues();
    } else if (password !== "" && !passwordRegexp.test(password)) {
      Alert.alert("ERRORE! \nPassword non valida!");
      flag = false;
      setDefaultValues();
    } else if (username === "" || password === "") {
      Alert.alert("ERRORE! \nUno o più campi non sono stati compilati!");
      flag = false;
      setDefaultValues();
    } else if (flag) {
      Alert.alert("COMPLIMENTI, SAI DIGGITARE!!!");
      setDefaultValues();
      // navigation.pop();
      // navigation.navigate("Home", { beers: newDB });
    }
  };

  return (
    <View>
      <Navbar
        beerPressHandler={beerPressHandler}
        searchPressHandler={searchPressHandler}
      />
      <View style={styles.sort}>
        <ScrollView>
          <View style={styles.dataContainer}>
            <Text style={styles.title}>LogIn</Text>
            <View style={styles.textContainer}>
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
                onChangeText={(newPassword) => setPassword(newPassword)}
                ref={passwordRef}
                placeholder="Password"
                secureTextEntry={true}
              ></TextInput>
              <View style={styles.rememberCheckBox}>
                <CheckBox
                  disabled={false}
                  value={rememberMe}
                  onValueChange={(newValue) => setRememberMe(newValue)}
                ></CheckBox>
                <Text style={styles.normalText}>Ricordami</Text>
              </View>
            </View>
            <View style={styles.help}>
              <Text
                onPress={() => Alert.alert("Son cazzi tuoi!")}
                style={styles.normalText}
              >
                Hai dimenticato la password?
              </Text>
              <Text style={styles.normalText} onPress={signInPressHandler}>
                Vuoi creare un account?
              </Text>
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmHandler}
            >
              <Text style={styles.confirmText}>Conferma</Text>
            </TouchableOpacity>
            <Image
              source={require("../assets/daPeppoBlack.png")}
              style={styles.peppoLogo}
            />
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
    width: "100%",
    paddingTop: "5%",
  },
  sort: {
    backgroundColor: cream,
    height: "88.85%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  text: {
    color: darkBrown,
    fontSize: Dimensions.get("screen").width * 0.05,
    width: "60%",
    height: Dimensions.get("screen").width * 0.12,
    padding: 10,
    borderWidth: 1.3,
    borderColor: darkBrown,
    marginBottom: 10,
  },
  title: {
    fontSize: Dimensions.get("screen").width * 0.1,
    fontWeight: "700",
    color: darkBrown,
  },
  peppoLogo: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").height * 0.2,
    borderRadius: 30,
    marginTop: "15%",
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingTop: "5%",
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
    marginTop: "10%",
  },
  confirmText: {
    fontSize: Dimensions.get("screen").width * 0.05,
    color: "white",
  },
  rememberCheckBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  normalText: {
    fontSize: Dimensions.get("screen").width * 0.045,
    borderColor: darkBrown,
  },
  help: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "3%",
  },
});
