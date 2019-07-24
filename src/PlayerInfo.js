import React, { Component } from 'react';
import { connect } from 'react-redux';

import Pot from './Pot';

import './PlayerInfo.css';

class PlayerInfo extends Component {
  render() {
    const { player, gameReducer } = this.props;

    const { turn, pot, bid, phase } = gameReducer;

    const { money, stake } = player || [];

    const needsToPay = bid - stake;
    const stayInMessage =
      needsToPay > 0 ? `Pay $${needsToPay} to stay in` : `Current bid: $${bid}`;

    return (
      <div className="player-info">
        <div className="info left-side">
          <p>
            You have ${money}
            <span>Your stake: ${stake}</span>
          </p>
          <p>{stayInMessage}</p>
        </div>
        <div className="info right-side">
          <p>{turn}'s turn</p>
          <p>Phase: {phase}</p>
          <p>Pot: ${pot}</p>
          <Pot />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  players: state.playerReducer,
  gameReducer: state.gameReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerInfo);
