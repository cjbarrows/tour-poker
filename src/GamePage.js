import React from 'react';
import { connect } from 'react-redux';
import { withContentRect } from 'react-measure';

import Hands from './Hands';
import Controls from './controls/Controls';
import WinnerAlert from './WinnerAlert';

import './GamePage.css';

const GamePage = withContentRect('bounds')(props => {
  const { turn, gameWinner, measureRef, contentRect } = props;

  const {
    user: { username: loggedIn }
  } = JSON.parse(localStorage.getItem('user'));

  return (
    <div ref={measureRef} className="game-page">
      <pre>{JSON.stringify(contentRect, null, 2)}</pre>
      <Hands loggedIn={loggedIn} />
      {turn === loggedIn && <Controls loggedIn={loggedIn} />}
      {gameWinner && Object.entries(gameWinner).length > 0 ? (
        <WinnerAlert winner={gameWinner.name} hand={gameWinner.hand} />
      ) : null}
    </div>
  );
});

const mapStateToProps = state => ({
  turn: state.gameReducer.turn,
  gameWinner: state.gameReducer.gameWinner
});

export default connect(mapStateToProps)(GamePage);
