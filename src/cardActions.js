import { sendMessage } from './store/message/actions';

const dealCard = (playerName) => (dispatch, getState) => {
  // const socket = getState().general.socket;

  dispatch(sendMessage('deal', playerName));
  // socket.emit('deal', playerName);

  console.log('ok, doing it');
}

export { dealCard };