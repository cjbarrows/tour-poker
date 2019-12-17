import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from './Card';

import * as gameActions from './gameActions';

import './NonPlayerHand.css';

const sortByOrder = (a, b) => a.order - b.order;

function NonPlayerHand(props) {
  const [isSpread, setSpread] = useState(false);

  function getContainerPositionStyle() {
    const { position } = props;
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

  function getHandPositionStyle() {
    const { position } = props;
    switch (position) {
      case 'left':
        return { transform: 'translateY(-100%)' };
      case 'top':
        return { transform: 'translateX(-25%)' };
      case 'right':
        return isSpread
          ? { transform: 'translateY(-100%) translateX(-100%)' }
          : { transform: 'translateY(-100%) translateX(-40%)' };
      default:
        return {};
    }
  }

  function getLabelPositionStyle() {
    const { position } = props;

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

  function getCardHolderStyle() {
    const SIDE_MARGINS = 5;
    const cardWidth = cardSize.width * 0.75 + SIDE_MARGINS * 2;
    return isSpread ? { width: cardWidth } : {};
  }

  const { cardSize, player, showHelp, position } = props;

  const { folded, hand, money, name } = player || [];

  const smallerCardSize = cardSize
    ? { width: cardSize.width * 0.75, height: cardSize.height * 0.75 }
    : {};

  return (
    <div
      className={`nonplayer-hand-container ${position}-hand`}
      style={getContainerPositionStyle()}
    >
      <div
        className={`player-hand${folded ? ' folded' : ''}${
          isSpread ? ' is-spread' : ''
        }`}
        onClick={() => setSpread(!isSpread)}
        style={getHandPositionStyle()}
      >
        <div
          className="label-area"
          onClick={event => {
            event.stopPropagation();
            if (showHelp) {
              showHelp();
            }
          }}
        >
          <h1 style={getLabelPositionStyle()}>
            {name}
            <p className="money">${money}</p>
          </h1>
        </div>
        {hand &&
          hand.sort(sortByOrder).map(card => (
            <div
              className="card-holder"
              key={card.name}
              style={getCardHolderStyle()}
            >
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

const mapDispatchToProps = dispatch => ({
  showHelp: bindActionCreators(gameActions.showHelp, dispatch)
});

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NonPlayerHand);
