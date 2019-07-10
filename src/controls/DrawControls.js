import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from '../gameActions';
import * as playerActions from '../playerActions';

class DrawControls extends Component {
  render() {
    const {
      clearPlayerSelectedCards,
      doPhaseAction,
      selectedCards
    } = this.props;

    return (
      <div className="controls">
        <div className="buttonHolder">
          <button
            onClick={() => {
              doPhaseAction(selectedCards);
              clearPlayerSelectedCards();
            }}
          >
            Discard Selected
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doPhaseAction: bindActionCreators(gameActions.doPhaseAction, dispatch),
  clearPlayerSelectedCards: bindActionCreators(
    playerActions.clearPlayerSelectedCards,
    dispatch
  )
});

const mapStateToProps = state => ({
  selectedCards: state.playerReducer.selectedCards
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawControls);
