import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/*
 * styles
 */
import "./styles/AppStyles.scss";

/*
 * components
 */

/*
 * views
 */
import LandingView from "./views/LandingView";

const App = (props) => {
  return (
    <div className="app-view">
      <Router>
        <Switch>
          <Route path="/">
            <LandingView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
