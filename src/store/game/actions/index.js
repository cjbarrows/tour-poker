export const GAME_STATE_RECEIVED = 'message/game-state-received';

export const gameStateReceived = (message) => {
  return {
    type: GAME_STATE_RECEIVED,
    ...message,
  }
}