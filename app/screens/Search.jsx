import React, { useState } from "react";
import {
  Alert,
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
import beerDB from "../data/beerDB.json";

// import { Oregano_400Regular } from "@expo-google-fonts/dev";

export default function Search({ navigation }) {
  const beerNameRef = React.createRef();
  const breweryNameRef = React.createRef();
  const minAlcoholDegreeRef = React.createRef();
  const [beerName, setBeerName] = useState("");
  const [breweryName, setBreweryName] = useState("");
  const [minAlcoholDegree, setMinAlcoholDegree] = useState(0);
  const [checkBox33, setCheckBox33] = useState(false);
  const [checkBox75, setCheckBox75] = useState(false);
  const [blonde, setBlonde] = useState(false);
  const [amber, setAmber] = useState(false);
  const [brown, setBrown] = useState(false);
  const [black, setBlack] = useState(false);
  const [red, setRed] = useState(false);
  const [green, setGreen] = useState(false);

  const setDefaultValues = () => {
    setBeerName("");
    setBreweryName("");
    setMinAlcoholDegree(0);
    setCheckBox33(false);
    setCheckBox75(false);
    setBlonde(false);
    setAmber(false);
    setBrown(false);
    setBlack(false);
    setRed(false);
    setGreen(false);
    beerNameRef.current.clear();
    breweryNameRef.current.clear();
    minAlcoholDegreeRef.current.clear();
  };

  const beerPressHandler = () => {
    navigation.pop();
    navigation.navigate("SideMenu");
  };
  const searchPressHandler = () => {
    navigation.pop();
    navigation.navigate("Search");
  };

  const returnCase = () => {
    let f1 = beerName === "" ? 0 : 16;
    let f2 = breweryName === "" ? 0 : 8;
    let f3 = minAlcoholDegree === 0 ? 0 : 4;
    let f4 =
      blonde === false &&
      amber === false &&
      brown === false &&
      black === false &&
      green === false &&
      red === false
        ? 0
        : 2;
    let f5 = checkBox33 === false && checkBox75 === false ? 0 : 1;
    return f1 + f2 + f3 + f4 + f5;
  };

  const searchInDB = () => {
    let caso = returnCase();
    let beer = beerDB;
    let storeArray = [];
    switch (caso) {
      case 0:
        return beerDB;
      case 1:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true && beer[i].bottle33Price !== null) ||
            (checkBox75 === true && beer[i].bottle75Price !== null)
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 2:
        for (let i = 0; i < beer.length; i++) {
          if (
            (blonde === true && beer[i].appearence === "blonde") ||
            (amber === true && beer[i].appearence === "amber") ||
            (brown === true && beer[i].appearence === "brown") ||
            (black === true && beer[i].appearence === "black") ||
            (red === true && beer[i].appearence === "red") ||
            (green === true && beer[i].appearence === "green")
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 3:
        for (let i = 0; i < beer.length; i++) {
          if (
            (blonde === true &&
              beer[i].appearence === "blonde" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null) ||
            (blonde === true &&
              beer[i].appearence === "blonde" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null) ||
            (amber === true &&
              beer[i].appearence === "amber" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null) ||
            (amber === true &&
              beer[i].appearence === "amber" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null) ||
            (brown === true &&
              beer[i].appearence === "brown" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null) ||
            (brown === true &&
              beer[i].appearence === "brown" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null) ||
            (black === true &&
              beer[i].appearence === "black" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null) ||
            (black === true &&
              beer[i].appearence === "black" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null) ||
            (red === true &&
              beer[i].appearence === "red" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null) ||
            (red === true &&
              beer[i].appearence === "red" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null) ||
            (green === true &&
              beer[i].appearence === "green" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null) ||
            (green === true &&
              beer[i].appearence === "green" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null)
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 4:
        for (let i = 0; i < beer.length; i++) {
          if (
            minAlcoholDegree !== 0 &&
            beer[i].alcoholDegree >= minAlcoholDegree
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 5:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree)
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 6:
        for (let i = 0; i < beer.length; i++) {
          if (
            (blonde === true &&
              beer[i].appearence === "blonde" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (amber === true &&
              beer[i].appearence === "amber" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (brown === true &&
              beer[i].appearence === "brown" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (black === true &&
              beer[i].appearence === "black" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (red === true &&
              beer[i].appearence === "red" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (green === true &&
              beer[i].appearence === "green" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree)
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 7:
        for (let i = 0; i < beer.length; i++) {
          if (
            (blonde === true &&
              beer[i].appearence === "blonde" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (blonde === true &&
              beer[i].appearence === "blonde" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (amber === true &&
              beer[i].appearence === "amber" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (amber === true &&
              beer[i].appearence === "amber" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (brown === true &&
              beer[i].appearence === "brown" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (brown === true &&
              beer[i].appearence === "brown" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (black === true &&
              beer[i].appearence === "black" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (black === true &&
              beer[i].appearence === "black" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (red === true &&
              beer[i].appearence === "red" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (red === true &&
              beer[i].appearence === "red" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (green === true &&
              beer[i].appearence === "green" &&
              checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree) ||
            (green === true &&
              beer[i].appearence === "green" &&
              checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree)
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 8:
        for (let i = 0; i < beer.length; i++) {
          if (
            beer[i].breweryName
              .toLowerCase()
              .replace("\n", "")
              .includes(breweryName.toLowerCase())
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 9:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 10:
        for (let i = 0; i < beer.length; i++) {
          if (
            (blonde === true &&
              beer[i].appearence === "blonde" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (amber === true &&
              beer[i].appearence === "amber" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (brown === true &&
              beer[i].appearence === "brown" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (black === true &&
              beer[i].appearence === "black" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (red === true &&
              beer[i].appearence === "red" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (green === true &&
              beer[i].appearence === "green" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 11:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 12:
        for (let i = 0; i < beer.length; i++) {
          if (
            minAlcoholDegree !== 0 &&
            beer[i].alcoholDegree >= minAlcoholDegree &&
            beer[i].breweryName
              .toLowerCase()
              .replace("\n", "")
              .includes(breweryName.toLowerCase())
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 13:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 14:
        for (let i = 0; i < beer.length; i++) {
          if (
            (blonde === true &&
              beer[i].appearence === "blonde" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (amber === true &&
              beer[i].appearence === "amber" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (brown === true &&
              beer[i].appearence === "brown" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (black === true &&
              beer[i].appearence === "black" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (red === true &&
              beer[i].appearence === "red" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (green === true &&
              beer[i].appearence === "green" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 15:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 16:
        for (let i = 0; i < beer.length; i++) {
          if (
            beer[i].beerName
              .toLowerCase()
              .replace("\n", "")
              .includes(beerName.toLowerCase())
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 17:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 18:
        for (let i = 0; i < beer.length; i++) {
          if (
            (blonde === true &&
              beer[i].appearence === "blonde" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (amber === true &&
              beer[i].appearence === "amber" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (brown === true &&
              beer[i].appearence === "brown" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (black === true &&
              beer[i].appearence === "black" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (red === true &&
              beer[i].appearence === "red" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (green === true &&
              beer[i].appearence === "green" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 19:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 20:
        for (let i = 0; i < beer.length; i++) {
          if (
            minAlcoholDegree !== 0 &&
            beer[i].alcoholDegree >= minAlcoholDegree &&
            beer[i].beerName
              .toLowerCase()
              .replace("\n", "")
              .includes(beerName.toLowerCase())
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 21:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 22:
        for (let i = 0; i < beer.length; i++) {
          if (
            (blonde === true &&
              beer[i].appearence === "blonde" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (amber === true &&
              beer[i].appearence === "amber" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (brown === true &&
              beer[i].appearence === "brown" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (black === true &&
              beer[i].appearence === "black" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (red === true &&
              beer[i].appearence === "red" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (green === true &&
              beer[i].appearence === "green" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 23:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 24:
        for (let i = 0; i < beer.length; i++) {
          if (
            beer[i].breweryName
              .toLowerCase()
              .replace("\n", "")
              .includes(breweryName.toLowerCase()) &&
            beer[i].beerName
              .toLowerCase()
              .replace("\n", "")
              .includes(beerName.toLowerCase())
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 25:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 26:
        for (let i = 0; i < beer.length; i++) {
          if (
            (blonde === true &&
              beer[i].appearence === "blonde" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (amber === true &&
              beer[i].appearence === "amber" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (brown === true &&
              beer[i].appearence === "brown" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (black === true &&
              beer[i].appearence === "black" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (red === true &&
              beer[i].appearence === "red" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (green === true &&
              beer[i].appearence === "green" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 27:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }

        return storeArray;
      case 28:
        for (let i = 0; i < beer.length; i++) {
          if (
            minAlcoholDegree !== 0 &&
            beer[i].alcoholDegree >= minAlcoholDegree &&
            beer[i].breweryName
              .toLowerCase()
              .replace("\n", "")
              .includes(breweryName.toLowerCase()) &&
            beer[i].beerName
              .toLowerCase()
              .replace("\n", "")
              .includes(beerName.toLowerCase())
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 29:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 30:
        for (let i = 0; i < beer.length; i++) {
          if (
            (blonde === true &&
              beer[i].appearence === "blonde" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (amber === true &&
              beer[i].appearence === "amber" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (brown === true &&
              beer[i].appearence === "brown" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (black === true &&
              beer[i].appearence === "black" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (red === true &&
              beer[i].appearence === "red" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (green === true &&
              beer[i].appearence === "green" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      case 31:
        for (let i = 0; i < beer.length; i++) {
          if (
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              blonde === true &&
              beer[i].appearence === "blonde" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              amber === true &&
              beer[i].appearence === "amber" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              brown === true &&
              beer[i].appearence === "brown" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              black === true &&
              beer[i].appearence === "black" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              red === true &&
              beer[i].appearence === "red" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox33 === true &&
              beer[i].bottle33Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase())) ||
            (checkBox75 === true &&
              beer[i].bottle75Price !== null &&
              green === true &&
              beer[i].appearence === "green" &&
              minAlcoholDegree !== 0 &&
              beer[i].alcoholDegree >= minAlcoholDegree &&
              beer[i].breweryName
                .toLowerCase()
                .replace("\n", "")
                .includes(breweryName.toLowerCase()) &&
              beer[i].beerName
                .toLowerCase()
                .replace("\n", "")
                .includes(beerName.toLowerCase()))
          ) {
            storeArray = [...storeArray, beer[i]];
          }
        }
        return storeArray;
      default:
        return beerDB;
    }
  };

  const applyHandler = () => {
    // console.log("beerName:", beerName);
    // console.log("breweryName:", breweryName);
    // console.log("minAlcoholDegree:", minAlcoholDegree);
    // console.log("blonde:", blonde);
    // console.log("amber:", amber);
    // console.log("brown:", brown);
    // console.log("black:", black);
    // console.log("red:", red);
    // console.log("green:", green);
    // console.log("checkBox33:", checkBox33);
    // console.log("checkBox75:", checkBox75);
    if (minAlcoholDegree === "") {
      setMinAlcoholDegree(0);
    }
    let newDB = searchInDB();
    // console.log("newDB", newDB);
    // console.log("========================");
    if (typeof newDB !== undefined && newDB.length === 0) {
      Alert.alert("ERRORE! \nNon esiste nessuna birra così!");
      setDefaultValues();
    } else {
      navigation.pop();
      navigation.navigate("Home", { beers: newDB });
    }
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
            autoCompleteType="off"
            blurOnSubmit={true}
            clearButtonMode="unless-editing"
            clearTextOnFocus={true}
            placeholder="Nome Birra"
            maxLength={40}
            onChangeText={(newBeer) => setBeerName(newBeer)}
            ref={beerNameRef}
          ></TextInput>
          <TextInput
            style={styles.text}
            autoCompleteType="off"
            blurOnSubmit={true}
            clearButtonMode="unless-editing"
            clearTextOnFocus={true}
            maxLength={50}
            ref={breweryNameRef}
            onChangeText={(newBrewery) => setBreweryName(newBrewery)}
            placeholder="Nome Birrificio"
          ></TextInput>
          <TextInput
            style={styles.text}
            autoCompleteType="off"
            blurOnSubmit={true}
            clearButtonMode="unless-editing"
            clearTextOnFocus={true}
            ref={minAlcoholDegreeRef}
            onChangeText={(newAlcohol) => setMinAlcoholDegree(newAlcohol)}
            placeholder="Gradazione Alcolica"
          ></TextInput>
          <Text style={styles.text}>(Bl, A, Bw, Bk, Rd, Gn)</Text>
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
          <Button title="Applica" onPress={applyHandler}></Button>
          <Button
            title="Reset Filtri"
            color="red"
            onPress={setDefaultValues}
          ></Button>
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