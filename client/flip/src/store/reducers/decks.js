import * as DeckActions from '../actions/decks';
// import API from '../../utils/API';

// async function fetchdecks() {
//   try {
//     const response = await API.getAlldecks();
//     console.log('\n \n  response in useEffect get all decks = ', response, '\n \n ')
//     if (response.statusText === 'OK' && response.data.isSuccess) {
//       return response.data.decks;
//     }
//   } catch (err) {
//     console.log('\n \n error in retrieving all decks useEffect', err, '\n \n');
//     throw err;
//   }
// }

const INITIAL_STATE = {
  decks: [],
};

function decks (state = INITIAL_STATE, { type, payload }) {
  switch(type) {
    case DeckActions.ADD_DECK:
      return {
        decks: [...state.decks, payload],
      }
    case DeckActions.SET_ALL_DECKS:
      return {
        decks: payload,
      }
    default:
      return state;
  }
}

export default decks;
