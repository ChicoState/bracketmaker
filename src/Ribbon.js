//Ribbon

import React from 'react'

import SubmitButton from "./SubmitButton"
import InputBar from "./InputBar"

class Ribbon extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: ''
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        console.log('change handled');

        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        console.log('A value was submitted: '+ this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.props.onSubmit} id='ribbon'>
                <div className="container">
                <div className='form-row'>
                    <label htmlFor={this.props.labelFor}> {this.props.label} </label>
                </div>
                <div className='form-row'>
                    <div className='form-group col-10'>
                    <InputBar
                        //Ribbon states and props
                        onChange= {this.handleChange}
                        
                        //calling function props
                        searchBartype={this.props.searchBartype}                        
                        searchBarClassName={this.props.searchBarClassName}                      
                        id={this.props.searchBarID}
                        placeholder= {this.props.placeholder}
                        defaultValue={this.props.defaultValue}
                    />
                    </div>
                    <div className='form-group col-2'>
                    <SubmitButton 
                        className={this.props.buttonClassName}
                        />
                    </div>
                </div>
            </div>              
            </form>
        )}
}

export default Ribbon