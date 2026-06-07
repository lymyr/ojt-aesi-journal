import { useState } from "react";
import { useEffect } from "react";

function TextInput({ type='text', label, hint="", id, required=false, value, onChange}) {
 
    let inputElement = null;
    if (!required) {
        inputElement = (<input type={type} placeholder={hint} id={id} value={value} onChange={onChange}/>);
    }
    else {
        inputElement = (<input type={type} placeholder={hint} id={id}  value={value} onChange={onChange} required/>);
    }
    return (
        <div>
            <label htmlFor={id} style={{ textAlign: 'right'}}>{label}</label>
            {inputElement}
        </div>
    );
}

export default TextInput;
