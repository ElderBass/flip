import React from "react";
import styles from "./ChatRoomHeader.module.css";
import store from "../../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { setModal } from "../../../store/actions/chat";
import { MODALS } from "../../../utils/constants";

const ChatRoomHeader = ({ headerText, spanText }) => {
	const { openRoom } = store.getState().chat;
	const onLeaveClick = () =>
		store.dispatch(setModal({ type: MODALS.LEAVE_ROOM, item: openRoom }));

	return (
		<div className={styles.chatRoomHeader}>
			<button
				className={styles.leaveRoomButton}
				onClick={onLeaveClick}
				title="Leave Room"
			>
				<FontAwesomeIcon
					icon={faArrowRightFromBracket}
					size="3x"
					style={{ color: "inherit", transform: "rotate(180deg)" }}
				/>
			</button>
			<h2 className={styles.headerText}>
				{headerText} <span className={styles.spanText}>{spanText}</span>
			</h2>
		</div>
	);
};

export default ChatRoomHeader;
