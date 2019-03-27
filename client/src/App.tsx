import React, { Component } from "react";

import "./App.css";
import Login from "./components/Login/Login";

import { Switch, Route, BrowserRouter } from "react-router-dom";
import GistList from "./components/GistList/GistList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <main className="container">
              <Switch>
                <Route path="/user" component={GistList} />
                <Route path="/" component={Login} />
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
