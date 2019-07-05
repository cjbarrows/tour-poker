import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'

import messageReducer from './store/message/reducer';
import playerReducer from './store/player/reducer';
import gameReducer from './store/game/reducer';

const { SHOW_ALL } = VisibilityFilters

function players(state, action) {
  return {
    ...state,
  }
}

function general(state, action) {
  return {
    ...state,
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

const todoApp = combineReducers({
  general,
  players,
  visibilityFilter,
  todos,
  gameReducer,
  messageReducer,
  playerReducer,
})

export default todoApp;