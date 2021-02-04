import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { cream, lightBrown, darkBrown } from "../data/utilities";
import beerDB from "../data/beerDB.json";
import Navbar from "./Navbar";
import { auth, database, emailAuthProvider } from "./firebase";

export default function Account({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [changeEmail, setChangeEmail] = useState(true);
  const [password, setPassword] = useState("");
  let usernameRef = React.createRef();
  let emailRef = React.createRef();
  let passwordRef = React.createRef();

  const setDefaultValues = () => {
    if (auth.currentUser === null) {
      setUsername("");
      setEmail("");
      usernameRef.current.clear();
      emailRef.current.clear();
    } else {
      setEmail("");
      setPassword("");
      emailRef.current.clear();
      passwordRef.current.clear();
    }
  };

  const beerPressHandler = () => {
    navigation.goBack();
  };

  const searchPressHandler = () => {
    navigation.pop();
    navigation.navigate("Search");
  };

  const confirmHandler = () => {
    if (auth.currentUser === null) {
      let userExists = false;
      let aaa = database.ref("users/");
      aaa.once("value", (snapshot) => {
        const x = Object.entries(snapshot.val());
        x.map((obj) => {
          if (obj[0] === username) {
            userExists = true;
          }
        });
        if (userExists) {
          let usernamesInDB = database.ref("users/" + username);
          console.log(usernamesInDB);
          usernamesInDB.once("value", (snapshot) => {
            const x = Object.entries(snapshot.val());
            if (x.email === email) {
              auth
                .sendPasswordResetEmail(email)
                .then(() => {
                  let str = `Email inviata all'indirizzo ${email}`;
                  alert(str);
                  setDefaultValues();
                  navigation.navigate("Home");
                })
                .catch((error) => {
                  alert("Errore nel reset della password!");
                  console.log(error);
                });
            } else {
              alert(
                "Errore! L'username e/o l' email inserite sono errati o non corrispondono!"
              );
              setDefaultValues();
            }
          });
        } else {
          alert("Errore! non esiste nessun username con quel nome!");
        }
      });
    } else if (changeEmail) {
      let userDB = database.ref("users/" + auth.currentUser.displayName);
      userDB.once("value", (snapshot) => {
        const credentials = emailAuthProvider.credential(
          snapshot.child("email").val(),
          password
        );
        auth.currentUser
          .reauthenticateWithCredential(credentials)
          .then(function () {
            let usernamesInDB = database.ref("users/");
            usernamesInDB.once("value", (snapshot) => {
              let emailAlreadyExists,
                usernameAlreadyExists = false;
              const y = Object.entries(snapshot.val());
              y.map((item) => {
                if (item[1].email === email) {
                  emailAlreadyExists = true;
                }
                if (item[0] === auth.currentUser.displayName) {
                  usernameAlreadyExists = true;
                }
              });
              if (!emailAlreadyExists && usernameAlreadyExists) {
                // const x = snapshot.child(auth.currentUser.displayName).val();
                auth.currentUser
                  .updateEmail(email)
                  .then(() => {
                    userDB.update({ email: email });
                    alert("Email aggiornata correttamente!");
                    setDefaultValues();
                    navigation.navigate("Home");
                  })
                  .catch((error) => {
                    if (error.code === "auth/requires-recent-login") {
                    }
                    alert("Errore 1!");
                    console.log(error);
                  });
              } else {
                if (!usernameAlreadyExists) {
                  alert("Errore! L'username inserito non esiste!");
                  setUsername("");
                  usernameRef.current.clear();
                } else if (emailAlreadyExists) {
                  alert(
                    "Errore! L'indirizzo email immesso è già in uso da un'altro utente!"
                  );
                  setEmail("");
                  emailRef.current.clear();
                }
              }
            });
          })
          .catch(function (error) {
            if (error.code === "auth/user-mismatch") {
              alert(error.message);
              console.log(error);
            } else if (error.code === "auth/wrong-password") {
              alert("Errore! La password inserita è errata!");
              console.log(error);
            } else if (error.code === "auth/too-many-requests") {
              alert(
                "Errore! L'accesso a questo account è stato temporaneamente disabilitato a causa di troppi tentativi falliti di login. Puoi immediatamente ripristinarlo resettando la tua password o provando più tardi."
              );
              console.log(error);
            } else {
              alert("Errore nella ri-autenticazione!");
              console.log(error);
            }
          });
      });
    } else if (deleteAccount) {
      let userDB = database.ref("users/" + auth.currentUser.displayName);
      userDB.once("value", (snapshot) => {
        const credentials = emailAuthProvider.credential(
          snapshot.child("email").val(),
          password
        );
        auth.currentUser
          .reauthenticateWithCredential(credentials)
          .then(() => {
            auth.currentUser
              .delete()
              .then(() => {
                userDB.remove();
                // User deleted.
                alert("L'utente è stato eliminato correttamente!");
                auth
                  .signOut()
                  .then(() => {
                    // Sign-out successful.
                    navigation.navigate("Home", { beers: beerDB });
                  })
                  .catch((error) => {
                    // An error happened.
                    console.log(error);
                    alert(error);
                  });
              })
              .catch(function (error) {
                // An error happened.
                alert("Errore con l'eliminazione dell'utente!");
                console.log(error);
              });
          })
          .catch(function (error) {
            if (error.code === "auth/user-mismatch") {
              alert(error.message);
              console.log(error);
            } else if (error.code === "auth/wrong-password") {
              alert("Errore! La password inserita è errata!");
              console.log(error);
            } else if (error.code === "auth/too-many-requests") {
              alert(
                "Errore! L'accesso a questo account è stato temporaneamente disabilitato a causa di troppi tentativi falliti di login. Puoi immediatamente ripristinarlo resettando la tua password o provando più tardi."
              );
              console.log(error);
            } else {
              alert("Errore nella ri-autenticazione!");
              console.log(error);
            }
          });
      });
    }
  };

  const logoHandler = () => {
    navigation.pop();
    navigation.navigate("Home", { beers: beerDB });
  };

  const resetHandler = () => {
    if (auth.currentUser !== null) {
      database
        .ref("users/" + auth.currentUser.displayName + "/recent")
        .remove();
      database
        .ref("users/" + auth.currentUser.displayName + "/reviewed")
        .remove();
      alert("Dati rimossi correttamente!");
      navigation.navigate("Home", { beers: beerDB });
    }
  };

  const modifySubtitle = () => {
    setChangeEmail(!changeEmail);
    setDeleteAccount(!deleteAccount);
  };

  const checkInputFields = () => {
    const usernameRegexp = /^[a-zA-Z0-9]+[a-zA-Z0-9]+[a-zA-Z0-9]+$/;
    const passwordRegexp = /^[!-~]+[!-~]+[!-~]+[!-~]+[!-~]+[!-~]+$/;
    const emailRegexp = /^[!-?A-~]+[!-?A-~]+[!-?A-~]+[!-?A-~]+[!-?A-~]+[!-?A-~]+@[!-?A-~]+[!-?A-~]+[!-?A-~]+[!-?A-~]+.(it|com)$/;
    if (auth.currentUser === null) {
      if (username === "" || email === "") {
        alert("Errore! Ci sono uno o più campi vuoti!");
      } else if (!usernameRegexp.test(username) || !emailRegexp.test(email)) {
        alert(
          "Errore! I campi devono contenere username ed email (sintatticamente) validi!"
        );
        setDefaultValues();
      } else {
        confirmHandler();
      }
    } else {
      if (password === "" || email === "") {
        alert("Errore! Ci sono uno o più campi vuoti!");
      } else if (!passwordRegexp.test(password) || !emailRegexp.test(email)) {
        alert(
          "Errore! I campi devono contenere password ed email (sintatticamente) validi!"
        );
        setDefaultValues();
      } else {
        confirmHandler();
      }
    }
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
              {auth.currentUser !== null && (
                <View>
                  <TouchableOpacity onPress={resetHandler}>
                    <Text style={styles.reset}>Reset dati</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.paragraph}>
                {auth.currentUser === null && (
                  <Text style={styles.subtitleNull}>
                    Ho dimenticato la password
                  </Text>
                )}
                {auth.currentUser !== null && (
                  <View>
                    <Text
                      onPress={modifySubtitle}
                      style={
                        changeEmail ? styles.subtitleSelected : styles.subtitle
                      }
                    >
                      Voglio cambiare l'indirizzo email
                    </Text>
                    <Text
                      onPress={modifySubtitle}
                      style={
                        deleteAccount
                          ? styles.subtitleSelected
                          : styles.subtitle
                      }
                    >
                      Voglio eliminare l'account
                    </Text>
                  </View>
                )}

                <View style={styles.containers}>
                  {auth.currentUser === null && (
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
                  )}
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
                  {auth.currentUser !== null && (
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
                  )}
                </View>
              </View>
            </View>
            <View style={styles.confirmAndLogo}>
              <TouchableHighlight
                style={
                  auth.currentUser !== null
                    ? styles.confirmButton
                    : styles.confirmButtonNull
                }
                onPress={checkInputFields}
              >
                <Text style={styles.confirmText}>Conferma</Text>
              </TouchableHighlight>

              <TouchableWithoutFeedback onPress={logoHandler}>
                <Image
                  source={require("../assets/daPeppoBlack.png")}
                  style={
                    auth.currentUser !== null
                      ? styles.peppoLogo
                      : styles.peppoLogoNull
                  }
                />
              </TouchableWithoutFeedback>
            </View>
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
  },
  sort: {
    backgroundColor: cream,
    height: "88.85%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
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
  confirmAndLogo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  subtitle: {
    fontSize: Dimensions.get("screen").width * 0.06,
    fontWeight: "700",
    color: darkBrown,
    textAlign: "center",
    marginTop: "3%",
  },
  subtitleSelected: {
    fontSize: Dimensions.get("screen").width * 0.06,
    fontWeight: "700",
    color: "red",
    marginTop: "3%",
    textAlign: "center",
  },
  subtitleNull: {
    fontSize: Dimensions.get("screen").width * 0.06,
    fontWeight: "700",
    color: darkBrown,
    marginVertical: "5%",
    textAlign: "center",
  },
  reset: {
    fontSize: Dimensions.get("screen").width * 0.07,
    fontWeight: "700",
    color: "#FF9900",
    marginTop: "2%",
    textAlign: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  text: {
    color: darkBrown,
    fontSize: Dimensions.get("screen").width * 0.05,
    borderWidth: 1.3,
    borderColor: "black",
    height: Dimensions.get("screen").width * 0.12,
    borderWidth: 1.3,
    borderColor: darkBrown,
    marginBottom: 5,
    textAlign: "center",
    marginTop: "3%",
  },
  confirmButton: {
    marginTop: "5%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: darkBrown,
    borderRadius: 15,
  },
  confirmButtonNull: {
    marginTop: "20%",
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
    minWidth: "60%",
    maxWidth: "60%",
  },
  peppoLogo: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").height * 0.2,
    borderRadius: 30,
    marginTop: "12%",
    // marginBottom: "2%",
  },
  peppoLogoNull: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").height * 0.2,
    borderRadius: 30,
    marginTop: "25%",
    marginBottom: "5%",
  },
});
