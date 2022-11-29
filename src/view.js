import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import CardGroup from "react-bootstrap/CardGroup";
import Match from "./match"
import "./view.css"
import { useFirebase, firestore } from "./firebase";
import { collection, doc, setDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";

function View() {
  const [teamList, setTeamList] = useState([])
  const [winners, setWinners] = useState([])
  const [rounds, setRounds] = useState([])
  const { state } = useLocation();
  const { id } = state;
  const { numTeams } = state;
  var finished = 0
  var newNumTeams = 2;

  while (newNumTeams < numTeams) {
    newNumTeams = newNumTeams*2;
  }

  async function firebase_query() {
    const allRounds = [...rounds];
    const allWinners = [...winners];

    for (var i = 0; i  < Math.log2(newNumTeams)+1; i++) {
      var array = []
      allRounds.push(array)
      allWinners.push(array)
    }

    var querySnapshot = await getDocs(collection(firestore, "Tournaments", id, "Rounds"));
    querySnapshot.forEach(async (docu) => {
      var newMatchNum = 0;
      const currentTeams = [];
      const currentWinners = [];
      var index = docu.get("roundNumber")
      let matchesCollectionRef = await getDocs(collection(firestore, "Tournaments", id, "Rounds", docu.id, "Matches"));
      matchesCollectionRef.forEach(async (matchDoc) => {
        newMatchNum++;

        currentTeams.push(matchDoc.get("first"))
        currentWinners.push(matchDoc.get("firstState"))
        if (index != Math.log2(newNumTeams)+1) {
          currentTeams.push(matchDoc.get("second"))
          currentWinners.push(matchDoc.get("secondState"))
        }
        await setDoc(doc(firestore, "Tournaments", id, "Rounds", docu.id, "Matches", matchDoc.id), {
          first: matchDoc.get("first"),
          second: matchDoc.get("second"),
          matchNumber: newMatchNum,
          firstState: matchDoc.get("firstState"),
          secondState: matchDoc.get("secondState"),
        })
      });
      allRounds[index-1] = currentTeams
      allWinners[index-1] = currentWinners
      finished++
      console.log(finished)
      if (finished == Math.log2(newNumTeams)+1) {
        setWinners(allWinners)
        setRounds(allRounds)
      }
    });
  };


  const colors = ['white', '#B8F2B8', '#F2B8B8']

  async function handleClick(x, y) {
    var winner, loser
    var winnersArray = [...winners];
    var currentTeams = [...rounds];
    if (y%2==0) {
      if (winnersArray[x][y] == 0) {
        currentTeams[x+1][Math.floor(y/2)] = currentTeams[x][y]
        winnersArray[x][y] = 1
        winnersArray[x][y+1] = 2
        var roundQuery = query(collection(firestore, "Tournaments", id, "Rounds"), where("roundNumber", "==", x+1))
        var roundRef = await getDocs(roundQuery)
        roundRef.forEach(async (docu) => {
          const matchQuery = query(collection(firestore, "Tournaments", id, "Rounds", docu.id, "Matches"), where("matchNumber", "==", Math.ceil((y+1)/2)))
          let matchesCollectionRef = await getDocs(matchQuery);
          matchesCollectionRef.forEach(async (matchDoc) => {
            winner = matchDoc.get("first")
            loser = matchDoc.get("second")
            await setDoc(doc(firestore, "Tournaments", id, "Rounds", docu.id, "Matches", matchDoc.id), {
              first: winner,
              second: loser,
              matchNumber: matchDoc.get("matchNumber"),
              firstState: 1,
              secondState: 2,
            })
          })
        })
        roundQuery = query(collection(firestore, "Tournaments", id, "Rounds"), where("roundNumber", "==", x+2))
        roundRef = await getDocs(roundQuery)
        roundRef.forEach(async (docu) => {
          const matchQuery = query(collection(firestore, "Tournaments", id, "Rounds", docu.id, "Matches"), where("matchNumber", "==", Math.ceil((y+1)/4)))
          let matchesCollectionRef = await getDocs(matchQuery);
          matchesCollectionRef.forEach(async (matchDoc) => {
            if(y%4 == 0 || y%4 == 1) {
              await setDoc(doc(firestore, "Tournaments", id, "Rounds", docu.id, "Matches", matchDoc.id), {
                first: winner,
                second: matchDoc.get("second"),
                matchNumber: matchDoc.get("matchNumber"),
                firstState: 0,
                secondState: 0,
              })
            } else {
              await setDoc(doc(firestore, "Tournaments", id, "Rounds", docu.id, "Matches", matchDoc.id), {
                first: matchDoc.get("first"),
                second: winner,
                matchNumber: matchDoc.get("matchNumber"),
                firstState: 0,
                secondState: 0,
              })
            }
          })
        })
      } else {
        currentTeams[x+1][Math.floor(y/2)] = '?'
        winnersArray[x][y] = 0
        winnersArray[x][y+1] = 0
        var roundQuery = query(collection(firestore, "Tournaments", id, "Rounds"), where("roundNumber", "==", x+1))
        var roundRef = await getDocs(roundQuery)
        roundRef.forEach(async (docu) => {
          const matchQuery = query(collection(firestore, "Tournaments", id, "Rounds", docu.id, "Matches"), where("matchNumber", "==", Math.ceil((y+1)/2)))
          let matchesCollectionRef = await getDocs(matchQuery);
          matchesCollectionRef.forEach(async (matchDoc) => {
            await setDoc(doc(firestore, "Tournaments", id, "Rounds", docu.id, "Matches", matchDoc.id), {
              first: matchDoc.get("first"),
              second: matchDoc.get("second"),
              matchNumber: matchDoc.get("matchNumber"),
              firstState: 0,
              secondState: 0,
            })
          })
        })
        roundQuery = query(collection(firestore, "Tournaments", id, "Rounds"), where("roundNumber", "==", x+2))
        roundRef = await getDocs(roundQuery)
        roundRef.forEach(async (docu) => {
          const matchQuery = query(collection(firestore, "Tournaments", id, "Rounds", docu.id, "Matches"), where("matchNumber", "==", Math.ceil((y+1)/4)))
          let matchesCollectionRef = await getDocs(matchQuery);
          matchesCollectionRef.forEach(async (matchDoc) => {
            await setDoc(doc(firestore, "Tournaments", id, "Rounds", docu.id, "Matches", matchDoc.id), {
              first: "?",
              second: "?",
              matchNumber: matchDoc.get("matchNumber"),
              firstState: 0,
              secondState: 0,
            })
          })
        })
      }
    } else {
      if (winnersArray[x][y] == 0) {
        console.log(y)
        currentTeams[x+1][Math.floor(y/2)] = currentTeams[x][y]
        winnersArray[x][y] = 1
        winnersArray[x][y-1] = 2
        var roundQuery = query(collection(firestore, "Tournaments", id, "Rounds"), where("roundNumber", "==", x+1))
        var roundRef = await getDocs(roundQuery)
        roundRef.forEach(async (docu) => {
          const matchQuery = query(collection(firestore, "Tournaments", id, "Rounds", docu.id, "Matches"), where("matchNumber", "==", Math.ceil((y+1)/2)))
          let matchesCollectionRef = await getDocs(matchQuery);
          matchesCollectionRef.forEach(async (matchDoc) => {
            winner = matchDoc.get("second")
            loser = matchDoc.get("first")
            await setDoc(doc(firestore, "Tournaments", id, "Rounds", docu.id, "Matches", matchDoc.id), {
              first: loser,
              second: winner,
              matchNumber: matchDoc.get("matchNumber"),
              firstState: 2,
              secondState: 1,
            })
          })
        })
        roundQuery = query(collection(firestore, "Tournaments", id, "Rounds"), where("roundNumber", "==", x+2))
        roundRef = await getDocs(roundQuery)
        roundRef.forEach(async (docu) => {
          const matchQuery = query(collection(firestore, "Tournaments", id, "Rounds", docu.id, "Matches"), where("matchNumber", "==", Math.ceil((y+1)/4)))
          let matchesCollectionRef = await getDocs(matchQuery);
          matchesCollectionRef.forEach(async (matchDoc) => {
            if(y%4 == 0 || y%4 == 1) {
              await setDoc(doc(firestore, "Tournaments", id, "Rounds", docu.id, "Matches", matchDoc.id), {
                first: winner,
                second: matchDoc.get("second"),
                matchNumber: matchDoc.get("matchNumber"),
                firstState: 0,
                secondState: 0,
              })
            } else {
              await setDoc(doc(firestore, "Tournaments", id, "Rounds", docu.id, "Matches", matchDoc.id), {
                first: matchDoc.get("first"),
                second: winner,
                matchNumber: matchDoc.get("matchNumber"),
                firstState: 0,
                secondState: 0,
              })
            }
          })
        })
      } else {
        currentTeams[x+1][Math.floor(y/2)] = '?'
        winnersArray[x][y] = 0
        winnersArray[x][y-1] = 0
        var roundQuery = query(collection(firestore, "Tournaments", id, "Rounds"), where("roundNumber", "==", x+1))
        var roundRef = await getDocs(roundQuery)
        roundRef.forEach(async (docu) => {
          const matchQuery = query(collection(firestore, "Tournaments", id, "Rounds", docu.id, "Matches"), where("matchNumber", "==", Math.ceil((y+1)/2)))
          let matchesCollectionRef = await getDocs(matchQuery);
          matchesCollectionRef.forEach(async (matchDoc) => {
            await setDoc(doc(firestore, "Tournaments", id, "Rounds", docu.id, "Matches", matchDoc.id), {
              first: matchDoc.get("first"),
              second: matchDoc.get("second"),
              matchNumber: matchDoc.get("matchNumber"),
              firstState: 0,
              secondState: 0,
            })
          })
        })
        roundQuery = query(collection(firestore, "Tournaments", id, "Rounds"), where("roundNumber", "==", x+2))
        roundRef = await getDocs(roundQuery)
        roundRef.forEach(async (docu) => {
          const matchQuery = query(collection(firestore, "Tournaments", id, "Rounds", docu.id, "Matches"), where("matchNumber", "==", Math.ceil((y+1)/4)))
          let matchesCollectionRef = await getDocs(matchQuery);
          matchesCollectionRef.forEach(async (matchDoc) => {
            await setDoc(doc(firestore, "Tournaments", id, "Rounds", docu.id, "Matches", matchDoc.id), {
              first: "?",
              second: "?",
              matchNumber: matchDoc.get("matchNumber"),
              firstState: 0,
              secondState: 0,
            })
          })
        })
      }
    }
    setWinners(winnersArray)
  };


  useEffect(()=> {
    firebase_query();
  }, []);



console.log("Probobaly rendering")
  return (
    <Row className="d-flex align-items-center">
      {rounds.map(function (x, xindex) {
        if (xindex+1 == Math.log2(newNumTeams)+1) {
          return (
            <Col key={xindex}>
              {x.map(function (y, yindex) {
                return (
                  <div className="bracket-game" key={yindex}>
                    <div className="player top">
                      {y} wins!
                    </div>
                  </div>
                )
              })}
            </Col>
          )
        } else if (xindex == 0) {
          return (
            <Col key={xindex}>
              {x.map(function (y, yindex) {
                if (yindex==0) {
                  return (
                    <div className="bracket-game top" key={yindex}>
                      <div className="player top" style={{
                        backgroundColor: colors[winners[xindex][yindex]]
                      }} onClick={() => handleClick(xindex, yindex)}>
                        {y}
                        <div className="score">
                          0
                        </div>
                      </div>
                    </div>
                  )
                } else if (yindex%2==0) {
                  return (
                    <div className="bracket-game" key={yindex}>
                    <div className="player top" style={{
                      backgroundColor: colors[winners[xindex][yindex]]
                    }} onClick={() => handleClick(xindex, yindex)}>
                        {y}
                        <div className="score">
                          0
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  if ((yindex+1)%4==0) {
                    return (
                      <div className="bracket-game" key={yindex}>
                      <div className="player bot" style={{
                        backgroundColor: colors[winners[xindex][yindex]]
                      }} onClick={() => handleClick(xindex, yindex)}>
                          {y}
                          <div className="score">
                            0
                          </div>
                        </div>
                        <p></p>
                      </div>
                    )
                  } else {
                    return (
                      <div className="bracket-game" key={yindex}>
                      <div className="player bot" style={{
                        backgroundColor: colors[winners[xindex][yindex]]
                      }} onClick={() => handleClick(xindex, yindex)}>
                          {y}
                          <div className="score">
                            0
                          </div>
                        </div>
                        <p></p>
                      </div>
                    )
                  }
                }
              })}
            </Col>
          )
        } else {
          return (
            <Col key={xindex}>
              {x.map(function (y, yindex) {
                if (yindex==0) {
                  return (
                    <div className="bracket-game top" key={yindex}>
                    <div className="player top" style={{
                      backgroundColor: colors[winners[xindex][yindex]]
                    }} onClick={() => handleClick(xindex, yindex)}>
                        {y}
                        <div className="score">
                          0
                        </div>
                      </div>
                    </div>
                  )
                } else if (yindex%2==0) {
                  return (
                    <div className="bracket-game" key={yindex}>
                    <div className="player top" style={{
                      backgroundColor: colors[winners[xindex][yindex]]
                    }} onClick={() => handleClick(xindex, yindex)}>
                        {y}
                        <div className="score">
                          0
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  if ((yindex+1)%4==0) {
                    return (
                      <div className="bracket-game" key={yindex}>
                      <div className="player bot" style={{
                        backgroundColor: colors[winners[xindex][yindex]]
                      }} onClick={() => handleClick(xindex, yindex)}>
                          {y}
                          <div className="score">
                            0
                          </div>
                        </div>
                        <p></p>
                      </div>
                    )
                  } else {
                    return (
                      <div className="bracket-game" key={yindex}>
                      <div className="player bot" style={{
                        backgroundColor: colors[winners[xindex][yindex]]
                      }} onClick={() => handleClick(xindex, yindex)}>
                          {y}
                          <div className="score">
                            0
                          </div>
                        </div>
                        <p></p>
                      </div>
                    )
                  }
                }
              })}
            </Col>
          )
        }
      })}
    </Row>
  )
}

export default View;
