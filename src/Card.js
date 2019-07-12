import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as playerActions from './playerActions';

import './Card.css';
import YellowJersey from './images/yellow_jersey.png';
import GreenJersey from './images/green_jersey.png';
import KOMJersey from './images/kom_jersey.png';
import FrenchFlag from './images/french_flag.png';

const ranks = [
  'A',
  'K',
  'Q',
  'J',
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2'
];

class Card extends Component {
  toggleSelected() {
    const {
      togglePlayerSelectedCard,
      data: { name }
    } = this.props;
    togglePlayerSelectedCard(name);
  }

  makeCardStyle() {
    const { cardSize } = this.props;
    return {
      borderRadius: cardSize.width * 0.2,
      width: cardSize.width,
      height: cardSize.height
    };
  }

  getSuitRank() {
    const {
      data: { rank },
      cardSize
    } = this.props;

    const fontSize = cardSize.width * 0.4;

    return (
      <span style={{ fontSize }} className="rank">
        {ranks[rank]}
      </span>
    );
  }

  getSuitIcon() {
    const {
      data: { suit },
      cardSize
    } = this.props;

    const iconSize = cardSize.width * 0.5;

    let imageSource;
    switch (suit) {
      case 'kom':
        imageSource = KOMJersey;
        break;
      case 'points':
        imageSource = GreenJersey;
        break;
      case 'stage':
        imageSource = FrenchFlag;
        break;
      case 'gc':
        imageSource = YellowJersey;
        break;
      default:
        break;
    }

    return (
      <img
        className="suit-icon"
        width={iconSize}
        alt="suit"
        src={imageSource}
      />
    );
  }

  getCardName() {
    const {
      data: { name },
      cardSize
    } = this.props;

    const fontSize = cardSize.width * 0.15;

    return (
      <p style={{ fontSize }} className="rider-name">
        {name}
      </p>
    );
  }

  render() {
    const {
      data: { asterisk, name, rank, suit },
      show,
      isOwned,
      selectedCards
    } = this.props;

    const selected = selectedCards.find(card => card === name);

    return (
      <div
        className={`card${selected ? ' selected' : ''}${
          show ? '' : ' back-of-card'
        }`}
        style={this.makeCardStyle()}
        onClick={() => isOwned && this.toggleSelected()}
      >
        {show && (
          <>
            {this.getSuitRank()}
            {this.getSuitIcon()}
            {this.getCardName()}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedCards: state.playerReducer.selectedCards
});

const mapDispatchToProps = dispatch => ({
  togglePlayerSelectedCard: bindActionCreators(
    playerActions.togglePlayerSelectedCard,
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
