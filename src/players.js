import React from 'react'

export default function PlayerList({ players }) {
  return (
    <div className="container mt-5">
      <ol class="list-group list-group-numbered">
        {players.map(player => <li class="list-group-item" key={player.name}>{player.name}</li>)}
      </ol>
    </div>
  )
}
