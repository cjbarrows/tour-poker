import React, { Component } from 'react';

import './Card.css';

const ranks = ['Ace', 'King', 'Queen', 'Jack', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const suits = {
  'gc': 'GC',
  'points': 'Points',
  'kom': 'KOM',
  'stage': 'Stage'
}

const getDescription = (rank, suit, asterisk) => {
  return `${ranks[rank]} of ${suits[suit]}${asterisk ? '*' : ''}`;
}

class Card extends Component {
  render() {
    const { data: { asterisk, name, rank, suit }, show } = this.props;

    return (
      <div className="card">
        {show ? (
          <>
            <p>{name}</p>
            <p>{getDescription(rank, suit, asterisk)}</p>
          </>
        ) : <p>Back of Card</p>}
      </div>
    )
  }
}

export default Card;