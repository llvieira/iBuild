import React from "react";
import Input from "../components/Input";
import AcceptOrRejectButtons from "../components/AcceptOrRejectButtons";
import request from "../../config";

export default class RegisterUserLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {}
        }
    }

    changeProperty(porpertyName) {
        return value => {
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
            window.location.replace('/#/success')
        });

        return false;
    }

    render() {
        const inputs = [
            <Input key="1" value={this.state.user.name} changeProperty={this.changeProperty("name").bind(this)} name="Nome" type="text" placeholder="Nome" required="true"></Input>,
            <Input key="2" value={this.state.user.email} changeProperty={this.changeProperty("email").bind(this)} name="Email" type="email" placeholder="example@example.com" required="true"></Input>,
            <Input key="3" value={this.state.user.phone} changeProperty={this.changeProperty("phone").bind(this)} name="Phone" type="text" placeholder="(XX) 99999-9999" required="true" pattern="\(\d{2}\)\s\d{5}-\d{4}"></Input>,
            <Input key="4" value={this.state.user.cpf} changeProperty={this.changeProperty("cpf").bind(this)} name="CPF" type="text" placeholder="123.123.123-12" required="true" pattern="\d{3}.\d{3}.\d{3}-\d{2}"></Input>,
            <Input key="5" value={this.state.user.password} changeProperty={this.changeProperty("password").bind(this)} name="Senha" type="password" placeholder="senha" required="true"></Input>,
            <Input key="6" name="Confirmar senha" type="password" placeholder="Confirmar senha" required="true"></Input>
        ];

        return (
            <div>
                <h4>Cadastro de Usuário</h4>
                <form name="registerUser" onSubmit={this.registerUser.bind(this)}>
                    {inputs}
                    <AcceptOrRejectButtons></AcceptOrRejectButtons>
                </form>
            </div>
        );
    }
}