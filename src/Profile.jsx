import React from 'react'
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';
import { firestore, fireauth, } from "./firebase";
import { doc, deleteDoc, collection, QuerySnapshot, querySnapshot, getDocs, connectFirestoreEmulator } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Card,  } from 'react-bootstrap';
import {useState} from 'react';
import { useEffect } from 'react';
import { getDoc } from "firebase/firestore";
import { Component } from 'react';

const auth = getAuth();
const Profile = () => {
    const user = auth.currentUser;
    // const[name, setName] = useState("")
    // const[uname, setUname] = useState("")
    const[email, setEmail] = useState("")
    const [info, setInfo] = useState({});
    const [info2, setInfo2] = useState([]);
    
    window.addEventListener('load',() => {
      FetchData();
    });

    // useEffect(() => {
    //   // Your code here
    //   FetchData();
    // }, []);

    const FetchData = () => {
      getDocs(collection(firestore, "User")).then((QuerySnapshot) => {
        QuerySnapshot.forEach(element => {
          // console.log("fffffffffff");
          
          console.log(element.id);
          if(element.id == email){
            var data = element.data();
            // console.log(data);
            // console.log("eeeeeeee");
            // setInfo(info => ({...info, ...data}));
            setInfo(data);
            // console.log(info);
            let test = [];

            getDocs(collection(firestore, "User/"+email+"/Tournaments")).then((QuerySnapshot1) => {
              QuerySnapshot1.forEach(element1 => {
                console.log("tttttttt");
                // console.log(element1.id);
                var data2 = element1.data();
                setInfo2(arr2 => [...arr2, data2]);
                test.push(data2);
                console.log(data2);
                // console.log(arr.length)
              });
            });
            // console.log("test");
            console.log(test);
            // setInfo2(test);
          }
        });
      })
    }
    const handleClick = () => {

    }
    useEffect(() => {
      setEmail(localStorage.getItem('userEmail'));  
    });
    if(email){
  return (
    <div className="container mt-5">
      Signed In
      <p></p>
      Welcome {info.uName}
      <p></p>
      Name: {info.name}
      <p></p>
      Email: {email}
      <p></p>
      These are your brackets:
      <p></p>
      <table>
        <tr> 
      {
         
        info2.map((event) => (
          <td>
          <Card style={{ width: '12rem'}}>
          <Card.Title>{event.name}</Card.Title>
          <Card.Body>
            <Card.Text>Managed By: {event.manager}</Card.Text>
          </Card.Body>
          </Card>
          </td>
          
          
          // data2.name
        ))
        
      }
      </tr>
        </table>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
}
else{
  return (
    <div className="container mt-5">
      Not logged in
    </div>
  );
}
}

export default Profile;