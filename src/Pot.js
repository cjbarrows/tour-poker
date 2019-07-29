import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Droppable } from 'react-drag-and-drop';
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
      <Droppable
        types={['bid']}
        onDrop={data => {
          const { playerName, amount } = JSON.parse(data['bid']);
          this.props.gameActions.doPhaseAction({ playerName, amount });
        }}
      >
        <div className="pot">
          <div className="chips">
            <div className="chip value-1" ref={this.chipRefs[1]} />
            <div className="chip value-5" ref={this.chipRefs[5]} />
            <div className="chip value-10" ref={this.chipRefs[10]} />
          </div>
          <img alt="pot" src={process.env.PUBLIC_URL + '/pot.png'} />
          <p>${pot}</p>
        </div>
      </Droppable>
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
