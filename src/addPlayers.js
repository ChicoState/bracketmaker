import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { firestore } from "./firebase";
import { useFirebase } from "../src/firebase";
import { doc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import image from './backgroundpattern.png';

function Player() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;
  const { numTeams } = state;
  var roundId
  var matchID
  var teamID
  var teamRows = []
  var allTeams = []
  var newNumTeams = 2;

  while (newNumTeams < numTeams) {
    newNumTeams = newNumTeams*2;
  }

  var numRounds = Math.log2(newNumTeams)+1;

  for (var i = 0; i < newNumTeams-numTeams; i++) {
    allTeams.push("BYE");
  }

  for (var i = 0; i < numTeams; i++) {
    var num = i+1
    teamRows.push("Team " + num)
  }

  const handleSubmit = async (p) => {
    event.preventDefault()

    for(var i=0; i<numTeams; i++) {
      await firebase.addTeam(p.target[i].value, id)
      allTeams.push(p.target[i].value)
    }
    console.log(allTeams)
    randomizer(allTeams);
    console.log(allTeams)
    for (var i=0; i < numRounds; i++) {
      await firebase.addRound(id, i+1).then(docRef => {
        roundId = docRef.id;
      })
      for (var j = 0; j < newNumTeams/(2**i); j+=2) {
        if (i == 0) {
          await firebase.addMatch(id, roundId, allTeams[j], allTeams[j+1], 0, 0, j+1)
        } else {
          await firebase.addMatch(id, roundId, "?", "?", 0, 0, j+1)
        }
      }
    }

    navigate('/view', { state: { id: id, numTeams: numTeams}})
  };

  function randomizer(allTeams) {
    var verified = false;
    while (!verified) {
      var range = allTeams.length
      while (range != 0) {
        var random = Math.floor(Math.random() * range);
        range--;
        [allTeams[range], allTeams[random]] = [allTeams[random], allTeams[range]];
      }
      verified = true;
      for (var i = 0; i < allTeams.length; i++) {
        if (allTeams[i] == "BYE" && i != allTeams.length-1) {
          if (allTeams[i+1] == "BYE") {
            verified = false;
          }
        }
      }
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      height: "110vh",
      marginTop: "-50px",
      backgroundRepeat: "no-repeat",
      color: "white",
    }}>
      <h1 style={{color:"white", paddingBottom: "100px",}}>
        Enter Team Names
      </h1>
      <Form onSubmit={handleSubmit}>
        <div>
          {teamRows.map(function (x) {
            return (
              <div key={x}>
                Team Name:
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Control
                    name="team"
                    type="text"
                  />
                </Form.Group>
          </div> )})}
      </div>
      <Button variant="primary" type="submit">
        Create Bracket
      </Button>
      </Form>
    </div>
  )
};

export default Player;
