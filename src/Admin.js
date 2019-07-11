import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sendMessage } from './store/message/actions';
import { makeDeck } from './adminActions';

import playerNames from './playerNames';

import './Admin.css';

const makePlayerTableRow = (players, column) => {
  return (
    <tr>
      <td>{column}:</td>
      {players.map(player => (
        <td key={player.name}>{player[column]}</td>
      ))}
    </tr>
  );
};
const makePlayerTable = players => (
  <table className="players">
    <tbody>
      {makePlayerTableRow(players, 'name')}
      {makePlayerTableRow(players, 'money')}
      {makePlayerTableRow(players, 'stake')}
    </tbody>
  </table>
);

const saveGameSettings = settings => dispatch => {
  dispatch(sendMessage('saveGameSettings', settings));
};

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      gameReducer: { bid, dealer, gamePhases, pot, turn, phase, stage, year },
      playerReducer
    } = this.props;

    const players = playerReducer
      ? playerNames.map(name => ({ ...playerReducer[name], name }))
      : [];

    const { makeDeckResult } = this.state;

    return (
      <div className="admin-page">
        <div className="column">
          {makePlayerTable(players)}
          <div>
            <label>Year</label>
            <br />
            <input
              type="text"
              value={this.state.year !== undefined ? this.state.year : year}
              onChange={e => this.onInput(e, 'year')}
            />
          </div>
          <div>
            <label>Stage</label>
            <br />
            <input
              type="text"
              value={this.state.stage !== undefined ? this.state.stage : stage}
              onChange={e => this.onInput(e, 'stage')}
            />
          </div>
          <div>
            <label>Dealer</label>
            <br />
            <input
              type="text"
              value={
                this.state.dealer !== undefined ? this.state.dealer : dealer
              }
              onChange={e => this.onInput(e, 'dealer')}
            />
          </div>
          <div>
            <label>Current Player</label>
            <br />
            <input
              type="text"
              value={this.state.turn !== undefined ? this.state.turn : turn}
              onChange={e => this.onInput(e, 'turn')}
            />
          </div>
          <div>
            <label>Pot</label>
            <br />
            <input
              type="text"
              value={this.state.pot !== undefined ? this.state.pot : pot}
              onChange={e => this.onInput(e, 'pot')}
            />
          </div>
          <div>
            <label>Bid</label>
            <br />
            <input
              type="text"
              value={this.state.bid !== undefined ? this.state.bid : bid}
              onChange={e => this.onInput(e, 'bid')}
            />
          </div>
          <div>
            <label>Phase</label>
            <br />
            <input
              type="text"
              value={this.state.phase !== undefined ? this.state.phase : phase}
              onChange={e => this.onInput(e, 'phase')}
            />
          </div>
          <div>
            <label>Game Phases</label>
            <br />
            <textarea
              value={
                this.state.gamePhases !== undefined
                  ? this.state.gamePhases
                  : gamePhases
              }
              onChange={e => this.onInput(e, 'gamePhases')}
            />
          </div>
          <button onClick={() => this.onClickSaveGameSettings()}>
            Save Game Settings
          </button>
          <div className="boxed">
            <label>Game Control </label>
            <input
              type="text"
              id="make-deck-year"
              placeholder="year"
              onChange={e => this.onInput(e, 'deck_year')}
            />
            <input
              type="text"
              id="make-deck-stage"
              placeholder="stage"
              onChange={e => this.onInput(e, 'deck_stage')}
            />
            <button onClick={() => this.makeDeck()}>Make Deck</button>
            <div className="output">
              {makeDeckResult && <span>{makeDeckResult}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  onInput(e, fieldName) {
    this.setState({ [fieldName]: e.target.value });
  }

  async makeDeck() {
    const { makeDeck } = this.props;
    const { deck_year, deck_stage } = this.state;

    this.setState({ makeDeckResult: '' });

    if (deck_year && deck_stage) {
      const response = await makeDeck(deck_year, deck_stage);
      const responseData = await response.json();
      this.setState({ makeDeckResult: JSON.stringify(responseData) });
    }
  }

  onClickSaveGameSettings() {
    const { gameReducer, saveGameSettings } = this.props;
    const { deck_year, deck_stage, ...gameSettings } = this.state;

    saveGameSettings({ ...gameReducer, ...gameSettings });
  }
}

const mapDispatchToProps = dispatch => ({
  makeDeck: bindActionCreators(makeDeck, dispatch),
  saveGameSettings: bindActionCreators(saveGameSettings, dispatch)
});

const mapStateToProps = state => ({
  gameReducer: state.gameReducer,
  playerReducer: state.playerReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
