import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Card from "./Card";

import * as cardActions from "./cardActions";

import "./PlayerHand.css";

class PlayerHand extends Component {
  render() {
    const { players, loggedIn, name, turn } = this.props;

    const { hand, money } = players[name] || [];

    const className = `player-hand ${turn === name ? "my-turn" : ""}`;

    const isOwnHand = loggedIn === name;

    return (
      <div className={className}>
        <h1>
          {name}
          <p className="money">${money}</p>
        </h1>
        {hand &&
          hand.map(card => (
            <Card
              key={card.name}
              show={isOwnHand || card.faceDown === false}
              isOwned={isOwnHand}
              data={card}
            />
          ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  cardActions: bindActionCreators(cardActions, dispatch)
});

const mapStateToProps = state => ({
  players: state.playerReducer,
  turn: state.gameReducer.turn
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerHand);
