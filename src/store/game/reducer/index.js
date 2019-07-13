import { GAME_STATE_RECEIVED } from '../actions';

const INITIAL_STATE = {
  year: '',
  stage: '',
  phase: '',
  turn: '',
  pot: 0,
  bid: 0,
  dealer: '',
  gamePhases: ''
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GAME_STATE_RECEIVED:
      const { type, ...rest } = action;
      return {
        ...state,
        ...rest
      };
    case 'show-help':
      return {
        ...state,
        showHelp: action.payload,
      };
    default:
      return {
        ...state
      };
  }
}

export default gameReducer;
