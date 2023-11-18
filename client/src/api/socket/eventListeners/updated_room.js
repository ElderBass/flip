import store from "../../../store";
import * as ChatActions from "../../../store/actions/chat";
import { hasJoinedRoom } from "../../../utils/chatRoomUtils";
import { MODALS } from "../../../utils/constants";

export const updated_room = ({ updatedRoom, rooms, hasNewHost = false }) => {
    const {
        user: { email },
    } = store.getState();

    store.dispatch(ChatActions.setRooms(rooms));

    if (hasJoinedRoom(updatedRoom, email)) {
        if (hasNewHost) {
            store.dispatch(
                ChatActions.setModal({ type: MODALS.NEW_HOST, item: updatedRoom })
            );
            return;
        }
        store.dispatch(ChatActions.setOpenRoom(updatedRoom));
    }
};
