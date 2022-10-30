import { combineReducers } from 'redux';
import user from './user';
import decks from './decks';

const appReducer = combineReducers({
    user,
    decks,
});

export default function rootReducer(state, action) {
    return appReducer(state, action);
};
