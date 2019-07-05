import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// remote:
// const socket = io('https://tour-poker-server.herokuapp.com:3002');
// local:
const socket = io('http://localhost:3002');

socket.on('connect', function () {
  console.log('socket connected');
});