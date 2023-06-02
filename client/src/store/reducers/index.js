import { combineReducers } from 'redux';
import user from './user';
import decks from './decks';
import chat from './chat';

const appReducer = combineReducers({
    user,
    decks,
    chat,
});

export default function rootReducer(state, action) {
    return appReducer(state, action);
};
