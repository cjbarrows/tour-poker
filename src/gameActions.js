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

const showHelp = (show = true) => dispatch => {
  dispatch({
    type: 'show-help',
    payload: show
  })
}
export { bid, doPhaseAction, endTurn, fold, showHelp };
