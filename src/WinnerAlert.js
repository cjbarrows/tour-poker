import React, { Component } from 'react';

import './WinnerAlert.css';

class WinnerAlert extends Component {
  render() {
    const { winner, hand } = this.props;

    return (
      <div className="winner-alert">
        {winner} wins with {hand}!
      </div>
    );
  }
}

export default WinnerAlert;
