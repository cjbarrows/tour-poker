import React, { Component } from 'react';
import { connect } from 'react-redux';

import Hands from './Hands';
import Controls from './controls/Controls';
import WinnerAlert from './WinnerAlert';

class GamePage extends Component {
  render() {
    const { turn, gameWinner } = this.props;

    const {
      user: { username: loggedIn }
    } = JSON.parse(localStorage.getItem('user'));

    return (
      <>
        <Hands loggedIn={loggedIn} selectorFunction={this.setSelectedCards} />
        {turn === loggedIn && <Controls loggedIn={loggedIn} />}
        {gameWinner && Object.entries(gameWinner).length > 0 ? (
          <WinnerAlert winner={gameWinner.name} hand={gameWinner.hand} />
        ) : null}
      </>
    );
  }

  setSelectedCards(cards) {
    console.log(cards);
  }
}

const mapStateToProps = state => ({
  turn: state.gameReducer.turn,
  gameWinner: state.gameReducer.gameWinner
});

export default connect(mapStateToProps)(GamePage);
