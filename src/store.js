import { combineReducers } from "redux";

import messageReducer from "./store/message/reducer";
import playerReducer from "./store/player/reducer";
import gameReducer from "./store/game/reducer";

function general(state, action) {
  return {
    ...state
  };
}

const todoApp = combineReducers({
  general,
  gameReducer,
  messageReducer,
  playerReducer
});

export default todoApp;
