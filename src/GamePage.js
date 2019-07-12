import React from 'react';
import { connect } from 'react-redux';
import { withContentRect } from 'react-measure';

import PlayerHand from './PlayerHand';
import Controls from './controls/Controls';
import WinnerAlert from './WinnerAlert';

import './GamePage.css';

const calculateCardSize = (width, height) => {
  const width1 = Math.floor(width / 7);
  const height1 = Math.floor(width1 * 1.5);

  const height2 = Math.floor(height / 3);
  const width2 = Math.floor(height2 / 1.5);

  console.log(`${width} ${height}`);

  if (width2 > width1) {
    console.log('using width1');
  } else {
    console.log('using width2');
  }

  return width2 > width1
    ? { width: width1, height: height1 }
    : { width: width2, height: height2 };
};

const GamePage = withContentRect('bounds')(props => {
  const { turn, gameWinner, measureRef, contentRect, players } = props;

  const {
    user: { username: loggedIn }
  } = JSON.parse(localStorage.getItem('user'));

  const cardSize = calculateCardSize(
    contentRect.bounds.width,
    contentRect.bounds.height
  );

  const thisPlayer = players[loggedIn];

  return (
    <div ref={measureRef} className="game-page">
      <PlayerHand cardSize={cardSize} player={thisPlayer} />
      {turn === loggedIn && <Controls loggedIn={loggedIn} />}
      {gameWinner && Object.entries(gameWinner).length > 0 ? (
        <WinnerAlert winner={gameWinner.name} hand={gameWinner.hand} />
      ) : null}
    </div>
  );
});

const mapStateToProps = state => ({
  turn: state.gameReducer.turn,
  gameWinner: state.gameReducer.gameWinner,
  players: state.playerReducer
});

export default connect(mapStateToProps)(GamePage);
