import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import interact from 'interactjs';
import { fromTo } from 'kute.js';

import * as gameActions from './gameActions';

class Pot extends Component {
  constructor(props) {
    super(props);
    this.chipRefs = {
      1: React.createRef(),
      5: React.createRef(),
      10: React.createRef()
    };
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
          const moveTween = fromTo(
            ref.current,
            { translateX: -pa.x, translateY: pa.y },
            { translateX: 0, translateY: 0 },
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
    const { pot } = this.props;

    return (
      <div className="pot">
        <div className="chips">
          <div className="chip value-1" ref={this.chipRefs[1]} />
          <div className="chip value-5" ref={this.chipRefs[5]} />
          <div className="chip value-10" ref={this.chipRefs[10]} />
        </div>
        <img alt="pot" src={process.env.PUBLIC_URL + '/pot.png'} />
        <p>${pot}</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(gameActions, dispatch)
});

const mapStateToProps = state => ({
  pot: state.gameReducer.pot,
  turn: state.gameReducer.turn
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pot);
