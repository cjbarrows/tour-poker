import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Admin.css';

class Admin extends Component {
  render() {
    const { bid, pot, turn, phase, stage, year } = this.props.gameReducer;

    return (
      <div className="admin-page">
        <div className="column">
          <p>
            <label>Year</label><br></br>
            <input type="text" value={year}></input>
          </p>
          <p>
            <label>Active Stage</label><br></br>
            <input type="text" value={stage}></input>
          </p>
          <p>
            <label>Current Player</label><br></br>
            <input type="text" value={turn}></input>
          </p>
          <p>
            <label>Pot</label><br></br>
            <input type="text" value={pot}></input>
          </p>
          <p>
            <label>Bid</label><br></br>
            <input type="text" value={bid}></input>
          </p>
          <p>
            <label>Phase</label><br></br>
            <input type="text" value={phase}></input>
          </p>
          <p className="boxed">
            <label>New Stage: </label><br></br>
            <input type="text"></input><button>Load</button>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  gameReducer: state.gameReducer,
});

export default connect(mapStateToProps)(Admin);