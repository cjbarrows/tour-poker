import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from './Card';

import * as cardActions from './cardActions';

import './PlayerHand.css';

class PlayerHand extends Component {
  render() {
    const { cardSize, player } = this.props;

    const { hand } = player || [];

    return (
      <div className="player-hand-container">
        <div className="player-hand">
          {hand &&
            hand.map(card => (
              <Card
                cardSize={cardSize}
                key={card.name}
                show={true}
                isOwned={true}
                data={card}
              />
            ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  cardActions: bindActionCreators(cardActions, dispatch)
});

const mapStateToProps = state => ({
  players: state.playerReducer,
  turn: state.gameReducer.turn
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerHand);
