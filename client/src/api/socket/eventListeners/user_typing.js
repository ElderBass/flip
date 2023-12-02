import store from "../../../store";
import { addUserTyping, removeUserTyping } from "../../../store/actions/chat";

export const user_typing = (typingData) => {
    const { sender, roomId, isTyping } = typingData;
    const {
        user: { username },
        chat: { openRoom },
    } = store.getState();

    // Don't set typing if the typer is the current user
    if (sender === username) return;

    if (roomId && openRoom.id === roomId) {
        const action = isTyping ? addUserTyping : removeUserTyping
        store.dispatch(action(sender));
    }
};
