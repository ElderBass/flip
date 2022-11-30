import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const addUser = userData => axios.post('/api/users/signup', userData);
const loginUser = userData => axios.post('/api/users/login', userData);
const getOneUser = () => axios.get('/api/users:id');
const editUserFavorites = favorites => axios.put('/api/users/edit-favorites', favorites);

const createDeck = deckData => axios.post('/api/decks/create', deckData);
const editUserDecks = decks => axios.put('/api/users/edit-decks', decks);
const getAllDecks = userId => axios.get('/api/decks/all', userId);
const editDeckFavorites = favs => axios.put('/api/decks/edit-favorites', favs);

export {
	addUser,
	loginUser,
	getOneUser,
	createDeck,
	editUserDecks,
	getAllDecks,
	editUserFavorites,
	editDeckFavorites
};
