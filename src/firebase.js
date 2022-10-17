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
  apiKey: "AIzaSyBlfOdfEQ4zbEtEyCvtC99B5m2tyLhA1fc",
  authDomain: "bracketmaker-db3ef.firebaseapp.com",
  projectId: "bracketmaker-db3ef",
  storageBucket: "bracketmaker-db3ef.appspot.com",
  messagingSenderId: "468405030972",
  appId: "1:468405030972:web:201324f3d987202668b339",
  measurementId: "G-M64K7RS7DX"
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

  const addTournament = async (name, type, manager, numTeams, playersPerTeam) => {

    return await addDoc(collection(firestore, "Tournaments"), {
      name,
      type,
      manager,
      numTeams,
      playersPerTeam,
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
        addTournament,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
