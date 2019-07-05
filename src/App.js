import React, { Component } from 'react';
import { connect } from 'react-redux';

import Hands from './Hands';
import Controls from './Controls';

import './App.css';

class App extends Component {
  state = { hand: null };

  render() {
    const { loggedIn, turn } = this.props;

    return (
      <div className="App">
        <Hands loggedIn={loggedIn} />
        {turn === loggedIn && <Controls />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  turn: state.gameReducer.turn,
});

export default connect(mapStateToProps)(App);