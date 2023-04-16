// import Zena from '../../data/Zena';
import { trimEmail } from '../../utils/helpers/emailHelpers';
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
        case UserActions.UPDATE_USER:
            return payload;
        case UserActions.SET_FAVORITES:
            return { ...state, favorites: payload };
        case UserActions.ADD_FAVORITE:
            const alreadyFavorited = state.favorites.filter(fav => fav._id === payload._id).length > 0;
            return alreadyFavorited ? state : { ...state, favorites: [...state.favorites, payload] };
        case UserActions.REMOVE_FAVORITE:
            const updatedFavs = state.favorites.filter(fav => fav._id === payload._id);
            return { ...state, favorites: updatedFavs };
        default:
            return state;
    }
}

export default user;
