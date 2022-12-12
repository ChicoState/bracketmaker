import React from 'react'
import image from ".//coolbackground.png"
import "./Home.css";
import { Link, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      backgroundColor: "goldenrod",
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      height: "110vh",
      width: "195vh",
      marginTop: "-50px",
      backgroundRepeat: "no-repeat",
      }}>
    
      <h1>
        Bracket Maker
      </h1>
      
      <p className="mid-button-style">
        <a className="button" href="/create-tournament"> Start New Bracket</a>

      </p>
    </div>

  );
}

export default Home;
