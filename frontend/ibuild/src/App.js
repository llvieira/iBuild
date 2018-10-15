import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterLayout from './layout/RegisterLayout';
import RegisterUserLayout from './layout/product/RegisterLayout'
import { history } from './config/history';
import SuccessLayout from './layout/SuccessLayout';
import RegisterStoreLayout from "./layout/store/RegisterStoreLayout";
import ProductsLayout from './layout/ProductsLayout';
import Navigation from "./layout/Navigation";

class App extends Component {

    render() {
        return (
            <div>
              <Navigation/>
                <Router history={history}>
                    <Switch>
                        <Redirect exact from="/" to="/register/user"/>
                        <Route exact path="/register/user" component={RegisterLayout}/>
                        <Route exact path="/register/product" component={RegisterUserLayout}/>
                        <Route exact path="/register/store" component={RegisterStoreLayout}/>
                        <Route exact path="/success" component={SuccessLayout}/>
                        <Route exact path="/products" component={ProductsLayout} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
