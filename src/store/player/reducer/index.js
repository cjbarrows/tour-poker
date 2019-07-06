import { REFRESH_PLAYER_RECEIVED } from '../actions';

const INITIAL_STATE = {
  players: []
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REFRESH_PLAYER_RECEIVED:
      return {
        ...state,
        [action.playerName]: {
          hand: [...action.hand],
          money: action.money,
          stake: action.stake
        },
      };

    default:
      return {
        ...state,
      }
  }
}

export default playerReducer;

