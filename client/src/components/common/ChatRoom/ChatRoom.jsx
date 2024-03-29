import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import store from "../../../store";
import * as ChatActions from "../../../store/actions/chat";
import { MODALS } from "../../../utils/constants";
import ChatRoomActionButton from "../ChatRoomActionButton";
import ChatRoomSelectDeck from "../ChatRoomSelectDeck";
import ChatRoomStudyDeck from "../ChatRoomStudyDeck";
import styles from "./ChatRoom.module.css";

const ChatRoom = ({ room }) => {
	const {
		user: { email },
		chatStudyDeck,
		chat: { openRoom },
	} = useSelector(({ user, chatStudyDeck, chat }) => ({
		user,
		chatStudyDeck,
		chat,
	}));

	const onSelectDeck = (deck) => {
		store.dispatch(
			ChatActions.setModal({ type: MODALS.STUDY, item: deck })
		);
	};

	const userIsHost = room && room.host && email === room.host.email;

	const ChildComponent = useMemo(() => {
		if (chatStudyDeck._id) {
			return (
				<ChatRoomStudyDeck
					deck={chatStudyDeck}
					roomId={openRoom.id}
					userIsHost={userIsHost}
				/>
			);
		} else if (openRoom && openRoom.id) {
			return (
				<ChatRoomSelectDeck room={room} onSelectDeck={onSelectDeck} />
			);
		} else {
			return null;
		}
	}, [chatStudyDeck, openRoom, room, userIsHost]);

	return (
		<div className={styles.chatRoom}>
			{ChildComponent}
			<ChatRoomActionButton type="reset" room={openRoom} />
		</div>
	);
};

export default ChatRoom;
