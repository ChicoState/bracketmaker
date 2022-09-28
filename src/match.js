import React from 'react'

export default function Match({ match }) {
  var matches = []
  if (match.length%2 == 0) {
    for (let i=0; i < match.length; i+=2) {
      matches.push(match[i] + " vs " + match[i+1]);
    }
  } else {
    for (let i=0; i < match.length-1; i+=2) {
      matches.push(match[i] + " vs " + match[i+1]);
    }
    matches.push(match[match.length-1] + " vs  BYE")
  }
  return (
    <div>
      {matches.map(x => <div key={x}> {x} </div>)}
    </div>
  )
}
