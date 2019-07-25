import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Droppable } from 'react-drag-and-drop';

import * as gameActions from './gameActions';

import Chip1 from './images/chip_1.png';
// import Chip5 from '../images/chip_5.png';
// import Chip10 from '../images/chip_10.png';

class Pot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPot: undefined,
      newBid: undefined
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log(`here ${state.lastPot} and ${props.pot}`);
    if (state.lastPot !== props.pot) {
      const amount =
        state.lastPot !== undefined ? props.pot - state.lastPot : undefined;
      return { lastPot: props.pot, newBid: amount };
    }
    return { lastPot: props.pot };
  }

  render() {
    const { pot } = this.props;
    const { newBid } = this.state;

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
            <div className="chip" />
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
  pot: state.gameReducer.pot
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pot);
