import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/starred">
          <Starred/>
        </Route>

        <Route>This is 404 page not found :(</Route>
      </Switch>
    </div>
  );
}

export default App;
