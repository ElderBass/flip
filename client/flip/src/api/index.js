import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const addUser = userData => axios.post('/api/users/signup', userData);
const loginUser = userData => axios.post('/api/users/login', userData);
const getOneUser = userId => axios.get(`/api/users/get-one/${userId}`);
const getAllUsers = () => axios.get('/api/users/get-all');
const updateUser = user => axios.put('/api/users/update-user', { user });
// TODO: Why do I even need these two route? Should just need the updateUser route
const followUser = userId => axios.post(`/api/users/follow/${userId}`);

const createDeck = deckData => axios.post('/api/decks/create', deckData);
const editUserDecks = decks => axios.put('/api/users/edit-decks', decks);
const getAllDecks = () => axios.get('/api/decks/all');
const getOneDeck = deckId => axios.get(`/api/decks/${deckId}`);
const getAllUserDecks = userId => axios.get(`/api/decks/user/${userId}`);
const editDeckFavorites = favs => axios.put('/api/decks/edit-favorites', favs);
const deleteDeck = deckId => axios.delete(`/api/decks/delete/${deckId}`);

export {
	addUser,
	loginUser,
	getOneUser,
	getAllUsers,
	updateUser,
	followUser,
	createDeck,
	editUserDecks,
	getAllDecks,
	getOneDeck,
	getAllUserDecks,
	editDeckFavorites,
	deleteDeck
};
