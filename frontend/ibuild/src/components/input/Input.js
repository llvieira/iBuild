import React from "react";

const Input = ({ placeholder, type, required, changeProperty, value, name, pattern, showError }) => (
    <div>
        <div className="input-group mb-3">
            <div className="input-group-prepend hide-xs">
                <span className="input-group-text" id="basic-addon1">{name}</span>
            </div>
            <input type={type} className="form-control" 
                placeholder={placeholder} required={required}
                aria-label={name} aria-describedby="basic-addon1"
                pattern={pattern} onChange={changeProperty} value={value}/>
        </div>
        {showError() ? (
                <div className="alert alert-danger" role="alert">
                    As senhas devem ser iguais!
                </div>) 
                : ""
        }
    </div>
);

export default Input;
