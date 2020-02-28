import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider }from 'react-redux';
import { createBrowserHistory } from "history";
import store from "./store";


// core components
import Admin from "layouts/Admin.jsx";
import Auth from "layouts/Auth.jsx";
import RTL from "layouts/RTL.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

class App extends Component{
  render(){
    return(
      <Provider store={ store }>
        <BrowserRouter history={hist}  >
          <Switch>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/auth" component={Auth} />
              <Route path="/rtl" component={RTL} />
              <Redirect to="/admin/dashboard" />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </Switch>
        </BrowserRouter>
        </Provider>
    )
  }
}
ReactDOM.render(<App/>, document.getElementById("root"));

