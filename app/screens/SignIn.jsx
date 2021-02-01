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
import { database, auth } from "./firebase";

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const usernameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const confirmPasswordRef = React.createRef();

  const beerPressHandler = () => {
    navigation.pop();
    navigation.navigate("SideMenu");
  };

  const searchPressHandler = () => {
    navigation.pop();
    navigation.navigate("Search");
  };

  const setDefaultValues = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    usernameRef.current.clear();
    emailRef.current.clear();
    passwordRef.current.clear();
    confirmPasswordRef.current.clear();
  };

  //Firebase Functions
  const writeUserData = (username, email, password) => {
    database
      .ref("users/" + username)
      .set({ username: username, email: email, password: password });
  };

  const isUsernameAlreadyUsed = (flag) => {
    let usernamesInDB = database.ref("users/");
    usernamesInDB.once("value", (snapshot) => {
      const x = Object.entries(snapshot.val());
      x.map((item) => {
        if (item[0] === username) {
          flag = false;
        }
      });
    });
    return flag;
  };

  const confirmHandler = () => {
    let flag = true;
    const usernameRegexp = /^[a-zA-Z0-9]+[a-zA-Z0-9]+[a-zA-Z0-9]+$/;
    const passwordRegexp = /^[!-~]+[!-~]+[!-~]+[!-~]+[!-~]+[!-~]+$/;
    const emailRegexp = /^[!-?A-~]+[!-?A-~]+[!-?A-~]+[!-?A-~]+[!-?A-~]+[!-?A-~]+@[!-?A-~]+[!-?A-~]+[!-?A-~]+[!-?A-~]+.(it|com)$/;
    if (username !== "" && !usernameRegexp.test(username)) {
      alert("ERRORE! \nUsername non valido!");
      flag = false;
      setDefaultValues();
    } else if (email !== "" && !emailRegexp.test(email)) {
      alert("ERRORE! \nEmail non valida!");
      flag = false;
      setDefaultValues();
    } else if (password !== "" && !passwordRegexp.test(password)) {
      alert("ERRORE! \nPassword non valida!");
      flag = false;
      setDefaultValues();
    } else if (confirmPassword !== password) {
      alert("ERRORE! \nPassword di conferma non valida!");
      flag = false;
      setDefaultValues();
    } else if (!isUsernameAlreadyUsed(flag)) {
      alert("Errore! \nL'username esiste già!");
      setUsername("");
      usernameRef.current.clear();
    }
    /// else if (flag && ESISTE GIA' UN UTENTE CON QUESTO NOME/EMAIL){....}
    else if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPasswordRef === ""
    ) {
      alert("ERRORE! \nUno o più campi non sono stati compilati!");
      flag = false;
      setDefaultValues();
    } else if (flag) {
      //CONTROLLO CHE EFFETTIVAMENTE LE EMAIL ESISTANO
      try {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(() => this.props.navigation.navigate("Home"))
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              alert("Errore! L'email selezionata è già in uso");
              setEmail("");
              emailRef.current.clear();
            } else {
              console.log("Entrato nell'else!");
              console.log(error);
              // alert(error.message);
            }
          });
      } catch (err) {
        console.log("Entrato nel secondo Catch");
        console.log(err);
        alert(err);
      }

      //CONTROLLO  CRIPTAZIONE PASSWORD
      writeUserData(username, email, password);
      alert("Registrazione effettuata con successo!");
      setDefaultValues();
      navigation.pop();
      navigation.navigate("LogIn");
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
            <Text style={styles.title}>SignIn</Text>
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
                onChangeText={(newEmail) => setEmail(newEmail)}
                ref={emailRef}
                placeholder="Email"
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
              <TextInput
                style={styles.text}
                autoCompleteType="off"
                blurOnSubmit={true}
                clearButtonMode="unless-editing"
                clearTextOnFocus={true}
                maxLength={40}
                onChangeText={(newConfirmPassword) =>
                  setConfirmPassword(newConfirmPassword)
                }
                ref={confirmPasswordRef}
                placeholder="Confirm Password"
                secureTextEntry={true}
              ></TextInput>
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
    marginTop: "13%",
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
    marginTop: "7%",
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
