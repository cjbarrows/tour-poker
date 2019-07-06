import { GAME_STATE_RECEIVED } from '../actions';

const INITIAL_STATE = {
  phase: '',
  turn: '',
  pot: 0,
  bid: 0,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GAME_STATE_RECEIVED:
      return {
        ...state,
        phase: action.phase,
        turn: action.turn,
        pot: action.pot,
        bid: action.bid
      };

    default:
      return {
        ...state,
      }
  }
}

export default gameReducer;

