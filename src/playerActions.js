import {
  clearSelectedCards,
  setSelectedCards,
  toggleSelectedCard
} from './store/player/actions';

export const setPlayerSelectedCards = cards => dispatch => {
  dispatch(setSelectedCards(cards));
};

export const togglePlayerSelectedCard = card => dispatch => {
  dispatch(toggleSelectedCard(card));
};

export const clearPlayerSelectedCards = () => dispatch => {
  dispatch(clearSelectedCards());
};
