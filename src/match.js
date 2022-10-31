import React from 'react'

export default function Match({ teamList }) {
  if (teamList.length > 0) {
    var matches = []
    var range = teamList.length
    function randomizer(teamList) {
      while (range != 0) {
        var random = Math.floor(Math.random() * range);
        range--;
        [teamList[range], teamList[random]] = [teamList[random], teamList[range]];
      }
    };
    randomizer(teamList)
    if (teamList.length%2 == 0) {
      for (let i=0; i < teamList.length; i+=2) {
        matches.push(teamList[i] + " vs " + teamList[i+1]);
      }
    } else {
      for (let i=0; i < teamList.length-1; i+=2) {
        matches.push(teamList[i] + " vs " + teamList[i+1]);
      }
      matches.push(teamList[teamList.length-1] + " vs  BYE")
    }
    return (
      <div>
        {matches.map(x => <div key={x}> {x} </div>)}
      </div>
    )
  } else {
    return
  }
}
