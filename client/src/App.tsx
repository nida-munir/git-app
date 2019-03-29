import React, { Component } from "react";

import "./App.css";
// import Login from "./components/Login/Login";
import Welcome from "../src/components/Welcome/Welcome";

import { Switch, Route, BrowserRouter } from "react-router-dom";
import GistList from "./components/GistList/GistList";
import Greeting from "./components/Greeting/Greeting";
import NotebookList from "./components/NotebookList/NotebookList";
import FilesList from "./components/FilesList/FilesList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <main className="container">
              <Switch>
                <Route path="/greeting" component={Greeting} />
                <Route path="/notebooks" component={NotebookList} />
                <Route path="/files" component={FilesList} />
                <Route path="/user" component={GistList} />
                <Route path="/" component={Welcome} />
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
