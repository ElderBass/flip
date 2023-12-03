import store from "../../../store";
import * as ChatStudyDeckActions from "../../../store/actions/chatStudyDeck";

export const studying_deck = (deck) => {
	const {
		chatStudyDeck: { _id = null, reachedEndOfDeck },
	} = store.getState();

	if (!_id || reachedEndOfDeck) {
		store.dispatch(ChatStudyDeckActions.setStudyDeck(deck));
	}
};
