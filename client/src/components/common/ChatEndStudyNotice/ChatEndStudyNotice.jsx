import React from "react";
import ChatEndStudyActions from "../ChatEndStudyActions";
import styles from "./ChatEndStudyNotice.module.css";

const ChatEndStudyNotice = ({ userIsHost }) => {
	return (
		<div className={styles.chatEndStudyNotice}>
			<div className={styles.header}>How'd You Stack Up?</div>
			{userIsHost ? (
				<ChatEndStudyActions />
			) : (
				<div className={styles.heading}>
					<p className={styles.headingText}>
						Please wait while the host chooses the next activity.
					</p>
					<p className={styles.secondaryText}>
						Don't forget to type "gg 2ez" in the chat!
					</p>
				</div>
			)}
		</div>
	);
};

export default ChatEndStudyNotice;
