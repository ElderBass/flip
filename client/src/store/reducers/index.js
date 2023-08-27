import { combineReducers } from 'redux';
import user from './user';
import decks from './decks';
import chat from './chat';
import chatStudyDeck from './chatStudyDeck';

const appReducer = combineReducers({
    user,
    decks,
    chat,
    chatStudyDeck,
});

export default function rootReducer(state, action) {
    return appReducer(state, action);
};
