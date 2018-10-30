import React, { Component } from 'react';
import request from "../config";
import { history } from '../config/history'

class UpdateStoreLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: {
                name: '',
                email: '',
                cnpj: '',
                password: '',
                confirmPassword: '',
            }
        }

        console.log(this.getStore());

        console.log(this.state.store);

    }

    getStore() {
        const method = 'get';
        const path = '/stores';
        request(path, method, this.state.auth, {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZDdhNGE3MmM1YWEwMGIyN2NiODdlMCIsImlhdCI6MTU0MDg1OTA3MiwiZXhwIjoxNTQwOTQ1NDcyfQ.qAG6DeTMTcrckvY-pLZUT7KbH30MbGgcLphJGIx3bas"
        }).then(response => {
            if (response.ok)
                response.json().then(data => {
                  console.log(data);
                    this.state.store = data;
                    const store = {
                        ...this.state.store
                    };

                    this.setState({ store });
                    });
            else
                console.log('Error!');
        });
    }

    changeProperty(porpertyName) {
        return event => {
            const value = event.target.value;
            const store = {
                ...this.state.store
            };
            const cnpj = {
                ...this.state.cnpj
            };

            store[porpertyName] = value;
            this.setState({ store, cnpj });
        }
    }

    update(path) {
        const method = 'PUT';
        request(path, method, this.state.store, {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+JSON.parse(localStorage.getItem('userToken')),
        }).then(response => {
            if (response.ok)
                history.push('/success');
            else
                response.json().then(data => {
                    console.log(data);
                });
        });
    }

    sendRegister(e) {
        e.preventDefault();
        if (this.state.store.password === this.state.store.confirmPassword) {
            const path = '/stores/';
            this.update(path);
        }
        return false;
    }


    render() {
        return (
            <div>
                <section className="header_text sub">
                    <img className="pageBanner" src="themes/images/pageBanner.png" alt="New products" />
                    <h4><span>Login ou Registro</span></h4>
                </section>
                <section className="main-content">
                    <div className="row">

                        <div className="span7">
                            <h4 className="title"><span className="text"><strong>Atualização</strong> Loja</span></h4>
                            <form className="form-stacked" onSubmit={this.sendRegister.bind(this)} >
                                <fieldset>
                                    <div className="control-group">
                                        <label className="control-label">Nome</label>
                                        <div className="controls">
                                            <input type="text" placeholder="Coloque seu nome" className="input-xlarge" value={this.state.store.name} onChange={this.changeProperty("name").bind(this)} />
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label">Email:</label>
                                        <div className="controls">
                                            <input type="email" placeholder="Coloque seu email" className="input-xlarge" value={this.state.store.email} onChange={this.changeProperty("email").bind(this)} />
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label">Senha:</label>
                                        <div className="controls">
                                            <input type="password" placeholder="Coloque sua senha" className="input-xlarge" value={this.state.store.password} onChange={this.changeProperty("password").bind(this)} />
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label">Confirmar senha:</label>
                                        <div className="controls">
                                            <input type="password" placeholder="Confirme sua senha" className="input-xlarge" value={this.state.store.confirmPassword} onChange={this.changeProperty("confirmPassword").bind(this)} />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="actions"><input className="btn btn-inverse large" type="submit" value="Atualizar" /></div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default UpdateStoreLayout;