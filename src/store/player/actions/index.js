export const REFRESH_PLAYER_RECEIVED = 'message/refresh-player-received';
export const CLEAR_SELECTED_CARDS = 'clear-selected-cards';
export const SET_SELECTED_CARDS = 'set-selected-cards';
export const TOGGLE_SELECTED_CARD = 'toggle-selected-card';

export const refreshPlayerReceived = message => {
  return {
    type: REFRESH_PLAYER_RECEIVED,
    playerName: message.playerName,
    hand: message.hand,
    money: message.money,
    stake: message.stake,
    folded: message.folded
  };
};

export const clearSelectedCards = () => {
  return {
    type: SET_SELECTED_CARDS,
    cards: []
  };
};

export const setSelectedCards = cards => {
  return {
    type: SET_SELECTED_CARDS,
    cards
  };
};

export const toggleSelectedCard = card => {
  return {
    type: TOGGLE_SELECTED_CARD,
    card
  };
};
