import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { hand: null };

  async componentDidMount() {
    const res = await fetch('https://tour-poker-server.herokuapp.com/player');
    console.log(res);
    const json = await res.json();
    this.setState({ hand: json })
  }

  render() {
    return (
      <div className="App">
        <h1>Player 1's Hand</h1>
        {this.state.hand && this.state.hand.map(card => (<p>{card.name}</p>))}
      </div>
    );
  }
}

export default App;
