import React from "react";
import RegisterUserLayout from './RegisterUserLayout';

const RegisterLayout = ({children}) => (
    <div className="jumbotron" style={{textAlign: "center", width: "50%", margin: "2% auto"}}>
        <h1 style={{fontWeight: "bold"}}>iBuild</h1>
        <RegisterUserLayout></RegisterUserLayout>
    </div>
);

export default RegisterLayout;