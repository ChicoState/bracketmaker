import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {getAuth} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import {useState} from 'react';
import { useEffect } from 'react';

const auth = getAuth();
function MyNav() {
  const user = auth.currentUser;
  const[email, setEmail] = useState("")
  const handleSignout = async() =>{
    try{
      await signOut(fireauth)
      return true;
    }
    catch (error){
      
    }
    };
    useEffect(() => {
      setEmail(localStorage.getItem('userEmail'));  
    });
    const off = async() =>{
      localStorage.clear()
    }
  if(email){
    return(
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">BracketMaker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="container-fluid">
              <Nav.Item>
                <Nav.Link href="/create-tournament">New Tournament</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/profile">Profile</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="me-auto">
            </Nav>
            <Nav>
            <Nav.Link href="/login" onClick={off}>Log Out</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }else{
  return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">BracketMaker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="container-fluid">
              <Nav.Item>
                <Nav.Link href="/create-tournament">New Tournament</Nav.Link>
              </Nav.Item>
              
            </Nav>
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>

              <Nav.Link href="/signup">SignUp</Nav.Link>
              <Nav.Link href="/login" onClick={off}>Log Out</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
}

export default MyNav;
