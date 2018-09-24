import React from "react";
import Input from "../components/input/Input";
import AcceptButton from "../components/button/AcceptButton";
import request from "../config";
import { history } from '../config/history'
import './layout.css';

export default class RegisterUserLayout extends React.Component {
    constructor() {
        super();
        this.isValid = false;
        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        }
    }

    changeProperty(porpertyName) {
        return event => {
            const value = event.target.value;
            const user = {
                ...this.state.user
            };
            user[porpertyName] = value;
            this.setState({user});
        }
    }

    showError() {
        const {password, confirmPassword} = this.state.user
        const equals = password === confirmPassword;
        this.isValid = equals; 
        return !equals;
    }

    registerUser(e) {
        e.preventDefault();
        if (this.isValid) {
            const path = '/auth/register';
            const method = 'POST';
            request(path, method, this.state.user, {
                "Content-Type": "application/json"
            }).then(response => {
                if (response.ok)
                    history.push('/success');
            });
        }

        return false;
    }

    render() {
        const inputs = [
            {   
                key: "1",
                showError: () => false,
                value: this.state.user.name,
                changeProperty: this.changeProperty("name").bind(this),
                name: "Nome",
                type: "text",
                placeholder: "Nome",
                required: true
            }, {
                key: "2",
                showError: () => false,
                value: this.state.user.email,
                changeProperty: this.changeProperty("email").bind(this),
                name: "Email",
                type: "email",
                placeholder: "example@example.com",
                required: true
            }, {
                key: "3",
                showError: () => false,
                value: this.state.user.password,
                changeProperty: this.changeProperty("password").bind(this),
                name: "Senha",
                type: "password",
                placeholder: "senha",
                required: true
            }, {
                key: "4",
                showError: this.showError.bind(this),
                value: this.state.user.confirmPassword,
                changeProperty: this.changeProperty("confirmPassword").bind(this),
                name: "Confirmar senha",
                type: "password",
                placeholder: "Confirmar senha",
                required: true
            },
        ].map(input => <Input key={input.key} showError={input.showError} value={input.value} changeProperty={input.changeProperty} name={input.name} type={input.type} placeholder={input.placeholder} required={input.required}></Input>);

        return (
            <div className="shadow">
                <div className="background-top">
                    <h4 style={{margin: 0}}>Criar conta</h4>
                </div>
                <div className="background-bottom">
                    <form name="registerUser" onSubmit={this.registerUser.bind(this)}>
                        {inputs}
                        <div className="container">
                            <p>Eu aceito os <a href="https://google.com.br">termos de uso</a></p>
                            <AcceptButton></AcceptButton>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}