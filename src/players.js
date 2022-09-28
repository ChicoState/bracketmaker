import React from 'react'

export default function PlayerList({ players }) {
  return (
    <ol>
      {players.map(player => <li key={player}>{player}</li>)}
    </ol>
  )
}
