import React from "react"

import Ribbon from "./Ribbon"

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
            label= 'Brackemaker'
            searchBartype='number'
            searchBarClassName='form-control'
            searchBarID='RosterYear'
            //placeholder=
            defaultValue='...'
            

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