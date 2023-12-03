import React from "react";
import { MODALS } from "../../../utils/constants";
import ChatAction from "./ChatAction";
import CreateChatRoomForm from "./CreateChatRoomForm";
import ConfirmDeck from "./ConfirmDeck";
import ResetChat from "./ResetChat";
import RoomEnded from "./RoomEnded";
import NewHost from "./NewHost";
import styles from "./ChatModal.module.css";

const ChatModal = ({ type, item }) => {
	const ChatModalMap = {
		[MODALS.CREATE]: CreateChatRoomForm,
		[MODALS.JOIN]: ChatAction,
		[MODALS.LEAVE_ROOM]: ChatAction,
		[MODALS.LEAVE_CHAT]: ChatAction,
		[MODALS.END_ROOM]: ChatAction,
		[MODALS.STUDY]: ConfirmDeck,
		[MODALS.RESET]: ResetChat,
		[MODALS.ROOM_ENDED]: RoomEnded,
		[MODALS.NEW_HOST]: NewHost,
	};

	const ModalComponent = ChatModalMap[type];

	return (
		<div className={styles.chatModal}>
			<ModalComponent type={type} item={item} />
		</div>
	);
};

export default ChatModal;
