import store from "../store";
import * as UserActions from "../store/actions/user";
import * as DeckActions from "../store/actions/decks";
import * as ChatActions from "../store/actions/chat";
import { LOCAL_STORAGE_KEYS } from "./constants";

export const logout = async () => {
	localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_IN, false);
	await store.dispatch(UserActions.logoutUser());
	store.dispatch(DeckActions.setSelectedDeck({}));
	store.dispatch(ChatActions.reset());
};
