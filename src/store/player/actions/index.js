export const REFRESH_PLAYER_RECEIVED = 'message/refresh-player-received';

export const refreshPlayerReceived = (message) => {
  return {
    type: REFRESH_PLAYER_RECEIVED,
    playerName: message.playerName,
    hand: message.hand
  }
}