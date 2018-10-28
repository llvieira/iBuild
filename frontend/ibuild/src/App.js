import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import RegisterUserLayout from './layout/product/RegisterLayout'
import { history } from './config/history';
import SuccessLayout from './layout/SuccessLayout';
import RegisterStoreLayout from "./layout/store/RegisterStoreLayout";
import ProductsLayout from './layout/ProductsLayout';
import InitialLayout from './layout/InitialLayout';
import RegisterLayout from './layout/RegisterLayout';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      userMenuAuth: [{ optionName: 'My account', path: '/' }],
      userMenuOpen: [{ optionName: 'Registro', path: '/register' }, { optionName: 'Login', path: '/register' }]
    };
  }

  loginUser(user) {
    this.setState({ user });
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.setState({ user: undefined });
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <div id="top-bar" className="container">
            <div className="row">
              <div className="account pull-right">
                <ul className="user-menu">
                  {(this.state.user ? this.state.userMenuAuth : this.state.userMenuOpen).map(elem =>
                    <li key={elem.optionName}><a className="link" onClick={() => history.push(elem.path)}>{elem.optionName}</a></li>
                  )}
                  {this.state.user ? <li><a className="link" onClick={() => this.logoutUser()}>Logout</a></li> : undefined}
                  {this.state.user ? <li>{'Logged user: ' + this.state.user.name}</li> : undefined}
                </ul>
              </div>
            </div>
          </div>
          <div id="wrapper" className="container">
            <section className="navbar main-menu">
              <div className="navbar-inner main-menu">
                <a className="logo pull-left link" onClick={() => history.push('/')}><img src="themes/images/logo.png" className="site-logo" alt=""></img></a>
                <nav id="menu" className="pull-right">
                  <ul>
                    <li><a className="link" onClick={() => history.push('/products')}>Produtos</a></li>
                    <li><a className="link">Lojas</a></li>
                    <li><a className="link">Top lojas</a></li>
                  </ul>
                </nav>
              </div>
            </section>
            <div>
              <Switch>
                <Route exact path="/" render={(props) => <InitialLayout {...props} />} />
                <Route exact path="/register" render={(props) => <RegisterLayout {...props} loginUser={this.loginUser.bind(this)} />} />
                <Route exact path="/registerProduct" component={RegisterUserLayout} />
                <Route exact path="/registertore" component={RegisterStoreLayout} />
                <Route exact path="/success" component={SuccessLayout} />
                <Route exact path="/products" component={ProductsLayout} />
              </Switch>
            </div>
            <section id="footer-bar">
              <div className="row">
                <div className="span3">
                  <div className="span5">
                    <p className="logo"><img src="themes/images/logo.png" className="site_logo" alt=""></img></p>
                    <p>A melhor aplicacao para você construir!</p>
                    <br />
                  </div>
                </div>
              </div>
            </section>
            <section id="copyright">
              <span>Copyright 2018 All right reserved.</span>
            </section>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
