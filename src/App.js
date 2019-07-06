import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import Login from './Login';
import GamePage from './GamePage';
import Admin from './Admin'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <>
            <PrivateRoute exact path="/" component={GamePage} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
          </>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  turn: state.gameReducer.turn,
});

export default connect(mapStateToProps)(App);