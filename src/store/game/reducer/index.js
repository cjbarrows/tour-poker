import { GAME_STATE_RECEIVED } from '../actions';

const INITIAL_STATE = {
  phase: '',
  turn: '',
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GAME_STATE_RECEIVED:
      return {
        ...state,
        phase: action.phase,
        turn: action.turn,
      };

    default:
      return {
        ...state,
      }
  }
}

export default gameReducer;

