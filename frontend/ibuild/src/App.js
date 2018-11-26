import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './config/history';
import SuccessLayout from './layout/SuccessLayout';
import ProductsLayout from './layout/ProductsLayout';
import InitialLayout from './layout/InitialLayout';
import RegisterLayout from './layout/RegisterLayout';
import UserAccountLayout from './layout/UserAccountLayout';
import CartLayout from './layout/CartLayout';
import ProductDetail from './layout/ProductDetailLayout';
import FavoriteLayout from "./layout/FavoriteLayout";
import StoreMenuLayout from "./layout/StoreMenuLayout";
import './index.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            store: JSON.parse(localStorage.getItem('store')),
            userMenuAuth: { optionName: 'Minha conta', path: '/userAccount' },
            userMenuAuthStore: [{ optionName: 'Minha Loja', path: '/storeMenu' }],
            userMenuOpen: { optionName: 'Registro/Login - usuário', path: '/registerUser' },
            storeMenuOpen: { optionName: 'Registro/Login - loja', path: '/registerStore' },
            userCartOpen: { optionName: 'Cart', path: '/cart' }
        };
    }

    login(entity, type) {
        if (type === 'user') {
            this.setState({ user: entity });
        } else {
            this.setState({ store: entity });
        }
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
        localStorage.removeItem('store');
        localStorage.removeItem('storeToken');
        this.setState({ user: undefined });
        this.setState({ store: undefined });
        history.push('/');
    }

    editStore() {
        history.push('/updateStore')
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <div id="top-bar" className="container">
                        <div className="row">
                            <div className="account pull-right">
                                <ul className="user-menu">
                                    {!this.state.user && !this.state.store ? <li><a className="link" onClick={() => history.push(this.state.userMenuOpen.path)}>{this.state.userMenuOpen.optionName}</a></li> : undefined}
                                    {!this.state.user && !this.state.store ? <li><a className="link" onClick={() => history.push(this.state.storeMenuOpen.path)}>{this.state.storeMenuOpen.optionName}</a></li> : undefined}
                                    {this.state.user ? <li><a className="link" onClick={() => history.push(this.state.userMenuAuth.path)}>{this.state.userMenuAuth.optionName}</a></li> : undefined}
                                    {this.state.store ? this.state.userMenuAuthStore.map(elem => <li key={elem.path}><a className="link" onClick={() => history.push(elem.path)}>{elem.optionName}</a></li>) : undefined}
                                    {this.state.user || this.state.store ? <li><a className="link" onClick={() => this.logout()}>Logout</a></li> : undefined}
                                    {this.state.user ? <li><a className="link" onClick={() => history.push(this.state.userCartOpen.path)}>{this.state.userCartOpen.optionName}</a></li> : undefined}
                                    {this.state.user ? <li>{'Logged user: ' + this.state.user.name}</li> : undefined}
                                    {this.state.store ? <li>{'Logged store: ' + this.state.store.name}</li> : undefined}
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
                                        <li><a className="link" onClick={() => history.push('/store')}>Lojas</a></li>
                                        <li><a className="link" onClick={() => history.push('/top-stores')}>Top lojas</a></li>
                                        {this.state.user ? <li><a className="link" onClick={() => history.push('/favorites')}>Favoritos</a></li> : undefined}
                                    </ul>
                                </nav>
                            </div>
                        </section>
                        <div>
                            <Switch>
                                <Route exact path="/" render={(props) => <InitialLayout {...props} />} />
                                <Route exact path="/registerUser" render={(props) => <RegisterLayout {...props} type="user" login={this.login.bind(this)} />} />
                                <Route exact path="/registerStore" render={(props) => <RegisterLayout {...props} type="store" login={this.login.bind(this)} />} />
                                <Route exact path="/success" component={SuccessLayout} />
                                <Route exact path="/products" component={ProductsLayout} />
                                <Route exact path="/userAccount" component={UserAccountLayout} />
                                <Route exact path="/productDetail" component={ProductDetail} />
                                <Route exact path="/cart" component={CartLayout} />
                                <Route exact path="/favorites" component={FavoriteLayout} />
                                <Route path="/storeMenu" component={StoreMenuLayout} />
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
