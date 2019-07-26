import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from './Card';

import * as cardActions from './cardActions';
import * as gameActions from './gameActions';

import './NonPlayerHand.css';

class NonPlayerHand extends Component {
  getContainerPositionStyle() {
    const { position } = this.props;
    switch (position) {
      case 'left':
        return { left: 0, bottom: 0 };
      case 'top':
        return { left: '50%', top: 45 };
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

  getLabelPositionStyle() {
    const { position } = this.props;

    switch (position) {
      case 'left':
        return {
          left: '5%',
          transform: 'translateY(-100%)'
        };
      case 'top':
        return {
          transform: 'translateX(-100%)',
          top: '0',
          textAlign: 'right'
        };
      case 'right':
        return {
          transform: 'translateY(-100%) translateX(-100%)',
          left: '35%',
          textAlign: 'right'
        };
      default:
        return {};
    }
  }

  render() {
    const { cardSize, player, showHelp, position } = this.props;

    const { folded, hand, money, name } = player || [];

    const smallerCardSize = cardSize
      ? { width: cardSize.width * 0.75, height: cardSize.height * 0.75 }
      : {};

    return (
      <div
        className={`nonplayer-hand-container ${position}-hand`}
        style={this.getContainerPositionStyle()}
      >
        <div
          className={`player-hand ${folded ? 'folded' : ''}`}
          style={this.getHandPositionStyle()}
        >
          <div
            className="label-area"
            onClick={() => {
              console.log('ok');
              if (showHelp) {
                showHelp();
              }
            }}
          >
            <h1 style={this.getLabelPositionStyle()}>
              {name}
              <p className="money">${money}</p>
            </h1>
          </div>
          {hand &&
            hand.map(card => (
              <div className="card-holder" key={card.name}>
                <Card
                  cardSize={smallerCardSize}
                  show={!card.faceDown}
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
  cardActions: bindActionCreators(cardActions, dispatch),
  showHelp: bindActionCreators(gameActions.showHelp, dispatch)
});

const mapStateToProps = state => ({
  players: state.playerReducer,
  turn: state.gameReducer.turn
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonPlayerHand);
