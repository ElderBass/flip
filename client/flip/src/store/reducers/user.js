import { trimEmail } from '../../utils/helpers/emailHelpers';
import * as UserActions from '../actions/user';

const INITIAL_STATE = {
    decks: [],
    email: '',
    username: '',
    favorites: [],
    following: [],
    password: '',
    _id: '',
    token: '',
    isLoggedIn: false,
};

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
            console.log('is this happening ? log out user reducer');
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default user;
