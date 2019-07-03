import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home/Home";
import Info from "./pages/Info/Info";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/info" component = {Info} />

      </Switch>
    </Router>
  );
}

export default App;
