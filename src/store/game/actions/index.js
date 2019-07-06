export const GAME_STATE_RECEIVED = 'message/game-state-received';

export const gameStateReceived = (message) => {
  return {
    type: GAME_STATE_RECEIVED,
    stage: message.stage,
    phase: message.phase,
    turn: message.turn,
    pot: message.pot,
    bid: message.bid
  }
}