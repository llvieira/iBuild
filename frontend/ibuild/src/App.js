import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterLayout from './layout/RegisterLayout';
import RegisterUserLayout from './layout/product/RegisterLayout'
import { history } from './config/history';
import SuccessLayout from './layout/SuccessLayout';
import RegisterStoreLayout from "./layout/store/RegisterStoreLayout";
import ProductsLayout from './layout/ProductsLayout';
import InitialLayout from './layout/InitialLayout';
import NewRegisterUserLayout from './layout/NewRegisterUserLayout';
import './index.css';

class App extends Component {

  render() {
    return (
      <div>
        <div id="top-bar" className="container">
          <div className="row">
            <div className="account pull-right">
              <ul className="user-menu">
                <li><a href="/registerUser">Registro</a></li>
                <li><a href="/registerUser">Login</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div id="wrapper" className="container">
          <section className="navbar main-menu">
            <div className="navbar-inner main-menu">
              <a href="/" className="logo pull-left"><img src="themes/images/logo.png" className="site_logo" alt=""></img></a>
              <nav id="menu" className="pull-right">
                <ul>
                  <li><a href="/products">Produtos</a></li>
                  <li><a href="#">Lojas</a></li>
                  <li><a href="#">Top lojas</a></li>
                </ul>
              </nav>
            </div>
          </section>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={InitialLayout} />
              <Route exact path="/registerUser" component={NewRegisterUserLayout} />
              <Route exact path="/oldRegisterUser" component={RegisterLayout} />
              <Route exact path="/registerProduct" component={RegisterUserLayout} />
              <Route exact path="/registertore" component={RegisterStoreLayout} />
              <Route exact path="/success" component={SuccessLayout} />
              <Route exact path="/products" component={ProductsLayout} />
            </Switch>
          </Router>
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
    );
  }
}

export default App;
