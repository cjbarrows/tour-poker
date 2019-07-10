import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as playerActions from './playerActions';

import './Card.css';

const ranks = [
  'Ace',
  'King',
  'Queen',
  'Jack',
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
const suits = {
  gc: 'GC',
  points: 'Points',
  kom: 'KOM',
  stage: 'Stage'
};

const getDescription = (rank, suit, asterisk) => {
  return `${ranks[rank]} of ${suits[suit]}${asterisk ? '*' : ''}`;
};

class Card extends Component {
  toggleSelected() {
    const {
      togglePlayerSelectedCard,
      data: { name }
    } = this.props;
    togglePlayerSelectedCard(name);
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
        className={`card${selected ? ' selected' : ''}`}
        onClick={() => isOwned && this.toggleSelected()}
      >
        {show ? (
          <>
            <p>{name}</p>
            <p>{getDescription(rank, suit, asterisk)}</p>
          </>
        ) : (
          <p>Back of Card</p>
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
