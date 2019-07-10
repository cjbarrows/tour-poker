import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { makeDeck } from "./adminActions";

import "./Admin.css";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      bid,
      dealer,
      pot,
      turn,
      phase,
      stage,
      year
    } = this.props.gameReducer;
    const { makeDeckResult } = this.state;

    return (
      <div className="admin-page">
        <div className="column">
          <p>
            <label>Year</label>
            <br />
            <input type="text" value={year} />
          </p>
          <p>
            <label>Active Stage</label>
            <br />
            <input type="text" value={stage} />
          </p>
          <p>
            <label>Dealer</label>
            <br />
            <input type="text" value={dealer} />
          </p>
          <p>
            <label>Current Player</label>
            <br />
            <input type="text" value={turn} />
          </p>
          <p>
            <label>Pot</label>
            <br />
            <input type="text" value={pot} />
          </p>
          <p>
            <label>Bid</label>
            <br />
            <input type="text" value={bid} />
          </p>
          <p>
            <label>Phase</label>
            <br />
            <input type="text" value={phase} />
          </p>
          <p className="boxed">
            <label>Make Deck from Results: </label>
            <input
              type="text"
              id="make-deck-year"
              placeholder="year"
              onChange={e => this.onInput(e, "year")}
            />
            <input
              type="text"
              id="make-deck-stage"
              placeholder="stage"
              onChange={e => this.onInput(e, "stage")}
            />
            <button onClick={() => this.makeDeck()}>Make</button>
            {makeDeckResult && <span>{makeDeckResult}</span>}
          </p>
        </div>
      </div>
    );
  }

  onInput(e, fieldName) {
    this.setState({ [fieldName]: e.target.value });
  }

  async makeDeck() {
    const { makeDeck } = this.props;
    const { year, stage } = this.state;

    this.setState({ makeDeckResult: "" });

    if (year && stage) {
      const response = await makeDeck(year, stage);
      const responseData = await response.json();
      this.setState({ makeDeckResult: JSON.stringify(responseData) });
    }
  }
}

const mapDispatchToProps = dispatch => ({
  makeDeck: bindActionCreators(makeDeck, dispatch)
});

const mapStateToProps = state => ({
  gameReducer: state.gameReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
