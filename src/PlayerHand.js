import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as cardActions from './cardActions';

class PlayerHand extends Component {
  render() {
    const { hand, playerName } = this.props;

    return (
      <>
        {hand && hand.map(card => (<p>{card.name}</p>))}
        <button
          onClick={() => {
            this.props.cardActions.dealCard(playerName);
          }}>Deal a Card</button>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  cardActions: bindActionCreators(cardActions, dispatch),
});

const mapStateToProps = state => ({
  players: state.players,
  hand: state.messageReducer.hand
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerHand);