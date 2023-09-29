const SET_STUDY_DECK = 'SET_STUDY_DECK';
const setStudyDeck = (deck) => ({
    type: SET_STUDY_DECK,
    payload: deck,
});

const SET_FLIPPED = 'SET_FLIPPED';
const setFlipped = (flipped) => ({
    type: SET_FLIPPED,
    payload: flipped,
});

const SET_INDEX = 'SET_INDEX';
const setIndex = (index) => ({
    type: SET_INDEX,
    payload: index,
});

const SET_REACHED_END_OF_DECK = 'SET_REACHED_END_OF_DECK';
const setReachedEndOfDeck = (reachedEnd) => ({
    type: SET_REACHED_END_OF_DECK,
    payload: reachedEnd,
});

const RESET = 'RESET_CHAT_STUDY_DECK';
const reset = () => ({
    type: RESET,
});

export {
    SET_STUDY_DECK,
    setStudyDeck,
    SET_FLIPPED,
    setFlipped,
    SET_INDEX,
    setIndex,
    SET_REACHED_END_OF_DECK,
    setReachedEndOfDeck,
    RESET,
    reset,
};
