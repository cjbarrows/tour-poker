import { sendMessage } from './store/message/actions';

const bid = (playerName, amount) => (dispatch) => {
  dispatch(sendMessage('bid', { playerName, amount }));
}

const deal = () => (dispatch) => {
  dispatch(sendMessage('deal'));
}

const endTurn = () => (dispatch) => {
  dispatch(sendMessage('endTurn'));
}

export { bid, deal, endTurn };