import React from "react";
import store from "../../../store";
import * as ChatActions from "../../../store/actions/chat";
import * as ChatStudyDeckActions from "../../../store/actions/chatStudyDeck";
import { MODALS } from "../../../utils/constants";
import styles from "./ChatEndStudyActions.module.css";

const ChatEndStudyActions = () => {
	const onBackToSelectClick = () =>
		store.dispatch(ChatStudyDeckActions.reset());

	const onEndRoomClick = () =>
		store.dispatch(ChatActions.setModal({ type: MODALS.END_ROOM }));

	return (
		<div className={styles.chatEndStudyActions}>
			<div className={styles.actionsText}>
				Solid study sesh. Now what?
			</div>
			<div className={styles.buttons}>
				<button
					className={`${styles.btn} ${styles.endRoomBtn}`}
					onClick={onEndRoomClick}
				>
					End Room
				</button>
				<button
					className={`${styles.btn} ${styles.backToSelectDeckBtn}`}
					onClick={onBackToSelectClick}
				>
					Select Deck
				</button>
			</div>
		</div>
	);
};

export default ChatEndStudyActions;
