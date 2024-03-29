import * as ChatStudyDeckActions from "../actions/chatStudyDeck";
import * as ChatActions from "../actions/chat";

const INITIAL_STATE = {
	_id: "",
	deckName: "",
	cards: [],
	index: 0,
	flipped: false,
	reachedEndOfDeck: false,
};

const chatStudyDeck = (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case ChatStudyDeckActions.SET_STUDY_DECK:
			return payload;
		case ChatStudyDeckActions.SET_FLIPPED:
			return { ...state, flipped: payload };
		case ChatStudyDeckActions.SET_INDEX:
			return { ...state, index: payload };
		case ChatStudyDeckActions.SET_REACHED_END_OF_DECK:
			return { ...state, reachedEndOfDeck: payload };
		case ChatActions.RESET:
		case ChatStudyDeckActions.RESET:
			return INITIAL_STATE;
		default:
			return state;
	}
};

export default chatStudyDeck;
