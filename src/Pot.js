import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import interact from 'interactjs';
import { fromTo } from 'kute.js';

import ChipStack from './ChipStack';

import * as gameActions from './gameActions';

class Pot extends Component {
  constructor(props) {
    super(props);
    this.chipRefs = {
      1: React.createRef(),
      5: React.createRef(),
      10: React.createRef()
    };
    this.potRef = React.createRef();
  }

  componentDidMount() {
    const potTarget = interact('.pot');

    potTarget.dropzone({
      ondrop: event => {
        const playerName = event.relatedTarget.getAttribute('data-player');
        const amount = parseInt(
          event.relatedTarget.getAttribute('data-amount'),
          10
        );
        this.props.gameActions.doPhaseAction({ playerName, amount });
      },
      accept: '.bid-button'
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.pot !== this.props.pot) {
      const diff = this.props.pot - prevProps.pot;
      const ref = this.chipRefs[diff];
      if (ref) {
        const { getPlayerArea, turn } = this.props;
        const pa = getPlayerArea(turn);
        if (pa) {
          const potRect = this.potRef
            ? this.potRef.current.getBoundingClientRect()
            : { x: 0, y: 0, width: 0, height: 0 };
          const moveTween = fromTo(
            ref.current,
            { translateX: pa.x, translateY: pa.y, scale: 3 },
            {
              translateX: potRect.x + potRect.width * 0.5,
              translateY: potRect.y + potRect.height * 0.5,
              scale: 1
            },
            { easing: 'easingExponentialOut' }
          );
          const hideTween = fromTo(
            ref.current,
            { opacity: 1 },
            { opacity: 0 },
            { duration: 100 }
          );
          moveTween.chain(hideTween);
          moveTween.start();
          ref.current.style.opacity = 1;
        }
      }
    }
  }

  render() {
    const { pot, bid } = this.props;

    return (
      <div className="pot">
        <div className="chips">
          <div className="chip value-1" ref={this.chipRefs[1]} />
          <div className="chip value-5" ref={this.chipRefs[5]} />
          <div className="chip value-10" ref={this.chipRefs[10]} />
        </div>
        <div className="pot-holder">
          <img
            alt="pot"
            ref={this.potRef}
            src={process.env.PUBLIC_URL + '/pot.png'}
          />
          <ChipStack amount={bid} />
        </div>
        <p>${pot}</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(gameActions, dispatch)
});

const mapStateToProps = state => ({
  bid: state.gameReducer.bid,
  pot: state.gameReducer.pot,
  turn: state.gameReducer.turn
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pot);
