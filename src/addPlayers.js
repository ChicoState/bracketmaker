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

function Player() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;
  const { numTeams } = state;
  const { playersPerTeam } = state;
  var teamID
  var teamRows = []
  var playerRows = []
  var allPlayers = []
  for (var i = 0; i < numTeams; i++) {
    var num = i+1
    teamRows.push("Team " + num)
  }
  for (var i = 0; i < playersPerTeam; i++) {
    var num = i+1
    playerRows.push("Player " + num)
  }

  const handleSubmit = async (p) => {
    event.preventDefault()
    for(var i=0; i<numTeams; i++) {
      await firebase.addTeam(p.target.team[i].value, playersPerTeam, id)
      .then(docRef => {
        teamID = docRef.id;
      })
      for(var j=0; j<playersPerTeam; j++) {
        await firebase.addPlayer(p.target.player[i*playersPerTeam+j].value, teamID, id)

      }
    }
    navigate('/view', { state: { id: id}})
  };

  return (
    <div>
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
                    placeholder={x}
                  />
                  </Form.Group>
                <ul>{playerRows.map(y =>
                  <li key ={y}>
                    <div>
                      <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control
                          name="player"
                          type="text"
                          placeholder="Ricky Bobby"
                        />
                      </Form.Group>
                    </div>
                  </li>)}
                </ul>
          </div> )})}
      </div>
      <Button variant="primary" type="submit">
        Create Teams
      </Button>
      </Form>
    </div>
  )
};

export default Player;
