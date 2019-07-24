import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Droppable } from 'react-drag-and-drop';

import * as gameActions from './gameActions';

class Pot extends Component {
  render() {
    return (
      <Droppable
        types={['bid']}
        onDrop={data => {
          const { playerName, amount } = JSON.parse(data['bid']);
          this.props.gameActions.doPhaseAction({ playerName, amount });
        }}
      >
        <div className="pot">
          <img alt="pot" src={process.env.PUBLIC_URL + '/pot.png'} />
        </div>
      </Droppable>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(gameActions, dispatch)
});

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pot);
