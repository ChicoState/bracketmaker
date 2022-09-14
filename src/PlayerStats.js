//PlayerStats

import React from 'react'

class PlayerStats extends React.Component{
    constructor(props){
        super(props);     
    }
    render() {
        return(
            <div className = "container">
                <div className="card" onClick={this.props.onClick}>    
                    <div className="card-body team-card card-tex">    
                        <div className="row">
                            <div className="col-2 d-flex justify-content-start">
                                <h6>#{this.props.jerseyNumber}</h6>
                            </div>
                            <div className="col">
                                <h6>{this.props.name}</h6>
                            </div>
                        </div>
                        <div className="row cust-card-text-small">
                            <div className="col-2">
                                <p></p>
                            </div>
                            <div className="col">
                                <p>height: {this.props.ft}' {this.props.in}"</p>
                            </div>                        
                            <div className="col">
                                <p>age: {this.props.age}</p>
                            </div>

                            <div className="col">
                                <p>weight: {this.props.weight} lbs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

export default PlayerStats