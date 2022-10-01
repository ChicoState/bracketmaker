import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import View from "./view";
import React from "react";
import Player from "./add";
import PlayerList from "./players";
import Match from "./match";
import { firestore } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar } from "react-bootstrap";



function App() {
  const [players, updatePlayers] = useState([]);
  const [matches, updateMatches] = useState([]);
  const playerCollectionRef = collection(firestore, "Event");

  useEffect(() => {
    const getPlayers = async () => {
      const data = await getDocs(playerCollectionRef);
      updatePlayers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      console.log(data);
    };

    getPlayers();
  }, []);

  function randomizer(players, matches) {
    const names = []
    for (let i=0; i < players.length; i++) {
      names.push(players[i].name)
    }
    console.log(names);
    var range = names.length;
    while (range != 0) {
      var random = Math.floor(Math.random() * range);
      range--;
      [names[range], names[random]] = [names[random], names[range]];
    }
    updateMatches(names)
  };

  return (
    <div>

      <h1>Bracket Maker</h1>
      <Routes>
        <Route path="/" element={<Player />} />,
        <Route path="/view" element={<View />} />
      </Routes>
      <PlayerList players={players}/>
      <div className="container mt-5">
        <Button onClick={() => randomizer(players, matches) }>Generate Matches!</Button>
        <p></p>
        <Match match={matches}/>
        <p></p>
      </div>
    </div>
  );
}

export default App;
