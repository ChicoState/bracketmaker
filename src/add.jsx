import { doc, deleteDoc, collection, } from "firebase/firestore";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { firestore } from "./firebase";
import { useFirebase } from "../src/firebase";

const Player = () => {
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [team, setTeam] = useState("");
  const playerCollectionRef = collection(firestore, "Event");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.addPlayer(name, age, team);
    window.location.reload(false);

  };
  const handleDelete = async () => {
    await deleteDoc(doc(firestore, "Event", name));
    window.location.reload(false);
};

  return (
    <div className="container mt-5">
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Create Event</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Container>

      </Navbar>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Player Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Age</Form.Label>
          <Form.Control
            onChange={(e) => setAge(e.target.value)}
            value={age}
            type="number"
            placeholder="Player Age"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Team</Form.Label>
          <Form.Control
            onChange={(e) => setTeam(e.target.value)}
            value={team}
            type="text"
            placeholder="Team Name"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Player
        </Button>
        </Form>
        <p></p>
        <Button variant="primary" type = "submit" onClick={handleDelete}>
          Delete Event
        </Button>
    </div>

  );
};

export default Player;
