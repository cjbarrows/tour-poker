import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Controls.css';

import * as cardActions from './cardActions';

class Controls extends Component {
  render() {
    return (
      <div className="controls">
        <button
          onClick={() => {
            this.props.cardActions.dealCard('Charlie');
          }}>Deal</button>
        <button
          onClick={() => {
            this.props.cardActions.dealCard('Charlie');
          }}>Raise</button>
        <button
          onClick={() => {
            this.props.cardActions.dealCard('Charlie');
          }}>Call</button>
        <button
          onClick={() => {
            this.props.cardActions.dealCard('Charlie');
          }}>Fold</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  cardActions: bindActionCreators(cardActions, dispatch),
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);