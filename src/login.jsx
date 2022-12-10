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
import { firestore, fireauth } from "./firebase";
import { useFirebase } from "../src/firebase";
import FormCheck from 'react-bootstrap/FormCheck'
import {signInWithEmailAndPassword, getAuth, setPersistence, browserLocalPersistence} from 'firebase/auth';
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "bootstrap";
import image from './backgroundpattern.png';

// import auth from firebaseauth


const Login = () => {
    const firebase = useFirebase();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const playerCollectionRef = collection(firestore, "User");
    const auth = getAuth();
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.addUser(name, email, pass, isNoti, isViewer, isPlayer, isManager);
        window.location.reload(false);
        // navigate('/create-tournament/', { state: {}})
    };  
    const log =async (e) =>{
        e.preventDefault();
        const logging = await firebase.logIn(email, pass);
        if(logging.error){
            setError(logging.error)
        }else{
            localStorage.setItem('userEmail', email);
            navigate('/Profile/', { state: {}})
        }
    }
    return (
        // <div className="container mt-5">
        //   This will be the SignUp page.
        // </div>
       <div style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            height: "110vh",
            marginTop: "-50px",
            backgroundRepeat: "no-repeat",
          }}> 
        <div className="container mt-5">
        <h1 style={{
            paddingBottom: "100px",
        }}>Log In</h1>
        <p></p>
        {/* <Container>
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
            <a class="button" href="/bracketmaker/create-tournament"> Login</a>
          
          
        </Form> */}
          <p></p>
          <div className="div" align="center">
            <Container>
            <label className="Form" style={{color:"white"}}>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
            <input onChange={(e)=>setEmail(e.target.value)} className="input" type="email" name="email" />
            </Container>
            <p>            </p>
            <Container>
            <label className="Form" style={{color:"white"}}>Password: &nbsp;&nbsp;</label>
            <input onChange={(e)=>setPass(e.target.value)} className="input" type="password" name="email" />            <p>            </p>
            </Container>
            <Container>
            <button  className="submit" onClick={log}>Login</button>
            </Container>
            <p>            </p>
            <h6 style={{color:"white"}}> Already a User <a href="/signup">Sign Up</a></h6>
        </div>
      </div>
      </div>
    );
}

export default Login;