//TeamCards

//TODO
//here is an api with the team logo i think its by team id (137 is Giants?)
//https://www.mlbstatic.com/team-logos/team-cap-on-light/137.svg 

import React from 'react'

class TeamCards extends React.Component{
    constructor(props){
        super(props);     
    }
    render() {
        return(
            <div className="card p-1" onClick={this.props.onClick}>    
                <div className="card-text">
                    <div className="row g-0 ">
                        <div className="col"><h6>{this.props.teamName}</h6></div>
                        <div className="col-3 d-flex justify-content-end">{this.props.league}</div>
                    </div>
                    <div className="row g-0">
                        <div className="col">
                            <p>{this.props.venueName}</p>
                        </div>
                        <div className="col">
                        <p className="d-flex justify-content-end">{this.props.city}, {this.props.state}</p>
                        </div>
                    </div>     
                </div>
            </div>
        );
    }
}

export default TeamCards