import { GAME_STATE_RECEIVED } from '../actions';

const INITIAL_STATE = {
  year: '',
  stage: '',
  phase: '',
  turn: '',
  pot: 0,
  bid: 0,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GAME_STATE_RECEIVED:
      const { type, ...rest } = action;
      return {
        ...state,
        ...rest,
      };

    default:
      return {
        ...state,
      }
  }
}

export default gameReducer;

