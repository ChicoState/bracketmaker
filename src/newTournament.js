import { doc, deleteDoc, collection, } from "firebase/firestore";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { firestore } from "./firebase";
import { useFirebase } from "../src/firebase";

const NewTournament = props => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [manager, setManager] = useState("");
  const [numTeams, setNumTeams] = useState("");
  const handleSubmit = async (t) => {
    t.preventDefault();
    await firebase.addTournament(name, type, manager, numTeams)
    .then(docRef => {
      const id = docRef.id;
      navigate('/create-tournament/players', { state: { id: id, numTeams: numTeams}})
    })
  };

  return (
    <div className="container mt-5">
      <Container>
        <Navbar.Brand>Create New Tournament</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Container>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(t) => setName(t.target.value)}
            defaultValue={name}
            type="text"
            placeholder="Grand Champions 2022"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Type of Tournament</Form.Label>
          <Form.Control
            as="select"
            onChange={(t) => setType(t.target.value)}
            defaultValue={type}
          >
          <option>---</option>
          <option value="Single Elimination">Single Elimination</option>

          {/*<option value="Double Elimination">Double Elimination</option>*/}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Manager</Form.Label>
          <Form.Control
            onChange={(t) => setManager(t.target.value)}
            defaultValue={manager}
            type="text"
            placeholder="John Doe"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Number of Teams/Players</Form.Label>
          <Form.Control
            onChange={(t) => setNumTeams(t.target.value)}
            defaultValue={numTeams}
            type="number"
            placeholder="4"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Tournament
        </Button>
        </Form>
    </div>

  );
};
export default NewTournament;
