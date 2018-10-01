import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterLayout from './layout/RegisterLayout';
import { history } from './config/history';
import SuccessLayout from './layout/SuccessLayout';
import RegisterStoreLayout from "./layout/store/RegisterStoreLayout";

class App extends Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Redirect exact from="/" to="/register/user"/>
                    <Route exact path="/register/user" component={RegisterLayout}/>
                    <Route exact path="/success" component={SuccessLayout}/>
                    <Route exact path="/register/store" component={RegisterStoreLayout}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
