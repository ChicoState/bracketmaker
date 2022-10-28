// import 

// const Login = () => {
//     const firebase = useFirebase();

//     const [email, setEmail] = useState("");
//     const [pass, setPass] = useState("");
//     const playerCollectionRef = collection(firestore, "Users");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await firebase.addPlayer(name, age, team);
//         window.location.reload(false);
    
//     };
//     return (
//         <div className="container mt-5">
//           <Navbar bg="light" expand="lg">
//           <Container>
//             <Navbar.Brand href="/">Create Event</Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//             </Navbar.Collapse>
//           </Container>
    
//           </Navbar>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="formBasicText">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 type="text"
//                 placeholder="Player Name"
//               />
//             </Form.Group>
    
//             <Form.Group className="mb-3" controlId="formBasicText">
//               <Form.Label>Age</Form.Label>
//               <Form.Control
//                 onChange={(e) => setAge(e.target.value)}
//                 value={age}
//                 type="number"
//                 placeholder="Player Age"
//               />
//             </Form.Group>
    
//             <Form.Group className="mb-3" controlId="formBasicText">
//               <Form.Label>Team</Form.Label>
//               <Form.Control
//                 onChange={(e) => setTeam(e.target.value)}
//                 value={team}
//                 type="text"
//                 placeholder="Team Name"
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Add Player
//             </Button>
//             </Form>
//             <p></p>
//             <Button variant="primary" type = "submit" onClick={handleDelete}>
//               Delete Event
//             </Button>
//         </div>
//     );
// }
// export default Login;
import { doc, deleteDoc, collection, } from "firebase/firestore";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { firestore } from "./firebase";
import { useFirebase } from "../src/firebase";
import FormCheck from 'react-bootstrap/FormCheck'
import auth from firebaseauth


const Login = () => {
    const firebase = useFirebase();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const playerCollectionRef = collection(firestore, "User");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.addUser(name, email, pass, isNoti, isViewer, isPlayer, isManager);
        window.location.reload(false);
    };   

    return (
        // <div className="container mt-5">
        //   This will be the SignUp page.
        // </div>
        <div className="container mt-5">
        
        <Container>
            <h1 align="center">Login</h1>
        </Container>
  
        <Form onSubmit={handleSubmit}>
            
  
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Email</Form.Label>
                <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Enter your Email"
                />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                type="password"
                placeholder="Enter your Password"
                />
                
            </Form.Group>
            <Button variant="primary" type="submit" align="center">
                Login
            </Button>
          
          
        </Form>
          <p></p>
        <h6> Alreagy a User <a href="/signup">Sign Up</a></h6>
      </div>
    );
}

export default Login;