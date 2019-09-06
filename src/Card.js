import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Img from 'react-image';

import * as playerActions from './playerActions';

import './Card.css';
import './animate.css';
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
      borderRadius: cardSize.width ? cardSize.width * 0.2 : 0,
      width: cardSize.width || 0,
      height: cardSize.height || 0
    };
  }

  getSuitRank() {
    const {
      data: { rank },
      cardSize
    } = this.props;

    const fontSize = cardSize.width ? cardSize.width * 0.4 : 0;

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

    const iconSize = cardSize.width ? cardSize.width * 0.35 : 0;

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
        onError={e => {
          console.log('error');
          if (e.target.src !== '') {
            e.target.src = '';
          }
        }}
        src={imageSource}
      />
    );
  }

  getCardName() {
    const {
      data: { name },
      cardSize
    } = this.props;

    const fontSize = cardSize.width ? cardSize.width * 0.25 : 0;

    return (
      <p style={{ fontSize }} className="rider-name">
        {name}
      </p>
    );
  }

  getCardPhoto() {
    const {
      data: { name }
    } = this.props;

    return (
      <Img
        alt={name}
        className="rider-photo"
        src={`${process.env.PUBLIC_URL}/riders/${name}.jpg`}
        unloader={this.getCardName()}
      />
    );
  }

  render() {
    const {
      data: { name },
      faceDown,
      show,
      isOwned,
      selectedCards
    } = this.props;

    const selected = selectedCards.find(card => card === name);

    return (
      <div
        className={`animated rollIn card${selected ? ' selected' : ''}${
          show ? '' : ' back-of-card'
        }${faceDown ? ' face-down' : ''}`}
        style={this.makeCardStyle()}
        onClick={() => isOwned && this.toggleSelected()}
      >
        {show && (
          <>
            {this.getCardPhoto()}
            {this.getSuitRank()}
            {this.getSuitIcon()}
            {/* {this.getCardName()} */}
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
