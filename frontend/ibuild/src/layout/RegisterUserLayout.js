import React from "react";
import Input from "../components/input/Input";
import AcceptButton from "../components/button/AcceptButton";
import request from "../config";
import { history } from '../config/history'
import './layout.css';

export default class RegisterUserLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                name: '',
                email: '',
                password: ''
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

    registerUser(e) {
        e.preventDefault();
        const path = '/auth/register';
        const method = 'POST';
        request(path, method, this.state.user, {
            "Content-Type": "application/json"
        }).then(response => {
            history.push('/success');
        });

        return false;
    }

    render() {
        const inputs = [
            <Input key="1" value={this.state.user.name} changeProperty={this.changeProperty("name").bind(this)} name="Nome" type="text" placeholder="Nome" required={true}></Input>,
            <Input key="2" value={this.state.user.email} changeProperty={this.changeProperty("email").bind(this)} name="Email" type="email" placeholder="example@example.com" required={true}></Input>,
            <Input key="5" value={this.state.user.password} changeProperty={this.changeProperty("password").bind(this)} name="Senha" type="password" placeholder="senha" required={true}></Input>,
            <Input key="6" name="Confirmar senha" type="password" changeProperty={() => {}} placeholder="Confirmar senha" required={true}></Input>
        ];

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