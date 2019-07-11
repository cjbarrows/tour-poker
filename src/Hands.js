import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlayerHand from './PlayerHand';

import './Hands.css';

import playerNames from './playerNames';

class Hands extends Component {
  render() {
    const { loggedIn } = this.props;

    return (
      <div className="hands">
        {playerNames.map(player => (
          <PlayerHand key={player} name={player} loggedIn={loggedIn} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Hands);
