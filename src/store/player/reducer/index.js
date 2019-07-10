import {
  REFRESH_PLAYER_RECEIVED,
  SET_SELECTED_CARDS,
  TOGGLE_SELECTED_CARD
} from '../actions';

const INITIAL_STATE = {
  players: [],
  selectedCards: []
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
        }
      };

    case SET_SELECTED_CARDS:
      return {
        ...state,
        selectedCards: [...action.cards]
      };

    case TOGGLE_SELECTED_CARD:
      return {
        ...state,
        selectedCards: [
          ...(state.selectedCards.find(card => card === action.card)
            ? state.selectedCards.filter(card => card !== action.card)
            : state.selectedCards.length < 3
            ? [...state.selectedCards, action.card]
            : [...state.selectedCards])
        ]
      };

    default:
      return {
        ...state
      };
  }
}

export default playerReducer;
