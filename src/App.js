import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { hand: null };

  async componentDidMount() {
    // remote:
    // const res = await fetch('/api/player');
    // local:
    const res = await fetch('/player');
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
