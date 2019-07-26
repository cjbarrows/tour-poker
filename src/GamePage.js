import React, { Component } from 'react';
import { connect } from 'react-redux';
import Measure from 'react-measure';
import { bindActionCreators } from 'redux';

import PlayerHand from './PlayerHand';
import NonPlayerHand from './NonPlayerHand';
import Controls from './controls/Controls';
import WinnerAlert from './WinnerAlert';
import PlayerInfo from './PlayerInfo';
import * as gameActions from './gameActions';
import playerNames from './playerNames';

import './GamePage.css';

function getHelpScreen(showHelpScreen) {
  return (
    <div className="help" onClick={() => showHelpScreen(false)}>
      Help!
    </div>
  );
}

const getPlayerNotThis = (players, loggedIn, index) => {
  let n = 0;
  for (let i = 0; i < playerNames.length; i++) {
    if (playerNames[i] !== loggedIn) {
      if (n === index) {
        return {
          ...players[playerNames[i]],
          name: playerNames[i]
        };
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

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.innerRef = null;
  }

  getPlayerArea = playerName => {
    const el = this.innerRef.querySelector('.top-hand');
    if (el) {
      return el.getBoundingClientRect();
    }
  };

  render() {
    const { turn, gameWinner, players, showHelp, showHelpScreen } = this.props;

    const {
      user: { username: loggedIn }
    } = JSON.parse(localStorage.getItem('user'));

    const thisPlayer = players[loggedIn];
    const leftPlayer = getPlayerNotThis(players, loggedIn, 0);
    const topPlayer = getPlayerNotThis(players, loggedIn, 1);
    const rightPlayer = getPlayerNotThis(players, loggedIn, 2);

    return (
      <Measure bounds innerRef={el => (this.innerRef = el)}>
        {({ measureRef, contentRect }) => {
          const cardSize = calculateCardSize(
            contentRect.bounds.width,
            contentRect.bounds.height
          );

          return (
            <div ref={measureRef} className="game-page">
              {showHelp && getHelpScreen(showHelpScreen)}
              <PlayerInfo
                player={thisPlayer}
                getPlayerArea={this.getPlayerArea}
              />
              <PlayerHand cardSize={cardSize} player={thisPlayer} />
              <NonPlayerHand
                position="left"
                cardSize={cardSize}
                player={leftPlayer}
              />
              <NonPlayerHand
                position="top"
                cardSize={cardSize}
                player={topPlayer}
              />
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
        }}
      </Measure>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showHelpScreen: bindActionCreators(gameActions.showHelp, dispatch)
});

const mapStateToProps = state => ({
  turn: state.gameReducer.turn,
  gameWinner: state.gameReducer.gameWinner,
  players: state.playerReducer,
  showHelp: state.gameReducer.showHelp
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
