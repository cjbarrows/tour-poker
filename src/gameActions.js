import { sendMessage } from "./store/message/actions";

const bid = (playerName, amount) => dispatch => {
  dispatch(sendMessage("bid", { playerName, amount }));
};

const endTurn = () => dispatch => {
  dispatch(sendMessage("endTurn"));
};

const doPhaseAction = options => dispatch => {
  dispatch(sendMessage("doPhaseAction", options));
};

export { bid, doPhaseAction, endTurn };
