import store from "../../../store";
import * as ChatActions from "../../../store/actions/chat";

export const reset_complete = () => {
	store.dispatch(ChatActions.reset());
};
