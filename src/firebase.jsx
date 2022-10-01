import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCf5EW_tKSbyA0btKAltMhsZyLSwMbBp6k",
  authDomain: "reacttrial-6a0ce.firebaseapp.com",
  databaseURL: "https://reacttrial-6a0ce-default-rtdb.firebaseio.com",
  projectId: "reacttrial-6a0ce",
  storageBucket: "reacttrial-6a0ce.appspot.com",
  messagingSenderId: "1048549817812",
  appId: "1:1048549817812:web:48d669d646fc99b2c5ea41",
  measurementId: "G-CC2X1XPEJK"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);


export const FirebaseProvider = (props) => {

  const addPlayer = async (name, age, team) => {

    return await addDoc(collection(firestore, "Event"), {
      name,
      age,
      team,

    });
  };

  const listPlayers = () => {
    return getDocs(collection(firestore, "Event"));
  };



  return (
    <FirebaseContext.Provider
      value={{
        addPlayer,
        listPlayers,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
