import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as gameActions from "../gameActions";

class DealControls extends Component {
  render() {
    const { doPhaseAction } = this.props;

    return (
      <div className="controls">
        <div className="buttonHolder">
          <button onClick={() => doPhaseAction()}>Deal</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doPhaseAction: bindActionCreators(gameActions.doPhaseAction, dispatch)
});

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealControls);
