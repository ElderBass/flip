import { faV } from '@fortawesome/free-solid-svg-icons';
// import Zena from '../../data/Zena';
import { trimEmail } from '../../utils/helpers/emailHelpers';
import * as DeckActions from '../actions/decks';
import * as UserActions from '../actions/user';

const INITIAL_STATE = {
    decks: [],
    email: '',
    username: '',
    favorites: [],
    following: [],
    _id: '',
    token: '',
    isLoggedIn: false,
};

// const INITIAL_STATE = Zena;
let favorites;
let decks;

function user(state = INITIAL_STATE, { type, payload }) {
    switch (type) {
        case UserActions.ADD_USER:
            return {
                ...state,
                username: payload.username,
                email: payload.email,
                password: payload.password,
            };
        case UserActions.LOG_IN_USER:
            const { user, token } = payload;
            const username = trimEmail(user.email);
            return { ...user, username, token, isLoggedIn: true };
        case UserActions.LOG_OUT_USER:
            return INITIAL_STATE;
        case DeckActions.ADD_DECK:
            decks = [...state.decks, payload];
            return { ...state, decks };
        case UserActions.ADD_FAVORITE_DECK:
            favorites = [...state.favorites, payload];
            return { ...state, favorites };
        case UserActions.REMOVE_FAVORITE_DECK:
            favorites = state.favorites.filter((favs) => !faV._id === payload);
            return { ...state, favorites };
        default:
            decks = [];
            favorites = [];
            return state;
    }
}

export default user;
