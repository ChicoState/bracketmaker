import React from "react"

import Ribbon from "./Ribbon"
import TeamCards from "./TeamCards"
import PlayerCards from "./PlayerCards"
import PlayerStats from "./PlayerStats"

//TODO
// 1) back button at each state to previous state or  Nav bar with Hyperlinks
// 2) sort the player list somehow - maybe a grid where you can sort by name, or position
// 3) build out the player card like its a baseball card, try to make it pretty


// Idea - it would be nice to approach this as a in game aid for the viewer
// could be based on the active lineup on both sides? 



class App extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            drillDown: 'searchYear',
            data: [], //player data
            seasonHittingData: [],
            seasonPitchingData: [],
            careerHittingData: [],
            careerPitchingData: [],
            projHittingData: [],
            projPitchingData: []
        }
        this.handleTeamClick = this.handleTeamClick.bind(this);
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        //states to move through the levels of drill down
            //searchYear
            //selectTeam
            //selectPlayer
            //viewPlayerStats
    }

    handleTeamClick(teamID){
        this.getPlayers(teamID)
    }

    handlePlayerClick(playerID){
        this.getPlayer(playerID);
    }

    handleSubmit(event){
        this.getTeams();
        event.preventDefault();
    }

    //TODO change these urls to const variables for clearing code
    getTeams(){
        let rosterYear = document.getElementById('RosterYear').value;                
        fetch(`https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27${rosterYear}%27`)
            .then(prom =>prom.json())
            .then(data => {  
                console.log('set state select team')
                console.log(data.team_all_season.queryResults.row)
                this.setState({
                    drillDown: 'selectTeam',
                    data: data.team_all_season.queryResults.row
                });
            })
            .catch(err => console.log('Error: '+err));
    }

    getPlayers(teamID){
        let rosterYear = document.getElementById('RosterYear').value;
        fetch(`https://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season=%27${rosterYear-1}%27&end_season=%27${rosterYear}%27&team_id=%27${teamID}%27`)
            .then(response => response.json())
            .then(data => {
                console.log(data.roster_team_alltime.queryResults.row)
                this.setState({
                    drillDown: 'selectPlayer',
                    data: data.roster_team_alltime.queryResults.row
                })
            })
            .catch(err => console.log('Error: '+err));
    }

    getPlayer(playerID){
        let rosterYear = document.getElementById('RosterYear').value;
        //Sample PlayerID --> Madison Bumgarner: 518516

        //Define all of the URLS
            //player info          http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code=%27mlb%27&player_id=%27493316%27
            const playerInfoAPI = `https://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code=%27mlb%27&player_id=%27${playerID}%27`
                /*
                    name_nick
                    primary_stat_type
                    status
                */
            
            //season hitting http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%272017%27&player_id=%27493316%27
            const seasonHittingAPI = `https://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%27${rosterYear}%27&player_id=%27${playerID}%27`
            
            //season pitching 
            const seasonPitchingAPI = `https://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%27${rosterYear}%27&player_id=%27${playerID}%27`
            //Sample PlayerID --> Madison Bumgarner: 518516
            /*
                
               g  - Games
               gs - Games Started
               qs -  Quality Starts
               bqs - Blown Quality Starts
               ip - Innings Pitched
                
                Total Batters
               so - Strike Outs
               bb - Base on Balls 
               np - Total Pitches
               hb - hit batters

               h   - Hits
               db  - Doubles
                Tripples
               hr   - Home Runs
               gs   - Grand Slams
               r    - Runs
               er   - Earned Runs
               gidp - GIDP (ground into douple play)


                bb9 - BB/9
                k9 - k/9 strikes ber inning 
                kbb - strike to walk ratio
                rs9 - rs/9
                h9  - H/9
                hr9 - HR/9
            */

            //career hitting 'http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%'+playerID+'%27'
            const careerHittingAPI = `https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%27${playerID}%27`
            
            //career pitching  http://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id='592789'
            const careerPitchingAPI =`https://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%27${playerID}%27`
            
            //projected hitting https://appac.github.io/mlb-data-api-docs/#stats-data-projected-hitting-stats-get
            const projectedHittingAPI =`https://lookup-service-prod.mlb.com/json/named.proj_pecota_batting.bam?season=%27${rosterYear}%27&player_id=%27${playerID}%27`
            
            //projected pitching https://appac.github.io/mlb-data-api-docs/#stats-data-projected-pitching-stats-get
            const projectedPitchingAPI = `https://lookup-service-prod.mlb.com/json/named.proj_pecota_pitching.bam?season=%27${rosterYear}%27&player_id=%27${playerID}%27`      

            //initialize and array as a collection of all of the urls
            let urls = [
                playerInfoAPI,
                seasonHittingAPI,
                seasonPitchingAPI,
                careerHittingAPI,
                careerPitchingAPI,
                projectedHittingAPI,
                projectedPitchingAPI
            ]

            //iterate over the array to fetch all of the URLs
            let requests = urls.map(url => fetch(url));

            //use promises.all to wait for a response from all of the fetch promises
           Promise.all(requests)
            .then(function (responses) {
                return Promise.all(responses.map(function (response) {
                    return response.json()
                }))
            })
            .then(data => {
               console.log(data)
                this.setState({
                    drillDown: 'playerStats',
                    data:               data[0].player_info.queryResults.row,
                    seasonHittingData:  data[1].sport_hitting_tm.queryResults.row,
                    seasonPitchingData: data[2].sport_pitching_tm.queryResults.row,
                    careerHittingData:  data[3].sport_career_hitting.queryResults.row,
                    careerPitchingData: data[4].sport_career_pitching.queryResults.row,
                    projHittingData:    data[5].proj_pecota_batting.queryResults.row,
                    projPitchingData:   data[6].proj_pecota_pitching.queryResults.row
                })
            })
            .catch(error => console.log(`error: ${error}`))        
    }
    
    render(){
        const drillDown= this.state.drillDown;
        const data = this.state.data;
        const seasonPitchingData = this.state.seasonPitchingData;
        let ribbon;
        let dataDisplay = [];

        //ribbon here is a React Component
        ribbon=
        <Ribbon
            //Search bar props
            onSubmit= {this.handleSubmit}

           // parentDivClassName='form-group'
            labelFor='MLB Roster Year'            
            label= 'MLB Year'
            searchBartype='number'
            searchBarClassName='form-control'
            searchBarID='RosterYear'
            //placeholder=
            defaultValue='2021'
            

            //Submit Button props
            buttonClassName='btn btn-outline-primary data-bs-toggle="button"'
            />

        switch(drillDown){
            //TODO here you need to reference teamCard as a component
            case 'searchYear':
                //TODO depricate this later
                dataDisplay.push(<div></div>)

            break;
            case 'selectTeam':
                dataDisplay = data.map((teamData)=>{
                    //add other parameters from the JSON here!
                    const{
                            name_display_full,
                            mlb_org_brief,
                            venue_name,
                            division_abbrev,
                            mlb_org_id,
                            address_city,
                            state
                        } = teamData;
                    
                    return(
                        //and then here!
                        <div className='container'>
                            <TeamCards 
                                teamName={name_display_full}
                                name={mlb_org_brief}
                                venueName={venue_name}
                                league={division_abbrev}
                                city = {address_city}
                                state={state}

                                onClick={() => this.handleTeamClick(mlb_org_id)}
                                />
                        </div>
                    )
                })
            break;
            case 'selectPlayer':      
                dataDisplay = data.map((playerData)=>{
                    const{
                        name_first_last,
                        throws,
                        bats,
                        height_feet,
                        height_inches,
                        player_id,
                        position_desig,
                        primary_position,
                        jersey_number
                    }=playerData;
                    return(
                        <PlayerCards
                            playerName={name_first_last}
                            bats={bats}S
                            throws={throws}
                            height_feet={height_feet}
                            height_inches={height_inches}

                            posDes={position_desig}
                            primPos={primary_position}
S                            jerseyNumber={jersey_number}
                            onClick={() => this.handlePlayerClick(player_id)}
                        />
                    )
                })
                break;
                case 'playerStats':    
                const inches = data['height_in']           

                dataDisplay=                         
                    <PlayerStats
                        name= {data['name_display_first_last']}
                        age={data['age']}
                        ft={data['height_feet']}
                        in={inches}
                        weight={data['weight']}
                        jerseyNumber={data['jersey_number']}
  /* 7/13/20 ready to add the props in to display the data, just look it over to get the syntax right for eeach datapoint.                        
  //                      games={seasonPitchingData['g']}
  //                      gamesStarted={seasonPitchingData['gs']}
  //                      qualityStarts={seasonPitchingData['qs']}
  //                      blownQualityStarts={seasonPitchingData['bqs']}
  //                      inningsPitched={seasonPitchingData['ip']}
*/                              
                    />
                        
                break;
        }

        return(
            <div>
               {ribbon}
               {dataDisplay}
            </div>
           )
    }

}

export default App