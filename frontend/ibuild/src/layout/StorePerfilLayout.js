import React, { Component } from 'react';
import request from "../config";

class StorePerfilLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {
        name: '',
        email: '',
        createAt: '',
        cnpj: ''
      }
    };

    this.getStore();
  }

  getStore() {
    const method = 'GET';
    const path = '/stores';
    request(path, method, this.state.auth, {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('storeToken')
    }).then(response => {
      if (response.ok)
        response.json().then(data => {
          this.setState({ store: data });
        });
      else
        console.log('Error!');
    });
  }

  render() {
    return (
      <section className="main-content">
        <div className="container">
          <div className="row">
            <div className="span4">
              <h4 className="title"></h4>
            </div>
            <div className="span8">
              <h4 className="title"><span className="text"><strong>informações</strong> da loja</span></h4>
              <div className="span6">
                <address style={{ fontSize: '16px' }}>
                  <strong>Nome: </strong><span>{this.state.store.name}</span><br />
                  <strong>Email: </strong><span>{this.state.store.email}</span><br />
                  <strong>Criado em: </strong><span>{this.state.store.createAt}</span><br />
                  <strong>CNPJ: </strong><span>{this.state.store.cnpj}</span><br />
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default StorePerfilLayout;