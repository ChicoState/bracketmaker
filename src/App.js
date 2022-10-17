import { collection, getDocs } from "firebase/firestore";
import  React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { firestore } from "./firebase";
import MyNav from "./components/Navbar"
import Player from "./addPlayers"
import Match from "./match";
import NewTournament from "./newTournament";
import View from "./view";
import Home from "./home"
import "./App.css";

function App() {
  return (
      <div>
        <MyNav/>
        <Routes>
          <Route exact path="/bracketmaker/" element={ <Home/> } />
          <Route exact path="/bracketmaker/create-tournament" element={ <NewTournament/> } />
          <Route exact path="/bracketmaker/create-tournament/players" element={ <Player/> } />
          <Route exact path="/bracketmaker/view" element={ <View/>} />
        </Routes>
      </div>
  );
}

export default App;
