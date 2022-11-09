import { doc, deleteDoc, collection, } from "firebase/firestore";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { firestore, fireauth } from "./firebase";
import { useFirebase} from "../src/firebase";
import FormCheck from 'react-bootstrap/FormCheck';
import { createUserWithEmailAndPassword} from 'firebase/auth';
// import { fireauth } from "./firebase.jsx";
// import { fireauth } from "./firebase";


const SignUp = () => {

    const firebase = useFirebase();

    const [name, setName] = useState("");
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [isNoti, setNoti] = useState("false");
    const [isViewer, setViewer] = useState("true");
    const [isPlayer, setPlayer] = useState("false");
    const [isManager, setManager] = useState("false");

    const playerCollectionRef = collection(firestore, "User");

    const handleSubmit = async (e) => {
        //// dddddddddddddddddddddddddddd
        // e.preventDefault();
        // await firebase.addUser(name, uname, email    , pass, isNoti, isViewer, isPlayer, isManager);
        // window.location.reload(false);
       
    };
    const handleChangeV = async (e) => {
        setViewer(!isViewer);
    };
    const handleChangeP = async (e) => {
        setPlayer(!isPlayer);
    };
    const handleChangeM = async (e) => {
        setManager(!isManager);
    };
    const handleNoti = async (e) => {
        setNoti(!isNoti);
    };
    const signUp = async () =>{
        createUserWithEmailAndPassword(fireauth, email, pass)
            .then(fireauth=>console.log(fireauth))
                .catch(error=>console.error(error))
                // e.preventDefault();
                await firebase.addUser(name, uname, email, pass);
                window.location.reload(false);
    }    

    return (
        // <div className="container mt-5">
        //   This will be the SignUp page.
        // </div>
        <div className="container mt-5">
        
        <Container>
            <h1 align="center">SignUp</h1>
        </Container>
        <p>  </p>
        <p></p>

        


        {/* <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Enter your Name"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    onChange={(e) => setUname(e.target.value)}
                    value={uname}
                    type="text"
                    placeholder="Enter your  User Name"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Email</Form.Label>
                <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Enter your Email"
                />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Password</Form.Label>
                <Form.Control
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                type="password"
                placeholder="Enter your Password"
                />
                <br></br>
                <h6>What are you?</h6>
                <Container key="inline-checkbox" className="mb-3">
                    <Form.Check inline label="Viewer" name="TypeUser" type="checkbox" id="inline-checkbox" checked="checked" onChange={handleChangeV} />
                    <Form.Check inline label="Player" name="TypeUser" type="checkbox" id="inline-checkbox" onChange={handleChangeP}/>
                    <Form.Check inline label="Event Manager" name="TypeUser" type="checkbox" id="inline-checkbox" onChange={handleChangeM}/>
                </Container>
                
                <Form.Check type="switch" id="Notified" label="Want to be notified?" onChange={handleNoti}/>
            </Form.Group>
            <Button variant="primary" type="submit" align="center" onClick={signUp}>
                SignUp
            </Button>
          
          
        </Form> */}

        <div className="div" align="center">
            <label className="Form">User Name: &nbsp;</label>
            <input onChange={(e)=>setUname(e.target.value)} className="input" type="text" name="Uname" />
            <p>            </p>
            <label className="Form">Full Name: &nbsp;</label>
            <input onChange={(e)=>setName(e.target.value)} className="input" type="text" name="name" />
            <p>            </p>

            <label className="Form">Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
            <input onChange={(e)=>setEmail(e.target.value)} className="input" type="email" name="email" />
            <p>            </p>

            <label className="Form">Password: &nbsp;&nbsp;</label>
            <input onChange={(e)=>setPass(e.target.value)} className="input" type="password" name="email" />            <p>            </p>
            <button className="submit" onClick={signUp}>SignUp</button>
            <p>            </p>
            <h6> Alreagy a User <a href="/login">Login In</a></h6>
        </div>

          <p></p>
        <h6> Alreagy a User <a href="/login">Login In</a></h6>
      </div>
    );
}

export default SignUp;