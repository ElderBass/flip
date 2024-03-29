import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import store from "../../../store";
import * as ChatActions from "../../../store/actions/chat";
import { hasJoinedRoom } from "../../../utils/chatRoomUtils";
import ChatRoom from "../ChatRoom";
import ChatRoomList from "../ChatRoomList";
import styles from "./ChatRoomContainer.module.css";

const ChatRoomContainer = () => {
	const { openRoom, rooms, email } = useSelector((state) => ({
		openRoom: state.chat.openRoom,
		rooms: state.chat.rooms,
		email: state.user.email,
	}));
	const [userInRoom, setUserInRoom] = useState(false);

	useEffect(() => {
		if (openRoom && openRoom.id) {
			setUserInRoom(hasJoinedRoom(openRoom, email));
		} else if (rooms.length > 0) {
			const userHasJoined = hasJoinedRoom(rooms, email);
			if (userHasJoined) {
				setUserInRoom(true);
				const userRoom = rooms.filter((room) =>
					room.members.some((member) => member.email === email)
				)[0];
				store.dispatch(ChatActions.setOpenRoom(userRoom));
			}
		}
	}, [rooms, openRoom, email]);

	return (
		<div className={styles.chatRoomContainer}>
			{userInRoom ? (
				<ChatRoom room={openRoom} userInRoom={userInRoom} />
			) : (
				<ChatRoomList rooms={rooms} email={email} />
			)}
		</div>
	);
};

export default ChatRoomContainer;
