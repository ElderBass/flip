import * as DeckActions from '../actions/decks';

const INITIAL_STATE = {
  decks: [],
  selectedDeck: null,
};

function decks (state = INITIAL_STATE, { type, payload }) {
  switch(type) {
    case DeckActions.ADD_DECK:
      return {
        ...state,
        decks: [...state.decks, payload],
      };
    case DeckActions.SET_ALL_DECKS:
      return {
        ...state,
        decks: payload,
      };
    case DeckActions.SET_SELECTED_DECK:
      return {
        ...state,
        selectedDeck: payload
      };
    default:
      return state;
  }
}

export default decks;
