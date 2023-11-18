import store from "../../../store";
import * as ChatActions from "../../../store/actions/chat";

export const receive_message = (message) => {
    store.dispatch(ChatActions.addMessage(message));
};
