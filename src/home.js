import React from 'react'
import "./Home.css";
import Nav from 'react-bootstrap/Nav';
import { Link, resolvePath, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div className="HomeStyle">
      <p class="mid-button-style">
        <a class="button" href="/create-tournament"> Start New Bracket</a>
      </p>
    </div>

  );
}

export default Home;
