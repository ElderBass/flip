import React from "react";
import styles from "./ChatHeader.module.css";

const ChatHeader = ({ roomName = "" }) => {
	const RoomNameText = () => {
		return (
			<p className={styles.chatRoomName}>
				{roomName ? (
					<>
						In Room{" "}
						<span className={styles.roomNameSpan}>{roomName}</span>
					</>
				) : (
					<>Create or Join a Room to Chat</>
				)}
			</p>
		);
	};

	return (
		<div className={styles.header}>
			<p className={styles.chatRoomHeader}>Flip Chat</p>
			<RoomNameText />
		</div>
	);
};

export default ChatHeader;
