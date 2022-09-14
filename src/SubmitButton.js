//SubmitButton
import React from "react"


function SubmitButton(props){
    return(
        //TODO - pass these down from ribbon and from app

       //<input type="submit" value="Submit" />
        <button 
            type='submit'
            className= {props.className} //'btn btn-outline-primary'
            id="btnOK"
            role= "submit"
            >Go
            </button>
    )
}

export default SubmitButton