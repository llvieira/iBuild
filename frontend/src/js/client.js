import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./layouts/Layout";
import RegisterUserLayout from "./layouts/RegisterUserLayout";
import SuccessLayout from "./layouts/SuccessLayout";

const app = document.getElementById("app");

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={RegisterUserLayout}></IndexRoute>
            <Route path="success" name="success" component={SuccessLayout}></Route>
        </Route>
    </Router>
,app);