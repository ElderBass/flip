import store from "../../../store";
import * as ChatActions from "../../../store/actions/chat";
import { hasJoinedRoom } from "../../../utils/chatRoomUtils";
import { MODALS } from "../../../utils/constants";

export const returning_rooms = ({ rooms, roomId, destroyedRoom = null }) => {
	store.dispatch(ChatActions.setRooms(rooms));

	if (rooms.length > 0) {
		const {
			user: { email },
		} = store.getState();

		const targetRoom = destroyedRoom
			? destroyedRoom
			: rooms.filter((room) => room.id === roomId)[0];

		if (hasJoinedRoom(targetRoom, email)) {
			if (destroyedRoom && destroyedRoom.host.email !== email) {
				store.dispatch(
					ChatActions.setModal({
						type: MODALS.ROOM_ENDED,
						item: destroyedRoom,
					})
				);
			} else if (!destroyedRoom) {
				store.dispatch(ChatActions.setOpenRoom(targetRoom));
			}
		}
	} else {
		// Just in case somehow openRoom isn't reset when rooms are
		store.dispatch(ChatActions.setOpenRoom({}));
	}
};
