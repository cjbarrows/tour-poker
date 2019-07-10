import React, { Component } from 'react';
import { connect } from 'react-redux';

import Hands from './Hands';
import Controls from './controls/Controls';

class GamePage extends Component {
  render() {
    const { turn } = this.props;

    const {
      user: { username: loggedIn }
    } = JSON.parse(localStorage.getItem('user'));

    return (
      <>
        <Hands loggedIn={loggedIn} selectorFunction={this.setSelectedCards} />
        {turn === loggedIn && <Controls loggedIn={loggedIn} />}
      </>
    );
  }

  setSelectedCards(cards) {
    console.log(cards);
  }
}

const mapStateToProps = state => ({
  turn: state.gameReducer.turn
});

export default connect(mapStateToProps)(GamePage);
