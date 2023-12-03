import React from "react";
import styles from "./SignupLoginToggle.module.css";

const SignupLoginToggle = ({ text, onClick }) => {
	return (
		<div className={styles.signupLoginToggle}>
			<button className={styles.signupLoginToggleBtn} onClick={onClick}>
				{text}
			</button>
		</div>
	);
};

export default SignupLoginToggle;
