import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Controls.css';

import * as cardActions from './cardActions';
import * as gameActions from './gameActions';

class Controls extends Component {
  render() {
    const { bid, loggedIn, playerReducer, pot } = this.props;

    const { stake } = playerReducer[loggedIn];

    const needsToPay = bid !== stake;

    return (
      <div className="controls">
        <div className="buttonHolder">
          <button
            onClick={() => {
              this.props.gameActions.bid(loggedIn, 25);
            }}>Bid $25 (${`${pot}`})</button>
          {
            !needsToPay &&
            <button
              className="done"
              onClick={() => this.props.gameActions.endTurn()}
            >Done
            </button>
          }
        </div>
        <div className="buttonHolder">
          <button
            onClick={() => {
              this.props.cardActions.dealCard('Charlie');
            }}>Raise</button>
        </div>
        <div className="buttonHolder">
          <button
            onClick={() => {
              this.props.cardActions.dealCard('Charlie');
            }}>Call</button>
        </div>
        <div className="buttonHolder">
          <button
            onClick={() => {
              this.props.cardActions.dealCard('Charlie');
            }}>Fold</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  cardActions: bindActionCreators(cardActions, dispatch),
  gameActions: bindActionCreators(gameActions, dispatch),
});

const mapStateToProps = state => ({
  pot: state.gameReducer.pot,
  bid: state.gameReducer.bid,
  playerReducer: state.playerReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);