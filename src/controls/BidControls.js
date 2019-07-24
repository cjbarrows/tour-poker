import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Draggable } from 'react-drag-and-drop';

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

    /* this.props.gameActions.doPhaseAction({(playerName, amount)}); */

    return (
      <Draggable
        type="bid"
        data={JSON.stringify({ playerName: loggedIn, amount })}
      >
        <div className={`bid-button bid-${amount}`}>
          <img alt={`$${amount}`} src={images[amount]} />
        </div>
      </Draggable>
    );
  }

  render() {
    const { bid, loggedIn, playerReducer } = this.props;

    const { stake } = playerReducer[loggedIn];

    const needsToPay = bid - stake;

    return (
      <div className="controls bid">
        <div className="buttonHolder">
          <div className="poker-chip-holder">
            {this.buildBidButton(1)}
            {this.buildBidButton(5)}
            {this.buildBidButton(10)}
          </div>
          <button
            className="end-turn-button"
            disabled={needsToPay > 0}
            onClick={() => this.props.gameActions.endTurn()}
          >
            End Turn
          </button>
          <button
            className="fold-button"
            onClick={() => {
              this.props.gameActions.fold(loggedIn);
            }}
          >
            Fold
          </button>
        </div>
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
