import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardGroup from "react-bootstrap/CardGroup";
import { useFirebase, firestore } from "./firebase";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";

function View() {
  const [playerList, setPlayerList] = useState([])
  const { state } = useLocation();
  const { id } = state;

  async function whatever() {
    const profile = [];
    const q = query(collection(firestore, "Players"), where("tournament", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      profile.push(doc.get("name"));
    });
    setPlayerList(profile);
    console.log(profile)
  };

  useEffect(()=> {
    whatever()
  }, []);

  return (
    <div>
    Filtering Players
      {playerList.map(x => <div key={x}> {x} </div>)}
    </div>
  )
}

export default View;
