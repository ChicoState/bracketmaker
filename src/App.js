import React from "react"

import Ribbon from "./Ribbon"
import PlayerList from './players'

function randomizer(players) {
  console.log(players)
  var range = players.length;
  while (range != 0) {
    var random = Math.floor(Math.random() * range);
    range--;

    [players[range], players[random]] = [players[random], players[range]];
  }
  console.log(players)
  return players;
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: ['Alice', 'Billy', 'Tommy', 'Gwen', 'Amanda', 'Chris'],
    };
    this.handleShuffle = this.handleShuffle.bind(this);
  }

  //var players = ['Alice', 'Billy', 'Tommy', 'Gwen', 'Amanda', 'Chris'];


  handleShuffle(e) {
    this.setState(randomizer(this.state.list));
  }


  render() {
    return (
      <div>
        <PlayerList players={this.state.list}/>
        <button onClick={this.handleShuffle}>Shuffle!</button>
      </div>
    );
  }
}

export default App
