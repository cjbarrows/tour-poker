import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as cardActions from './cardActions';
import * as gameActions from './gameActions';

import BidControls from './BidControls';

import './Controls.css';

class Controls extends Component {
  render() {
    const { loggedIn, phase } = this.props;

    console.log(phase);

    return phase === 'deal'
      ? (<button onClick={() => this.props.gameActions.endTurn()}>End Turn</button>)
      : <BidControls loggedIn={loggedIn} />
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