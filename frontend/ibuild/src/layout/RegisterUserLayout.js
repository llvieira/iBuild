import React from "react";
import Input from "../components/input/Input";
import AcceptButton from "../components/button/AcceptButton";
import request from "../config";

export default class RegisterUserLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {}
        }
    }

    changeProperty(porpertyName) {
        return event => {
            const value = event.target.value;
            this.state.user[porpertyName] = value;
            console.log(this.state.user);
        }
    }

    registerUser(e) {
        e.preventDefault();
        const path = '/auth/register';
        const method = 'POST';
        request(path, method, this.state.user, {
            "Content-Type": "application/json"
        }).then(response => {
            window.location.replace('/success')
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
            <div>
                <h4>Cadastro de Usuário</h4>
                <form name="registerUser" onSubmit={this.registerUser.bind(this)}>
                    {inputs}
                    <AcceptButton></AcceptButton>
                </form>
            </div>
        );
    }
}