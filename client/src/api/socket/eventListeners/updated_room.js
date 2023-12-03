import store from "../../../store";
import { v4 as uuidv4 } from "uuid";
import * as ChatActions from "../../../store/actions/chat";
import { hasJoinedRoom } from "../../../utils/chatRoomUtils";
import { SENDER_TYPE, MODALS } from "../../../utils/constants";
import { trimEmail } from "../../../utils/helpers/emailHelpers";

export const updated_room = ({
	updatedRoom,
	rooms,
	username,
	updateType,
	hasNewHost = false,
}) => {
	const {
		user: { email },
	} = store.getState();

	store.dispatch(ChatActions.setRooms(rooms));

	if (hasJoinedRoom(updatedRoom, email)) {
		if (hasNewHost) {
			store.dispatch(
				ChatActions.setModal({
					type: MODALS.NEW_HOST,
					item: updatedRoom,
				})
			);
			return;
		} else if (username !== trimEmail(email)) {
			const messageObject = {
				text: `${username} has ${updateType} the chat.`,
				id: `message-${uuidv4()}`,
				roomId: updatedRoom.id,
				senderType: SENDER_TYPE.SYSTEM,
			};
			store.dispatch(ChatActions.addMessage(messageObject));
		}
		store.dispatch(ChatActions.setOpenRoom(updatedRoom));
	}
};
