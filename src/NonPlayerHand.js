import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from './Card';

import * as cardActions from './cardActions';

import './NonPlayerHand.css';

class NonPlayerHand extends Component {
  getContainerPositionStyle() {
    const { position } = this.props;
    switch (position) {
      case 'left':
        return { left: 0, bottom: 0 };
      case 'top':
        return { left: '50%', top: 0 };
      case 'right':
        return { right: 0, bottom: 0 };
      default:
        return {};
    }
  }

  getHandPositionStyle() {
    const { position } = this.props;
    switch (position) {
      case 'left':
        return { transform: 'translateY(-100%)' };
      case 'top':
        return { transform: 'translateX(-25%)' };
      case 'right':
        return { transform: 'translateY(-100%) translateX(-40%)' };
      default:
        return {};
    }
  }

  render() {
    const { cardSize, player, loggedIn } = this.props;

    const { hand, money } = player || [];

    return (
      <div
        className="nonplayer-hand-container"
        style={this.getContainerPositionStyle()}
      >
        <h1>
          {loggedIn}
          <p className="money">${money}</p>
        </h1>
        <div className="player-hand" style={this.getHandPositionStyle()}>
          {hand &&
            hand.map(card => (
              <div className="card-holder">
                <Card
                  cardSize={cardSize}
                  key={card.name}
                  show={false}
                  isOwned={false}
                  data={card}
                />
              </div>
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
)(NonPlayerHand);
