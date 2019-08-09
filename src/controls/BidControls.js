import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import interact from 'interactjs';

import * as cardActions from '../cardActions';
import * as gameActions from '../gameActions';

import './BidControls.css';

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

class BidControls extends Component {
  componentDidMount() {
    const draggableChip = interact('.bid-button');

    draggableChip.draggable({
      onmove: dragMoveListener,
      onend: event => {
        const target = event.target;
        target.style.webkitTransform = target.style.transform = '';
        target.setAttribute('data-x', 0);
        target.setAttribute('data-y', 0);
      }
    });
  }

  buildBidButton(amount) {
    const { loggedIn } = this.props;

    /* this.props.gameActions.doPhaseAction({(playerName, amount)}); */

    return (
      <div
        className={`bid-button bid-${amount}`}
        data-player={loggedIn}
        data-amount={amount}
      />
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
