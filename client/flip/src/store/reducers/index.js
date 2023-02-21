import { combineReducers } from 'redux';
import user from './user';
import decks from './decks';
import following from './following';

const appReducer = combineReducers({
    user,
    decks,
    following,
});

export default function rootReducer(state, action) {
    return appReducer(state, action);
};
