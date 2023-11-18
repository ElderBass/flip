import store from "../../../store";
import * as ChatActions from "../../../store/actions/chat";

export const user_typing = (typingData) => {
    const { sender, roomId, isTyping } = typingData;
    const {
        user: { username },
        chat: { openRoom },
    } = store.getState();

    // Don't set typing if the typer is the current user
    if (sender === username) return;

    if (openRoom.id === roomId) {
        const payload = isTyping ? typingData : null;
        store.dispatch(ChatActions.setUserTyping(payload));
    }
};
