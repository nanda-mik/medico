import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null ;
    const inputClasses = ["InputElement"];
    let validationError = null;

    if(props.invalid&&props.touched){
    validationError = <p className="Error">Please enter a valid value!!</p>
        inputClasses.push("Invalid");
    }
    switch(props.elementType){
        case('input'):
         inputElement = <input
         className={inputClasses.join(' ')}
         {...props.elementConfig}
         value={props.value}
         onChange={props.changed}/>;
        break;
        default:
         inputElement = <input
         className={inputClasses.join(' ')}
         {...props.elementConfig}
         value={props.value}
         onChange={props.changed}/>;
        break;
    }
    return(
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );

}

export default input;