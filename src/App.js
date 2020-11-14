import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";

import NewPoll from "./components/NewPoll";
import Join from "./components/Join";
import Vote from "./components/Vote";
import History from "./components/History";
import Credits from "./components/Credits";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container narrow-container">
          <Switch>
            <Route path="/" exact>
              <NewPoll />
            </Route>
            <Route path="/join" exact>
              <Join />
            </Route>
            <Route path="/vote/:pollId" exact>
              <Vote />
            </Route>
            <Route path="/view/:pollId" exact>
              <Vote readOnly={true} />
            </Route>
            <Route path="/history" exact>
              <History />
            </Route>
            <Route path="/credits" exact>
              <Credits />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  );
}

export default App;
