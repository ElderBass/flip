import React from "react";
import { useSelector } from "react-redux";
import styles from "./TypingIndicator.module.css";

const TypingIndicator = () => {
	const usersTyping = useSelector((state) => state.chat.usersTyping);

	const verb = usersTyping.length > 1 ? "are" : "is";

	return (
		<div className={styles.typingIndicator}>
			{usersTyping.length > 0 && (
				<p className={styles.typingIndicatorMsg}>
					{usersTyping.length === 1 ? (
						<span className={styles.typer}>{usersTyping[0]}</span>
					) : (
						"Several flippers"
					)}{" "}
					{verb} typing...
				</p>
			)}
		</div>
	);
};

export default TypingIndicator;
