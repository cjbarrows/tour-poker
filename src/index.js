import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import todoApp from './store'

// MIDDLEWARE
import socketMiddleware from './store/socket/middleware';

// remote:
// const socket = io('https://tour-poker-server.herokuapp.com:24986');
// const socket = io('localhost:3002');
// local:
// console.log(process.env.REACT_APP_SOCKET_SERVER);
/*
const socket = io(process.env.REACT_APP_SOCKET_SERVER);

socket.on('connect', function () {
  console.log('socket connected');
});
*/

const middleware = [socketMiddleware, thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(todoApp, {
  players: {
    'Charlie': {
      cards: [{ name: 'ace' }],
    }
  },
  // general: { socket }
}, composeEnhancers(
  applyMiddleware(...middleware)
));

console.log(store.getState());

// <App loggedIn="Charlie" />
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();