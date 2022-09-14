//SearchBar

import React from 'react'

function SearchBar(props){
    return(

                <input 
                    type={props.searchBartype} //"number"
                   // name={props.name}
                    value={props.value}
                    onChange={props.onChange} 
                    className= {props.searchBarClassName} //"form-control" 
                    id= {props.id} //"RosterYear" 
                    placeholder= {props.placeholder} //"Enter a Year" 
                    defaultValue= {props.defaultValue}         //"2020"
                    aria-describedby= {props.discribedBy}

                />
               
    )
}

export default SearchBar