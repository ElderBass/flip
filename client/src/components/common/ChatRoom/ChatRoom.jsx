import React, { useEffect, useMemo, useState } from "react";
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

	const [showStudyRoom, setShowStudyRoom] = useState(false);
	const [showSelectDeck, setShowSelectDeck] = useState(false);

	// TODO: Super hacky way to have loading screen show when navigating away from chat.
	useEffect(() => {
		if (chatStudyDeck._id) {
			setShowStudyRoom(true);
		} else if (openRoom && openRoom.id) {
			setShowSelectDeck(true);
		}
	}, [chatStudyDeck, openRoom]);

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
			{(showStudyRoom || showSelectDeck) && (
				<ChatRoomActionButton type="reset" room={openRoom} />
			)}
		</div>
	);
};

export default ChatRoom;
