import React from "react"

import Ribbon from "./Ribbon"
import PlayerList from './players'
import Match from './match'

function randomizer(players) {
  console.log(players)
  var range = players.length;
  while (range != 0) {
    var random = Math.floor(Math.random() * range);
    range--;
    [players[range], players[random]] = [players[random], players[range]];
  }
  return players;
}



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: ['Alice', 'Billy', 'Tommy', 'Gwen', 'Amanda', 'Chris', 'Kyle'],
    };
    this.handleShuffle = this.handleShuffle.bind(this);
  }

  handleShuffle(e) {
    this.setState(randomizer(this.state.list));
  }


  render() {
    return (
      <div>
        <h1> All Players </h1>
        <PlayerList players={this.state.list}/>
        <button onClick={this.handleShuffle}>Shuffle!</button>
        <h1> Matches </h1>
        <Match match={this.state.list}/>
      </div>
    );
  }
}

export default App
