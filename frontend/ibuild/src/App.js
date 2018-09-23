import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterUserLayout from './layout/RegisterUserLayout';
import RegisterLayout from './layout/RegisterLayout';
import { history } from './config/history';
import SuccessLayout from './layout/SuccessLayout';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Redirect exact from="/" to="/register/user"/>
          <Route exact path="/register/user" component={RegisterLayout} children={RegisterUserLayout}/>
          <Route exact path="/success" component={SuccessLayout}></Route>
        </Switch>
      </Router>
    );
  }
  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //       <Input key="1" value="name luiz" changeProperty={(() => {console.log("ois")}).bind(this)} name="Nome" type="text" placeholder="Nome" required="true"></Input>
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h1 className="App-title">Welcome to Reactssssssssssss</h1>
  //       </header>
  //       <p className="App-intro">
  //         To get started, edit <code>src/App.js</code> and save to reload.
  //       </p>
  //     </div>
  //   );
  // }
}

export default App;
