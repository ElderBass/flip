import React from "react";
import styles from "./Header.module.css";
import Links from "./Links";

const Header = () => {
	return (
		<div className={styles.header}>
			<h1 className={styles.logo}>Flip</h1>
			<Links />
		</div>
	);
};

export default Header;
