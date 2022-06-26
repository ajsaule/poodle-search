import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainSearch from './components/main-screen/MainSearch';
import ResultsSearch from './components/results-screen/ResultsSearch';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/:slug" component={ResultsSearch} />
          <Route path="/" component={MainSearch} />
        </Switch>
      </div>  
    </Router>
  );
}

export default App;
