import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const addUser = userData => axios.post('/api/users/signup', userData);
const loginUser = userData => axios.post('/api/users/login', userData);
const getOneUser = () => axios.get('/api/users:id');
const createDeck = deckData => axios.post('/api/decks/create', deckData);
const editUserDecks = decks => axios.put('/api/users/edit-decks', decks);
const getAllDecks = userId => axios.get('/api/decks/all', userId);
const editFavorites = favorites => axios.put('/api/users/edit-favorites', favorites);

export {
	addUser,
	loginUser,
	getOneUser,
	createDeck,
	editUserDecks,
	getAllDecks,
	editFavorites
};
