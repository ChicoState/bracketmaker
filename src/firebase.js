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
  setDoc,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  initializeAuth,
 } from "firebase/auth";

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

export const fireauth = getAuth(firebaseApp);

export const FirebaseProvider = (props) => {

  const addTournament = async (name, type, manager, numTeams) => {
    return await addDoc(collection(firestore, "Tournaments"), {
      name,
      type,
      manager,
      numTeams,
    });
  };


  const addTeam = async (name, tournament) => {
    return await addDoc(collection(firestore, "Tournaments", tournament, "Teams"), {
      name,
    });
  };

  const listPlayers = () => {
    return getDocs(collection(firestore, "Event"));
  };
  const addUser = async (name, uName, Email, Password) => {
    return await setDoc(doc(firestore, "User", Email), {
      name,
      uName,
      Email,
      Password,

    });
  };

  const addRound = async (tournament, roundNumber) => {
    return await addDoc(collection(firestore, "Tournaments", tournament, "Rounds"), {
      roundNumber,
    });
  };

  const addMatch = async (tournament, round, first, second, firstState, secondState, matchNumber) => {

    return await addDoc(collection(firestore, "Tournaments", tournament, "Rounds", round, "Matches"), {
      first,
      second,
      firstState,
      secondState,
      matchNumber,
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        addTournament,

        addTeam,
        addUser,
        addRound,
        addMatch,
        addUser,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
