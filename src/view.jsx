import React, { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import { useFirebase } from "./firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";

const View =async () => {
    const firebase = useFirebase();

    const [profile, setProfile] = useState('');

    useEffect(()=> {
        const q = query(collection(firebase,"Event"))
        const shot = onSnapshot(q,(querySnapshot)=> {
        const playerProfiles = [];
        querySnapshot.forEach((doc)=>{
            playerProfiles.push({...doc.data(), id: doc.id})
        });
        setProfile(playerProfiles)
        })
        return () => shot();
    },[])

}
export default View;
