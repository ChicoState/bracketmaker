import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { firestore } from "./firebase";
import { useFirebase } from "../src/firebase";
import { doc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";

function Player() {
  const { state } = useLocation();
  const { id } = state;
  const { numTeams } = state;
  const { playersPerTeam } = state;
  // const docRef = doc(firestore, "tournaments", id)
  // async function componentDidMount() {
  //   const docSnap = await getDoc(docRef);
  //   const numTeams = docSnap.get("numTeams")
  //   const playersPerTeam = docSnap.get("playersPerTeam")
  //   console.log(numTeams, playersPerTeam)
  // };
  // 
  // componentDidMount();
  return (
    <div>
      <div>
        Number of Teams: { numTeams }

      </div>
      <div>
        Number of Players per Team: { playersPerTeam }
      </div>
    </div>
  )
};

export default Player;
