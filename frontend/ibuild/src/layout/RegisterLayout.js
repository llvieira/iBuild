import React, { Component } from 'react';
import request from "../config";
import { history } from '../config/history'

class RegisterLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        email: '',
        password: ''
      },
      user: {
        name: '',
        email: '',
        cnpj: '',
        password: '',
        confirmPassword: '',
      },
      cnpj: {
        show: false
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

  changeAuthProperty(porpertyName) {
    return event => {
      const value = event.target.value;
      const auth = {
        ...this.state.auth
      };

      auth[porpertyName] = value;
      this.setState({ auth });
    }
  }

  auth(e) {
    e.preventDefault();
    const method = 'POST';
    const path = '/auth';
    request(path, method, this.state.auth, {
      "Content-Type": "application/json"
    }).then(response => {
      console.log('passou');
      if (response.ok)
        response.json().then(data => {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('userToken', data.token);
          this.props.loginUser(data.user);
          history.push('/');
        });
      else
        response.json().then(data => {
          this.setState({ alertLogin: { show: true, text: data.error } });
        });
    }).catch(error => {
      this.setState({ alertLogin: { show: true, text: error.toString() } });
    });
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
      this.setState({ user, cnpj });
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
        response.json().then(data => {
          this.setState({ alertRegister: { show: true, text: data.error } });
        });
    }).catch(error => {
      this.setState({ alertRegister: { show: true, text: error.toString() } });
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
    } else {
      this.setState({ alertRegister: { show: true, text: 'Passwords not equals!' } });
    }
  }

  showCnpj() {
    const user = {
      ...this.state.user
    };
    const cnpj = {
      ...this.state.cnpj
    };

    cnpj.show = !cnpj.show;
    this.setState({ user, cnpj });
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
              <div className="alert alert-warning" style={this.state.alertLogin.show ? undefined : { display: 'none' }}>
                {this.state.alertLogin.text}
              </div>
              <form onSubmit={this.auth.bind(this)}>
                <input type="hidden" name="next" value="/" />
                <fieldset>
                  <div className="control-group">
                    <label className="control-label">Email</label>
                    <div className="controls">
                      <input type="email" placeholder="Coloque seu email" className="input-xlarge" value={this.state.auth.email} onChange={this.changeAuthProperty("email").bind(this)} />
                    </div>
                  </div>
                  <div className="control-group">
                    <label className="control-label">Senha</label>
                    <div className="controls">
                      <input type="password" placeholder="Coloque sua senha" className="input-xlarge" value={this.state.auth.password} onChange={this.changeAuthProperty("password").bind(this)} />
                    </div>
                  </div>
                  <div className="control-group">
                    <input className="btn btn-inverse large" type="submit" value="Login" />
                    <hr></hr>
                    <p className="reset">Recupere sua <a className="link" title="Recover your username or password">senha</a></p>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="span7">
              <h4 className="title"><span className="text"><strong>Registro</strong> Form</span></h4>
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
                  <div className="control-group" style={{ display: (this.state.cnpj.show) ? 'block' : 'none' }}>
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
                    <label className="control-label">Confirmar senha:</label>
                    <div className="controls">
                      <input type="password" placeholder="Confirme sua senha" className="input-xlarge" value={this.state.user.confirmPassword} onChange={this.changeProperty("confirmPassword").bind(this)} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '8px' }}><input style={{ margin: '0 10px 2px 0' }} type="checkbox" onClick={this.showCnpj.bind(this)} /><span>Cadastrar Loja</span></div>
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

export default RegisterLayout;