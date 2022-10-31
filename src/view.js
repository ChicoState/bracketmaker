import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardGroup from "react-bootstrap/CardGroup";
import Match from "./match"
import "./view.css"
import { useFirebase, firestore } from "./firebase";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";

function View() {
  const [teamList, setTeamList] = useState([])
  const { state } = useLocation();
  const { id } = state;
  const { numTeams } = state;

  async function firebase_query() {
    const allTeams = [];
    const querySnapshot = await getDocs(collection(firestore, "Tournaments", id, "Teams"));
    querySnapshot.forEach((doc) => {
      allTeams.push(doc.get("name"));
    });
    setTeamList(allTeams);
  };

  useEffect(()=> {
    firebase_query()
  }, []);
  return (
    <div>
      <div className="round r-of-4">
        <div className="bracket-game">
        {teamList.map(y =>
          <div>
            <div className="player top">
              {y}
              <div className="score">
                0
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
      <div className="connectors r-of-2">
        <div className="top-line"></div>
        <div className="clear"></div>
        <div className="bottom-line"></div>
        <div className="clear"></div>
        <div className="vert-line"></div>
        <div className="clear"></div>
        <div className="next-line"></div>
        <div className="clear"></div>
      </div>
    </div>
  )
}

export default View;
