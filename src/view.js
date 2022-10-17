import React, { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import { useFirebase, firestore } from "./firebase";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []}
  }
  async componentDidMount() {
    const profile = [];
    const q = query(collection(firestore, "Event"), where("name", ">=", "C"), where("name", "<=", "H"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      profile.push(doc.get("name"));
    });
    this.setState({
      data: profile
    });
    console.log(profile)
  };


  render() {
    const players = this.state.data;
    return (
      <div>
      Filtering Players
        {players.map(x => <div key={x}> {x} </div>)}
      </div>
    )
  }
}

export default View;
