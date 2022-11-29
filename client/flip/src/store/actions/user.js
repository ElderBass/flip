const ADD_USER = 'ADD_USER';
const addUser = (user) => ({
    type: ADD_USER,
    payload: user
});

const LOG_IN_USER = 'LOG_IN_USER';
const loginUser = (user) => ({
    type: LOG_IN_USER,
    payload: user
});

const LOG_OUT_USER = 'LOG_OUT_USER';
const logoutUser = () => ({
    type: LOG_OUT_USER,
});

const ADD_FAVORITE_DECK = 'ADD_FAVORITE_DECK';
const addFavoriteDeck = (deck) => ({
    type: ADD_FAVORITE_DECK,
    payload: deck
});

const REMOVE_FAVORITE_DECK = 'REMOVE_FAVORITE_DECK';
const removeFavoriteDeck = (deckId) => ({
    type: REMOVE_FAVORITE_DECK,
    payload: deckId
});

export {
    ADD_USER,
    addUser,
    LOG_IN_USER,
    loginUser,
    LOG_OUT_USER,
    logoutUser,
    ADD_FAVORITE_DECK,
    addFavoriteDeck,
    REMOVE_FAVORITE_DECK,
    removeFavoriteDeck
};
