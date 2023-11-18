import store from "../../../store";
import * as ChatStudyDeckActions from "../../../store/actions/chatStudyDeck";

export const ending_study_deck = () => {
    store.dispatch(ChatStudyDeckActions.setReachedEndOfDeck(true));
};
