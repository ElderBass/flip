import React from "react";
import store from "../../../store";
import * as ChatActions from "../../../store/actions/chat";
import { MODALS } from "../../../utils/constants";
import styles from "./ChatRoomActionButton.module.css";

const ChatRoomActionButton = ({ type, room }) => {
	const onActionClick = (type) => {
		store.dispatch(ChatActions.setModal({ type, item: room }));
	};

	const Reset = () => {
		return (
			<div className={styles.resetBtnContainer}>
				{process.env.NODE_ENV === "development" && (
					<button
						type="button"
						className={`${styles.btn} ${styles.reset}`}
						onClick={() => onActionClick(MODALS.RESET)}
					>
						Reset
					</button>
				)}
			</div>
		);
	};

	const Create = () => (
		<button
			type="button"
			className={`${styles.btn} ${styles.create}`}
			onClick={() => onActionClick(MODALS.CREATE)}
		>
			Create Chat Room
		</button>
	);

	const ActionButton = type === "reset" ? Reset : Create;

	return <ActionButton />;
};

export default ChatRoomActionButton;
