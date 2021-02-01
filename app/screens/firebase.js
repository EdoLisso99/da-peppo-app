import * as firebase from "firebase";
// Optionally import the services that you want to use
// import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ8ASUJeJy8Uf8ekmpcIAnLReYU9atYyw",
  authDomain: "dapeppo.firebaseapp.com",
  databaseURL: "https://dapeppo-default-rtdb.firebaseio.com",
  projectId: "dapeppo",
  storageBucket: "dapeppo.appspot.com",
  messagingSenderId: "120176209850",
  appId: "1:120176209850:web:bd77886ca057a56ffe7783",
  measurementId: "G-BX2QBZHB45",
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export const auth = firebase.auth();
