const ADD_USER = 'ADD_USER';
const addUser = (user) => ({
    type: ADD_USER,
    payload: user,
});

const LOG_IN_USER = 'LOG_IN_USER';
const loginUser = (user) => ({
    type: LOG_IN_USER,
    payload: user,
});

const LOG_OUT_USER = 'LOG_OUT_USER';
const logoutUser = () => ({
    type: LOG_OUT_USER,
});

const UPDATE_USER = 'UPDATE_USER';
const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user,
});

const SET_FAVORITES = 'SET_FAVORITES';
const setFavorites = (favs) => ({
    type: SET_FAVORITES,
    payload: favs,
});

const ADD_FAVORITE = 'ADD_FAVORITE';
const addFavorite = (fav) => ({
    type: ADD_FAVORITE,
    payload: fav,
});

const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const removeFavorite = (fav) => ({
    type: REMOVE_FAVORITE,
    payload: fav,
});

export {
    ADD_USER,
    addUser,
    LOG_IN_USER,
    loginUser,
    LOG_OUT_USER,
    logoutUser,
    UPDATE_USER,
    updateUser,
    SET_FAVORITES,
    setFavorites,
    ADD_FAVORITE,
    addFavorite,
    removeFavorite,
    REMOVE_FAVORITE,
};
