import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlayerHand from './PlayerHand';

import './Hands.css';

const players = ['Charlie', 'Ethan', 'Jorie', 'Katie'];

class Hands extends Component {
  render() {
    const { loggedIn } = this.props;

    return (
      <div className="hands">
        {players.map(player => (
          <>
            <PlayerHand name={player} loggedIn={loggedIn} />
          </>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Hands);
