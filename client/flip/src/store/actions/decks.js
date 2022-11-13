const ADD_DECK = 'ADD_DECK';
const addDeck = (deck) => ({
    type: ADD_DECK,
    payload: deck
});

const SET_ALL_DECKS = 'SET_ALL_DECKS';
const setAllDecks = (decks) => ({
    type: SET_ALL_DECKS,
    payload: decks
});

const SET_SELECTED_DECK = 'SET_SELECTED_DECK';
const setSelectedDeck = (deck) => ({
  type: SET_SELECTED_DECK,
  payload: deck
});

export {
  ADD_DECK,
  addDeck,
  SET_ALL_DECKS,
  setAllDecks,
  SET_SELECTED_DECK,
  setSelectedDeck
};
