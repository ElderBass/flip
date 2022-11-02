import * as DeckActions from '../actions/decks';

const INITIAL_STATE = {
  decks: [],
};

function decks (state = INITIAL_STATE, { type, payload }) {
  switch(type) {
    case DeckActions.ADD_DECK:
      return {
        decks: [...state.decks, payload],
      }
    case DeckActions.SET_ALL_DECKS:
      return {
        decks: payload,
      }
    default:
      return state;
  }
}

export default decks;
