import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as cardActions from './cardActions';
import * as gameActions from './gameActions';

import BidControls from './BidControls';
import DealControls from './DealControls';

import './Controls.css';

class Controls extends Component {
  render() {
    const { loggedIn, phase } = this.props;

    switch (phase) {
      case 'shuffle':
        return (<button onClick={() => this.props.gameActions.endTurn()}>Shuffle Deck</button>);
      case 'deal':
        return <DealControls />
      case 'bid':
        return <BidControls loggedIn={loggedIn} />
      default:
        return <p>Some other phase</p>
    }
  }
}

const mapDispatchToProps = dispatch => ({
  cardActions: bindActionCreators(cardActions, dispatch),
  gameActions: bindActionCreators(gameActions, dispatch),
});

const mapStateToProps = state => ({
  pot: state.gameReducer.pot,
  bid: state.gameReducer.bid,
  phase: state.gameReducer.phase,
  playerReducer: state.playerReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);