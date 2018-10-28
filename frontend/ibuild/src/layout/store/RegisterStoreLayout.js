import React from "react";
import Input from "../../components/input/Input";
import AcceptButton from "../../components/button/AcceptButton";
import request from "../../config";
import { history } from '../../config/history'

export default class RegisterUserLayout extends React.Component {
    constructor() {
        super();
        this.isValid = false;
        this.state = {
            store: {
                name: '',
                email: '',
                cnpj: '',
                phone: '',
                password: '',
                confirmPassword: '',
            }
        }
    }

    changeProperty(porpertyName) {
        return event => {
            const value = event.target.value;
            const store = {
                ...this.state.store
            };
            store[porpertyName] = value;
            this.setState({ store });
        }
    }

    showError() {
        const { password, confirmPassword } = this.state.store;
        const equals = password === confirmPassword;
        this.isValid = equals;
        return !equals;
    }

    registerStore(e) {
        e.preventDefault();
        if (this.isValid) {
            const path = '/stores/';
            const method = 'POST';
            request(path, method, this.state.store, {
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
                value: this.state.store.name,
                changeProperty: this.changeProperty("name").bind(this),
                name: "Nome",
                type: "text",
                placeholder: "Nome",
                required: true
            }, {
                key: "2",
                showError: () => false,
                value: this.state.store.cnpj,
                changeProperty: this.changeProperty("cnpj").bind(this),
                name: "Cnpj",
                type: "cnpj",
                placeholder: "00.000.000/0000-00",
                required: true
            }, {
                key: "3",
                showError: () => false,
                value: this.state.store.phone,
                changeProperty: this.changeProperty("phone").bind(this),
                name: "Phone",
                type: "phone",
                placeholder: "(00) 00000-0000",
                required: true
            }, {
                key: "4",
                showError: () => false,
                value: this.state.store.email,
                changeProperty: this.changeProperty("email").bind(this),
                name: "Email",
                type: "email",
                placeholder: "example@example.com",
                required: true
            }, {
                key: "5",
                showError: () => false,
                value: this.state.store.password,
                changeProperty: this.changeProperty("password").bind(this),
                name: "Senha",
                type: "password",
                placeholder: "senha",
                required: true
            }, {
                key: "6",
                showError: this.showError.bind(this),
                value: this.state.store.confirmPassword,
                changeProperty: this.changeProperty("confirmPassword").bind(this),
                name: "Confirmar senha",
                type: "password",
                placeholder: "Confirmar senha",
                required: true
            },
        ].map(input => <Input key={input.key} showError={input.showError} value={input.value} changeProperty={input.changeProperty} name={input.name} type={input.type} placeholder={input.placeholder} required={input.required}></Input>);

        return (
            <div className="register-layout">
                <div className="shadow">
                    <div className="background-top">
                        <h4 style={{ margin: 0 }}>Criar conta da loja</h4>
                    </div>
                    <div className="background-bottom">
                        <form name="registerStore" onSubmit={this.registerStore.bind(this)}>
                            {inputs}
                            <div className="container">
                                <p>Eu aceito os <a href="https://google.com.br">termos de uso</a></p>
                                <AcceptButton></AcceptButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}