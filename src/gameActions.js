import { sendMessage } from './store/message/actions';

const bid = (playerName, amount) => dispatch => {
  dispatch(sendMessage('bid', { playerName, amount }));
};

const endTurn = () => dispatch => {
  dispatch(sendMessage('endTurn'));
};

const fold = playerName => dispatch => {
  dispatch(sendMessage('fold', { playerName }));
};

const doPhaseAction = options => dispatch => {
  dispatch(sendMessage('doPhaseAction', options));
};

export { bid, doPhaseAction, endTurn, fold };
