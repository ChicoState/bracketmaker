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
import Login from "./login"
import SignUp from "./signup"
import Profile from "./Profile"

import "./App.css";

function App() {
  return (
      <div>
        <MyNav/>
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route exact path="/create-tournament" element={ <NewTournament/> } />
          <Route exact path="/create-tournament/players" element={ <Player/> } />
          <Route exact path="/view" element={ <View/>} />
          <Route exact path="/profile" element={ <Profile/>} />
          <Route exact path="/login" element={ <Login/> } />
          <Route exact path="/signup" element={<SignUp/>} />
          {/* render = {()} */}
        </Routes>
      </div>
  );
}

export default App;
