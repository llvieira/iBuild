import React, { Component } from 'react';
import request from "../config";
import { history } from '../config/history'

class NewRegisterUserLayout extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: '',
        email: '',
        cnpj: '',
        password: '',
        confirmPassword: '',
      }, cnpj: {
        show: false
      }
    }
  }

  changeProperty(porpertyName) {
    return event => {
      const value = event.target.value;
      const user = {
        ...this.state.user
      };
      const cnpj = {
        ...this.state.cnpj
      };

      user[porpertyName] = value;
      this.setState({ user , cnpj});
    }
  }

  register(path) {
      const method = 'POST';
      request(path, method, this.state.user, {
        "Content-Type": "application/json"
      }).then(response => {
        if (response.ok)
          history.push('/success');
        else
          console.log('Error!');
      });
  }

  sendRegister(e) {
    e.preventDefault();
    if (this.state.user.password === this.state.user.confirmPassword && !this.state.cnpj.show) {
      const path = '/users/';
      this.register(path);
    } else if (this.state.user.password === this.state.user.confirmPassword && this.state.cnpj.show) {
      const path = '/stores/';
      this.register(path);
    }
    return false;
  }

  showCnpj() {
    const user = {
      ...this.state.user
    };
    const cnpj = {
      ...this.state.cnpj
    };

    cnpj.show = !cnpj.show;
    console.log(cnpj.show);
    this.setState({ user , cnpj });
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
            <div className="span5">
              <h4 className="title"><span className="text"><strong>Login</strong> Form</span></h4>
              <form>
                <input type="hidden" name="next" value="/" />
                <fieldset>
                  <div className="control-group">
                    <label className="control-label">Nome</label>
                    <div className="controls">
                      <input type="text" placeholder="Coloque seu nome" id="username" className="input-xlarge" />
                    </div>
                  </div>
                  <div className="control-group">
                    <label className="control-label">Senha</label>
                    <div className="controls">
                      <input type="password" placeholder="Coloque sua senha" id="password" className="input-xlarge" />
                    </div>
                  </div>
                  <div className="control-group">
                    <input className="btn btn-inverse large" type="submit" value="Login" />
                    <hr></hr>
                    <p className="reset">Recupere sua <a href="#" title="Recover your username or password">senha</a></p>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="span7">
              <h4 className="title"><span className="text"><strong>Registro</strong> Form</span></h4>
              <form className="form-stacked" onSubmit={this.sendRegister.bind(this)} >
                <fieldset>
                  <div className="control-group">
                    <label className="control-label">Nome</label>
                    <div className="controls">
                      <input type="text" placeholder="Coloque seu nome" className="input-xlarge" value={this.state.user.name} onChange={this.changeProperty("name").bind(this)} />
                    </div>
                  </div>
                  <div className="control-group" style={{display: (this.state.cnpj.show) ? 'block' : 'none'}}>
                    <label className="control-label">CNPJ:</label>
                    <div className="controls">
                      <input type="text" placeholder="Coloque o cnpj de sua loja" className="input-xlarge" value={this.state.user.cnpj} onChange={this.changeProperty("cnpj").bind(this)} />
                    </div>
                  </div>
                  <div className="control-group">
                    <label className="control-label">Email:</label>
                    <div className="controls">
                      <input type="email" placeholder="Coloque seu email" className="input-xlarge" value={this.state.user.email} onChange={this.changeProperty("email").bind(this)} />
                    </div>
                  </div>
                  <div className="control-group">
                    <label className="control-label">Senha:</label>
                    <div className="controls">
                      <input type="password" placeholder="Coloque sua senha" className="input-xlarge" value={this.state.user.password} onChange={this.changeProperty("password").bind(this)} />
                    </div>
                  </div>
                  <div className="control-group">
                    <label className="control-label">Comfirmar senha:</label>
                    <div className="controls">
                      <input type="password" placeholder="Comfirme sua senha" className="input-xlarge" value={this.state.user.confirmPassword} onChange={this.changeProperty("confirmPassword").bind(this)} />
                    </div>
                  </div>
                  <div style={{marginBottom: '8px'}}><input style={{margin: '0 10px 2px 0'}} type="checkbox" onClick={this.showCnpj.bind(this)}/><span>Cadastrar Loja</span></div>
                  <div className="control-group">
                    <p>Agora a diversão começa!</p>
                  </div>
                  <hr></hr>
                  <div className="actions"><input className="btn btn-inverse large" type="submit" value="Registrar" /></div>
                </fieldset>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default NewRegisterUserLayout;