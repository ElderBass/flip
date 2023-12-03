import React from "react";
import { useHistory } from "react-router-dom";
import store from "../../../../store";
import * as ChatActions from "../../../../store/actions/chat";
import { destroyRoom, joinRoom, leaveRoom } from "../../../../api/socket";
import { chatActionModalTextMap } from "../../../../utils/constants";
import styles from "./ChatAction.module.css";
import { navigateFromChat } from "../../../../utils/navigateFromChat";

const ChatAction = ({ item: room, type }) => {
	const history = useHistory();
	const navigate = (path) => history.push(path);

	const { header, main, sub, button } = chatActionModalTextMap[type];

	const onConfirmClickMap = {
		leave_room: leaveRoom,
		join: joinRoom,
		end: destroyRoom,
		leave_chat: (room) =>
			navigateFromChat(() => navigate(room.toUrl), room),
	};

	const onConfirmClick = () => onConfirmClickMap[type](room);

	const onCancelClick = () => {
		store.dispatch(ChatActions.setModal(null));
	};

	return (
		<div className={styles.chatActionModal}>
			<div className={styles.header}>{header}</div>
			<div className={styles.heading}>
				<p className={styles.mainText}>{main}</p>
				<p className={styles.subText}>{sub}</p>
			</div>
			<div className={styles.actions}>
				<button
					className={`${styles.btn} ${styles.cancel}`}
					type="button"
					onClick={onCancelClick}
				>
					Cancel
				</button>
				<button
					className={`${styles.btn} ${styles.confirm}`}
					type="button"
					onClick={onConfirmClick}
				>
					{button}
				</button>
			</div>
		</div>
	);
};

export default ChatAction;
