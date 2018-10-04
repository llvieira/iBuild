import React from "react";
import Input from "../../components/input/Input";
import AcceptButton from "../../components/button/AcceptButton";
import request from "../../config";
import { history } from '../../config/history'

export default class RegisterProductLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            product: {
                img: '',
                title: '',
                value: '0.0',
            }
        }
    }

    changeProperty(porpertyName) {
        return event => {
            const value = event.target.value;
            const product = {
                ...this.state.product
            };
            product[porpertyName] = value;
            this.setState({product});
        }
    }

    registerProduct(e) {
        e.preventDefault();
        // if (this.isValid) {
            // const path = '/stores/:id/items'; // how about that ID???
            // const method = 'POST';
            // request(path, method, this.state.product, {
                // "Content-Type": "application/json"
            // }).then(response => {
                // if (response.ok)
                    history.push('/success');
            // });
        // }

        return false;
    }

    render() {
        const inputs = [
            {   
                key: "1",
                showError: () => false,
                value: this.state.product.img,
                changeProperty: this.changeProperty("img").bind(this),
                name: "Imagem",
                type: "text",
                placeholder: "Imagem",
                required: false
            }, {
                key: "2",
                showError: () => false,
                value: this.state.product.title,
                changeProperty: this.changeProperty("title").bind(this),
                name: "Título",
                type: "text",
                placeholder: "Título",
                required: true
            }, {
                key: "3",
                showError: () => false,
                value: this.state.product.value,
                changeProperty: this.changeProperty("value").bind(this),
                name: "Valor",
                type: "text",
                placeholder: "Valor",
                pattern: "^[0-9]+[.][0-9]+$",
                required: true
            },
        ].map(input => <Input key={input.key} showError={input.showError} value={input.value} changeProperty={input.changeProperty} name={input.name} type={input.type} placeholder={input.placeholder} required={input.required} pattern={input.pattern}></Input>);

        return (
            <div className="shadow">
                <div className="background-top">
                    <h4 style={{margin: 0}}>Adicionar produto</h4>
                </div>
                <div className="background-bottom">
                    <form name="registerUser" onSubmit={this.registerProduct.bind(this)}>
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