import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlayerHand from './PlayerHand';

import './App.css';

class App extends Component {
  state = { hand: null };

  async componentDidMount() {
    /*
    const { socket } = this.props;

    socket.on('connect', () => {
      console.log('I am connected');
    })
    */

    // remote:
    // const res = await fetch('/api/player');
    // local:
    // const res = await fetch('/player');
    /*
    console.log(process.env.REACT_APP_API_PREFIX);
    const res = await fetch(`${process.env.REACT_APP_API_PREFIX}/player`);
    console.log(res);
    const json = await res.json();
    this.setState({ hand: json })
    */
  }

  render() {
    return (
      <div className="App">
        <h1>Player 1's Hand</h1>
        {this.state.hand && this.state.hand.map(card => (<p>{card.name}</p>))}
        <PlayerHand playerName='Charlie' />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.general.socket,
});

export default connect(mapStateToProps)(App);