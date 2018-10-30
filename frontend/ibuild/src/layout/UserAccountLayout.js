import React, { Component } from 'react';
import request from "../config";
import { history } from '../config/history'

class UserAccountLayout extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('user'));
    this.state = {
      user: {
        name: user.name,
        email: user.email,
        newPassword: '',
        oldPassword: ''
      },
      alertLogin: {
        show: false,
        text: ''
      },
      alertRegister: {
        show: false,
        text: ''
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
      this.setState({ user });
    }
  }

  register(path) {
    const method = 'PUT';
    request(path, method, this.state.user, {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("userToken")
    }).then(response => {
      if (response.ok)
        history.push('/success');
      else
        response.json().then(data => {
          this.setState({ alertRegister: { show: true, text: data.error } });
        });
    }).catch(error => {
      this.setState({ alertRegister: { show: true, text: error.toString() } });
    });
  }

  sendRegister(e) {
    e.preventDefault();
    if (this.state.user.password === this.state.user.confirmPassword) {
      const path = '/users/';
      this.register(path);
    }
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
              <h4 className="title"><span className="text"><strong>Dados de cadastro</strong></span></h4>
              <div className="alert alert-warning" style={this.state.alertRegister.show ? undefined : { display: 'none' }}>
                {this.state.alertRegister.text}
              </div>
              <form className="form-stacked" onSubmit={this.sendRegister.bind(this)} >
                <fieldset>
                  <div className="control-group">
                    <label className="control-label">Nome</label>
                    <div className="controls">
                      <input type="text" placeholder="Coloque seu nome" className="input-xlarge" value={this.state.user.name} onChange={this.changeProperty("name").bind(this)} />
                    </div>
                  </div>
                  <div className="control-group">
                    <label className="control-label">Email:</label>
                    <div className="controls">
                      <input type="email" placeholder="Coloque seu email" className="input-xlarge" value={this.state.user.email} onChange={this.changeProperty("email").bind(this)} />
                    </div>
                  </div>
                  <div className="control-group">
                    <label className="control-label">Senha antiga:</label>
                    <div className="controls">
                      <input type="password" placeholder="Coloque sua senha" className="input-xlarge" value={this.state.user.oldPassword} onChange={this.changeProperty("oldPassword").bind(this)} />
                    </div>
                  </div>
                  <div className="control-group">
                    <label className="control-label">Nova senha:</label>
                    <div className="controls">
                      <input type="password" placeholder="Coloque a nova senha" className="input-xlarge" value={this.state.user.newPassword} onChange={this.changeProperty("newPassword").bind(this)} />
                    </div>
                  </div>
                  <hr></hr>
                  <div className="actions"><input className="btn btn-inverse large" type="submit" value="Salvar" /></div>
                </fieldset>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default UserAccountLayout;