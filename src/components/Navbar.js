import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function MyNav() {
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
              <Nav.Item>
                <Nav.Link href="/view">View</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/profile">Profile</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>

              <Nav.Link href="/signup">SignUp</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default MyNav;
