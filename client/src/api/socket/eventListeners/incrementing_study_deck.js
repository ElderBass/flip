import store from "../../../store";
import * as ChatStudyDeckActions from "../../../store/actions/chatStudyDeck";
import { incrementIndexDelayMillis } from "../../../utils/constants";

export const incrementing_study_deck = (deckIndex) => {
    const { chatStudyDeck } = store.getState();
    if (deckIndex !== chatStudyDeck.index) {
        store.dispatch(ChatStudyDeckActions.setFlipped(false));
        setTimeout(() => {
            store.dispatch(ChatStudyDeckActions.setIndex(deckIndex));
        }, incrementIndexDelayMillis);
    }
};
