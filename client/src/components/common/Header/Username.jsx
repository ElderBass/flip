import React from "react";
import styles from "./Username.module.css";

const Username = (props) => {
	return (
		<li>
			<h6 className={styles.username}>
				<span className={styles.welcome}>Welcome, </span>{" "}
				{props.username}
			</h6>
		</li>
	);
};

export default Username;
