import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import LoginForm from "../../common/LoginForm";
import SignupForm from "../../common/SignupForm";
import SignupLoginToggle from "../../common/SignupLoginToggle";
import styles from "./Landing.module.css";

const Landing = () => {
	const [flipped, setFlipped] = useState(false);
	const [error, setError] = useState("");

	const SIGNUP_TEXT = "Haven't Flipped yet? Sign up free here";
	const LOGIN_TEXT = "Already Flipped? Login here instead";

	const onToggleClick = () => {
		setFlipped(!flipped);
		setError("");
	};

	const toggleText = flipped ? LOGIN_TEXT : SIGNUP_TEXT;

	return (
		<div className={styles.landingPage}>
			<div className={styles.splash}>
				<div className={styles.logo}>Flip</div>
				<div className={styles.blurb}>Live. Laugh. Learn.</div>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.loginSignup}>
					<div className={styles.error}>
						{error && <p className={styles.errorMsg}>{error}</p>}
					</div>
					<ReactCardFlip
						isFlipped={flipped}
						flipDirection="horizontal"
					>
						<LoginForm setError={setError} />
						<SignupForm setError={setError} />
					</ReactCardFlip>
					<SignupLoginToggle
						text={toggleText}
						onClick={onToggleClick}
					/>
				</div>
			</div>
		</div>
	);
};

export default Landing;
