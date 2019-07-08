import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from './gameActions';

class DealControls extends Component {
  render() {
    const { deal } = this.props;

    return (
      <div className="controls">
        <div className="buttonHolder">
          <button
            onClick={() => deal()}>Deal</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deal: bindActionCreators(gameActions.deal, dispatch),
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DealControls);