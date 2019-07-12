import React from 'react';
import { connect } from 'react-redux';
import { withContentRect } from 'react-measure';

import PlayerHand from './PlayerHand';
import NonPlayerHand from './NonPlayerHand';
import Controls from './controls/Controls';
import WinnerAlert from './WinnerAlert';
import playerNames from './playerNames';

import './GamePage.css';

const getPlayerNotThis = (players, loggedIn, index) => {
  let n = 0;
  for (let i = 0; i < playerNames.length; i++) {
    if (playerNames[i] !== loggedIn) {
      if (n === index) {
        return players[playerNames[i]];
      }
      n++;
    }
  }
};

const calculateCardSize = (width, height) => {
  const width1 = Math.floor(width / 7);
  const height1 = Math.floor(width1 * 1.5);

  const height2 = Math.floor(height / 3);
  const width2 = Math.floor(height2 / 1.5);

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
  const leftPlayer = getPlayerNotThis(players, loggedIn, 0);
  const topPlayer = getPlayerNotThis(players, loggedIn, 1);
  const rightPlayer = getPlayerNotThis(players, loggedIn, 2);

  console.log(leftPlayer);

  return (
    <div ref={measureRef} className="game-page">
      <PlayerHand cardSize={cardSize} player={thisPlayer} />
      <NonPlayerHand position="left" cardSize={cardSize} player={leftPlayer} />
      <NonPlayerHand position="top" cardSize={cardSize} player={topPlayer} />
      <NonPlayerHand
        position="right"
        cardSize={cardSize}
        player={rightPlayer}
      />
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
