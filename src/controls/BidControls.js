import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as cardActions from '../cardActions';
import * as gameActions from '../gameActions';

import './BidControls.css';
import Chip1 from '../images/chip_1.png';
import Chip5 from '../images/chip_5.png';
import Chip10 from '../images/chip_10.png';

class BidControls extends Component {
  buildBidButton(amount) {
    const { loggedIn } = this.props;

    const images = { 1: Chip1, 5: Chip5, 10: Chip10 };

    return (
      <div
        className={`bid-button bid-${amount}`}
        onClick={() => {
          this.props.gameActions.doPhaseAction({
            playerName: loggedIn,
            amount: amount
          });
        }}
      >
        <img alt="" src={images[amount]} />
      </div>
    );
  }

  render() {
    const { bid, loggedIn, playerReducer, pot } = this.props;

    // TODO show the pot graphically

    const { stake } = playerReducer[loggedIn];

    const needsToPay = bid - stake;
    const stayInMessage =
      needsToPay > 0 ? `($${needsToPay} to stay in)` : `Current Bid: $${bid}`;

    return (
      <div className="controls bid">
        <div className="buttonHolder">
          {this.buildBidButton(1)}
          {this.buildBidButton(5)}
          {this.buildBidButton(10)}
          <button
            className="end-turn-button"
            disabled={needsToPay <= 0}
            onClick={() => this.props.gameActions.endTurn()}
          >
            End Turn
          </button>
        </div>
        <button
          className="fold-button"
          onClick={() => {
            this.props.gameActions.fold(loggedIn);
          }}
        >
          Fold
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  cardActions: bindActionCreators(cardActions, dispatch),
  gameActions: bindActionCreators(gameActions, dispatch)
});

const mapStateToProps = state => ({
  pot: state.gameReducer.pot,
  bid: state.gameReducer.bid,
  playerReducer: state.playerReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BidControls);
